import { v2 as cloudinary } from 'cloudinary';

function cleanEnv(val?: string) {
  return val?.trim().replace(/^['"]|['"]$/g, '') || '';
}

export function getCloudinaryPublicId(url?: string | null, rootFolder = ''): string | null {
  if (!url || !url.includes('res.cloudinary.com')) return null;

  try {
    const cleanRoot = cleanEnv(rootFolder || process.env.CLOUDINARY_ROOT_FOLDER) || 'dentist-landing-page';

    // Check if our rootFolder exists in the URL path
    if (cleanRoot && url.includes(`/${cleanRoot}/`)) {
      const idx = url.indexOf(`/${cleanRoot}/`);
      let publicId = url.substring(idx + 1);
      // Strip query parameters if present
      const queryIdx = publicId.indexOf('?');
      if (queryIdx !== -1) publicId = publicId.substring(0, queryIdx);
      // Strip file extension
      const dotIdx = publicId.lastIndexOf('.');
      if (dotIdx !== -1) publicId = publicId.substring(0, dotIdx);
      return decodeURIComponent(publicId);
    }

    // Generic fallback: match after '/upload/' and strip versioning prefix (e.g. /v12345/) and file extensions
    const parts = url.split('/upload/');
    if (parts.length < 2) return null;

    let path = parts[1];
    // Strip query parameters
    const queryIdx = path.indexOf('?');
    if (queryIdx !== -1) path = path.substring(0, queryIdx);
    // Remove version number prefix like /v1785017890/ or v12345/
    path = path.replace(/^\/?v\d+\//, '');
    path = path.replace(/^\//, '');
    // Strip file extension
    const dotIdx = path.lastIndexOf('.');
    if (dotIdx !== -1) path = path.substring(0, dotIdx);
    return decodeURIComponent(path);
  } catch (e) {
    console.error('Error parsing Cloudinary public ID from URL:', e);
    return null;
  }
}

export async function deleteCloudinaryImageByUrl(url?: string | null): Promise<boolean> {
  if (!url || !url.includes('res.cloudinary.com')) {
    return false;
  }

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
    console.warn('Cloudinary credentials missing when attempting to delete image.');
    return false;
  }

  const publicId = getCloudinaryPublicId(url);
  if (!publicId) {
    console.warn('Could not extract public_id from URL:', url);
    return false;
  }

  try {
    console.log(`Destroying old Cloudinary asset: ${publicId}`);
    const res = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
      invalidate: true,
    });
    console.log('Cloudinary destroy result:', res);
    return res.result === 'ok' || res.result === 'not found';
  } catch (err) {
    console.error(`Failed to delete Cloudinary image (${publicId}):`, err);
    return false;
  }
}
