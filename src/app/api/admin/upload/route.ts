import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';
import { v2 as cloudinary } from 'cloudinary';
import { deleteCloudinaryImageByUrl } from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
    }

    const user = await verifySessionToken(token);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Sanitize credentials by removing any accidental whitespace, newlines, or wrapping quotes
    const cleanEnv = (val?: string) => val?.trim().replace(/^['"]|['"]$/g, '') || '';
    const cloudName = cleanEnv(process.env.CLOUDINARY_CLOUD_NAME);
    const apiKey = cleanEnv(process.env.CLOUDINARY_API_KEY);
    const apiSecret = cleanEnv(process.env.CLOUDINARY_API_SECRET);
    const cloudinaryUrl = cleanEnv(process.env.CLOUDINARY_URL);

    if (cloudinaryUrl) {
      cloudinary.config(cloudinaryUrl);
    } else if (cloudName && apiKey && apiSecret) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
      });
    } else {
      return NextResponse.json(
        { error: 'Cloudinary environment variables are missing or incomplete on the server.' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const uploadType = (formData.get('type') as string) || 'image';
    const oldUrl = formData.get('oldUrl') as string | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided for upload' }, { status: 400 });
    }

    // Check size limit from environment variables or defaults (5MB for images, 10MB for documents)
    const defaultImageLimit = 5 * 1024 * 1024;
    const defaultDocLimit = 10 * 1024 * 1024;

    const maxImageSize = process.env.ASSETS_MAX_IMAGE_UPLOAD_SIZE_BYTES
      ? parseInt(process.env.ASSETS_MAX_IMAGE_UPLOAD_SIZE_BYTES, 10)
      : defaultImageLimit;
    const maxDocSize = process.env.ASSETS_MAX_DOCUMENT_UPLOAD_SIZE_BYTES
      ? parseInt(process.env.ASSETS_MAX_DOCUMENT_UPLOAD_SIZE_BYTES, 10)
      : defaultDocLimit;

    const maxSize = uploadType === 'document' ? maxDocSize : maxImageSize;

    if (file.size > maxSize) {
      const maxMb = (maxSize / (1024 * 1024)).toFixed(2);
      return NextResponse.json(
        { error: `File size (${(file.size / 1024 / 1024).toFixed(2)} MB) exceeds the maximum allowed limit of ${maxMb} MB.` },
        { status: 400 }
      );
    }

    // Convert file to buffer for robust streaming upload (avoids WAF/gateway 403 blocks on large base64 URIs)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Using top-level folder name without trailing subfolder slashes to prevent Cloudinary 403 folder restrictions
    const rootFolder = cleanEnv(process.env.CLOUDINARY_ROOT_FOLDER) || 'dentist-landing-page';

    const uploadOptions: Record<string, unknown> = {
      folder: rootFolder,
      resource_type: uploadType === 'document' ? 'raw' : 'image',
    };

    // Explicitly inject credentials into upload options to ensure exact matching and avoid global config races
    if (cloudName && apiKey && apiSecret) {
      uploadOptions.cloud_name = cloudName;
      uploadOptions.api_key = apiKey;
      uploadOptions.api_secret = apiSecret;
    }

    // Upload via stream
    const uploadResult: Record<string, any> = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result || {});
        }
      });
      stream.end(buffer);
    });

    // Automatically clean up old Cloudinary image if this upload is replacing one
    if (oldUrl && oldUrl.includes('res.cloudinary.com')) {
      try {
        console.log('Replacing image; deleting old Cloudinary asset:', oldUrl);
        await deleteCloudinaryImageByUrl(oldUrl);
      } catch (delErr) {
        console.warn('Non-fatal error while deleting replaced Cloudinary asset:', delErr);
      }
    }

    return NextResponse.json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      format: uploadResult.format,
      bytes: uploadResult.bytes,
    });
  } catch (error: unknown) {
    console.error('Cloudinary Upload Error:', error);
    const errObj = error as Record<string, unknown>;
    const status = (typeof errObj?.http_code === 'number' && errObj.http_code) || 500;
    let message = (typeof errObj?.message === 'string' && errObj.message) ||
                  (error instanceof Error ? error.message : 'Failed to upload file to Cloudinary');

    if (status === 403) {
      message = `Cloudinary (403 Forbidden): Access denied by Cloudinary servers. Please check that your CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET belong to the exact same account environment in your Cloudinary Dashboard, and that your API Key has Admin/Upload permissions enabled.`;
    }

    return NextResponse.json({ error: message }, { status });
  }
}
