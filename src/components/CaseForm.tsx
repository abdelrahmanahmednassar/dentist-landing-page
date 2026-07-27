'use client';

import { useState } from 'react';
import { Link } from "@/i18n/navigation";

import { ImageUpload } from '@/components/ImageUpload';
import styles from '@/styles/admin.module.css';

export type CaseCategory = 'implants' | 'cosmetic' | 'orthodontics';

export interface CaseFormData {
  id?: string;
  category: CaseCategory;
  titleAr?: string | null;
  titleEn?: string | null;
  imageUrl: string;
}

interface CaseFormProps {
  mode: 'create' | 'edit';
  initialData?: Partial<CaseFormData>;
  onSubmit: (data: CaseFormData) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

const CATEGORY_OPTIONS: { value: CaseCategory; labelEn: string; labelAr: string }[] = [
  { value: 'implants', labelEn: 'Dental Implants', labelAr: 'زراعة الأسنان' },
  { value: 'cosmetic', labelEn: 'Cosmetic Dentistry', labelAr: 'تجميل الأسنان' },
  { value: 'orthodontics', labelEn: 'Orthodontics', labelAr: 'تقويم الأسنان' },
];

export function CaseForm({
  mode,
  initialData,
  onSubmit,
  loading = false,
  error = null,
}: CaseFormProps) {
  const [category, setCategory] = useState<CaseCategory>(
    (initialData?.category as CaseCategory) ?? 'implants'
  );
  const [titleAr, setTitleAr] = useState(initialData?.titleAr ?? '');
  const [titleEn, setTitleEn] = useState(initialData?.titleEn ?? '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? '');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!imageUrl) {
      setValidationError('Please upload a case photograph or provide an image URL before saving.');
      return;
    }

    await onSubmit({
      ...(initialData?.id ? { id: initialData.id } : {}),
      category,
      titleAr: titleAr.trim() || undefined,
      titleEn: titleEn.trim() || undefined,
      imageUrl,
    });
  };

  const activeError = error || validationError;

  return (
    <div className={styles.cardSection}>
      {activeError && (
        <div className={styles.errorBanner}>
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{activeError}</span>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className={styles.form}>
        {/* Category Selection */}
        <div className={styles.formGroup} style={{ maxWidth: '400px' }}>
          <label className={styles.label}>Case Category *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CaseCategory)}
            className={styles.select}
            required
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.labelEn} ({opt.labelAr})
              </option>
            ))}
          </select>
          <span style={{ fontSize: '0.8rem', color: 'var(--boulder)', marginTop: '0.3rem' }}>
            Select the clinic specialty category under which this case will be showcased.
          </span>
        </div>

        {/* Optional Titles */}
        <div className={styles.formGridTwo}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title / Case Description (Arabic - Optional)</label>
            <input
              type="text"
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              placeholder="مثال: تركيبات الزيركون لابتسامة طبيعية"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Title / Case Description (English - Optional)</label>
            <input
              type="text"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder="e.g., Zirconia veneers for natural smile makeover"
              className={styles.input}
            />
          </div>
        </div>

        {/* Case Image Upload */}
        <div className={styles.formGroup} style={{ maxWidth: '560px' }}>
          <ImageUpload
            label="Case Photograph / Media *"
            value={imageUrl}
            onChange={setImageUrl}
            required
            helperText="High resolution smile makeover or treatment photograph displayed in the clinical gallery."
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <button type="submit" disabled={loading} className={styles.submitBtn} style={{ width: 'auto', padding: '0.875rem 2rem' }}>
            {loading
              ? mode === 'create'
                ? 'Saving Clinical Case...'
                : 'Updating Case...'
              : mode === 'create'
              ? 'Create Case Record'
              : 'Save Case Changes'}
          </button>
          <Link href="/admin/cases" className={styles.actionBtn} style={{ padding: '0.875rem 1.5rem', textDecoration: 'none' }}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
