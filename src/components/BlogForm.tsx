'use client';

import { useState } from 'react';
import { Link } from "@/i18n/navigation";

import { RichTextEditor } from '@/components/RichTextEditor';
import { ImageUpload } from '@/components/ImageUpload';
import styles from '@/styles/admin.module.css';

export interface BlogFormData {
  id?: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  slug: string;
  coverImageUrlAr: string;
  coverImageUrlEn: string;
  ogImageUrl: string;
  excerptAr: string;
  excerptEn: string;
  contentAr: string;
  contentEn: string;
  readingMinutes: number;
  tagsAr: string[];
  tagsEn: string[];
  status: 'draft' | 'published' | 'archived';
  isFeatured: boolean;
}

interface BlogFormProps {
  mode: 'create' | 'edit';
  initialData?: Partial<BlogFormData>;
  onSubmit: (data: BlogFormData) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export function BlogForm({
  mode,
  initialData,
  onSubmit,
  loading = false,
  error = null,
}: BlogFormProps) {
  const [titleAr, setTitleAr] = useState(initialData?.titleAr ?? '');
  const [titleEn, setTitleEn] = useState(initialData?.titleEn ?? '');
  const [descriptionAr] = useState(initialData?.descriptionAr ?? '');
  const [descriptionEn] = useState(initialData?.descriptionEn ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [coverImageUrlAr, setCoverImageUrlAr] = useState(initialData?.coverImageUrlAr ?? '/images/blogs-preview.png');
  const [coverImageUrlEn, setCoverImageUrlEn] = useState(initialData?.coverImageUrlEn ?? '/images/blogs-preview.png');
  const [ogImageUrl, setOgImageUrl] = useState(initialData?.ogImageUrl ?? '/images/blogs-preview.png');
  const [contentAr, setContentAr] = useState(initialData?.contentAr ?? '');
  const [contentEn, setContentEn] = useState(initialData?.contentEn ?? '');
  const [readingMinutes, setReadingMinutes] = useState(initialData?.readingMinutes ?? 3);
  const [tagsArInput, setTagsArInput] = useState(
    Array.isArray(initialData?.tagsAr) ? initialData.tagsAr.join(', ') : 'أسنان, تجميل'
  );
  const [tagsEnInput, setTagsEnInput] = useState(
    Array.isArray(initialData?.tagsEn) ? initialData.tagsEn.join(', ') : 'Dental, Cosmetic'
  );
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>(initialData?.status ?? 'published');
  const [isFeatured, setIsFeatured] = useState(Boolean(initialData?.isFeatured));

  const generateSlug = () => {
    if (!titleEn) return;
    const generated = titleEn
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setSlug(generated);
  };

  const generateExcerpt = (content: string, fallback: string, maxLen = 200) => {
    if (!content) return fallback;
    const plainText = content
      .replace(/<[^>]+>/g, '') // remove HTML tags if any
      .replace(/^[#>\s-]+\s/gm, '') // remove leading Markdown formatting
      .replace(/[*_~`]/g, '') // remove formatting characters
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // convert markdown links to text
      .replace(/\s+/g, ' ') // collapse extra whitespaces
      .trim();

    if (!plainText) return fallback;
    if (plainText.length <= maxLen) return plainText;
    return plainText.substring(0, maxLen).trim() + '...';
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const tagsAr = tagsArInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const tagsEn = tagsEnInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    await onSubmit({
      id: initialData?.id,
      titleAr,
      titleEn,
      descriptionAr: descriptionAr || titleAr,
      descriptionEn: descriptionEn || titleEn,
      slug,
      coverImageUrlAr,
      coverImageUrlEn,
      ogImageUrl,
      excerptAr: generateExcerpt(contentAr, titleAr),
      excerptEn: generateExcerpt(contentEn, titleEn),
      contentAr,
      contentEn,
      readingMinutes: Number(readingMinutes),
      tagsAr,
      tagsEn,
      status,
      isFeatured,
    });
  };

  return (
    <div className={styles.cardSection}>
      {error && (
        <div className={styles.errorBanner}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className={styles.form}>
        {/* Titles */}
        <div className={styles.formGridTwo}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title (Arabic) *</label>
            <input
              type="text"
              required
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              placeholder="عنوان المقال بالعربية"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Title (English) *</label>
            <input
              type="text"
              required
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              onBlur={mode === 'create' ? generateSlug : undefined}
              placeholder="Blog Title in English"
              className={styles.input}
            />
          </div>
        </div>

        {/* Slug & OG Image */}
        {/* Slug */}
        <div className={styles.formGroup}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
            <label className={styles.label} style={{ margin: 0 }}>Slug (URL Identifier) *</label>
            <button
              type="button"
              onClick={generateSlug}
              style={{ fontSize: '0.75rem', color: 'var(--main-color)', cursor: 'pointer', background: 'none', border: 'none', fontWeight: 600 }}
            >
              ⚡ Auto Generate from English Title
            </button>
          </div>
          <input
            type="text"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="e.g. dental-implants-guide"
            className={styles.input}
          />
        </div>

        {/* Cover Images */}
        <div className={styles.formGridTwo}>
          <ImageUpload
            label="Cover Image (Arabic Version)"
            value={coverImageUrlAr}
            onChange={setCoverImageUrlAr}
            required
            helperText="Header banner displayed on Arabic article page"
          />
          <ImageUpload
            label="Cover Image (English Version)"
            value={coverImageUrlEn}
            onChange={setCoverImageUrlEn}
            required
            helperText="Header banner displayed on English article page"
          />
        </div>

        {/* Social Sharing OG Image */}
        <div className={styles.formGroup}>
          <ImageUpload
            label="Open Graph (OG) Social Media Image"
            value={ogImageUrl}
            onChange={setOgImageUrl}
            required
            helperText="Preview image shown when sharing the article link on WhatsApp, Facebook, or LinkedIn"
          />
        </div>

        {/* Full Contents - Each in its own full-width row */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Full Article Content (Arabic Markdown) *</label>
          <RichTextEditor
            value={contentAr}
            onChange={setContentAr}
            lang="ar"
            dir="rtl"
            placeholder="المحتوى الكامل للمقال بالعربية..."
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Full Article Content (English Markdown) *</label>
          <RichTextEditor
            value={contentEn}
            onChange={setContentEn}
            lang="en"
            dir="ltr"
            placeholder="Full article content in English..."
          />
        </div>

        {/* Meta & Tags */}
        <div className={styles.formGridTwo}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Tags (Arabic - Comma Separated)</label>
            <input
              type="text"
              value={tagsArInput}
              onChange={(e) => setTagsArInput(e.target.value)}
              placeholder="أسنان, فينير, تجميل"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Tags (English - Comma Separated)</label>
            <input
              type="text"
              value={tagsEnInput}
              onChange={(e) => setTagsEnInput(e.target.value)}
              placeholder="Dental, Veneers, Cosmetic"
              className={styles.input}
            />
          </div>
        </div>

        {/* Options */}
        <div className={styles.formGridTwo}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Publication Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className={styles.select}
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Estimated Reading Time (Minutes)</label>
            <input
              type="number"
              min="1"
              value={readingMinutes}
              onChange={(e) => setReadingMinutes(parseInt(e.target.value, 10) || 1)}
              className={styles.input}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
          <input
            type="checkbox"
            id="isFeatured"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            style={{ width: '18px', height: '18px', cursor: 'pointer' }}
          />
          <label htmlFor="isFeatured" style={{ fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
            Feature this post on home / blog header ⭐
          </label>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="submit" disabled={loading} className={styles.submitBtn} style={{ width: 'auto', padding: '0.875rem 2rem' }}>
            {loading
              ? mode === 'create'
                ? 'Publishing Post...'
                : 'Saving Changes...'
              : mode === 'create'
              ? 'Publish Article'
              : 'Save Article Changes'}
          </button>
          <Link href="/admin/blogs" className={styles.actionBtn} style={{ padding: '0.875rem 1.5rem' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
