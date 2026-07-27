'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import styles from '@/styles/admin.module.css';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
}

export function ImageUpload({
  label,
  value,
  onChange,
  required = false,
  placeholder = 'https://...',
  helperText,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (file?: File) => {
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'image');
      if (value && value.includes('res.cloudinary.com')) {
        formData.append('oldUrl', value);
      }

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      onChange(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  return (
    <div className={styles.formGroup} style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
        <label className={styles.label} style={{ margin: 0 }}>
          {label} {required ? '*' : ''}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          style={{ fontSize: '0.75rem', color: 'var(--main-color)', fontWeight: 600, border: 'none', background: 'none', cursor: 'pointer' }}
        >
          {showUrlInput ? 'Hide URL Input' : 'Edit URL directly'}
        </button>
      </div>

      {helperText && (
        <p style={{ fontSize: '0.78rem', color: 'var(--boulder)', marginTop: 0, marginBottom: '0.5rem' }}>
          {helperText}
        </p>
      )}

      {/* Upload Drop Zone & Preview */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? 'var(--main-color)' : value ? 'var(--main-color)' : 'var(--alto, #d6d6d6)'}`,
          backgroundColor: isDragging ? 'rgba(190, 146, 73, 0.05)' : '#fafafa',
          padding: value ? '0.75rem' : '1.5rem',
          textAlign: 'center',
          cursor: uploading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          minHeight: value ? '90px' : '130px',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              handleFileChange(files[0]);
            }
          }}
        />

        {uploading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '26px',
                height: '26px',
                border: '3px solid var(--mercury)',
                borderTopColor: 'var(--main-color)',
                borderRadius: '50%',
                animation: 'spinUpload 1s infinite linear',
              }}
            />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--main-color)' }}>
              Uploading to Cloudinary...
            </span>
            <style>{`@keyframes spinUpload { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : value ? (
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '1rem', textAlign: 'left' }}>
            <div style={{ width: '80px', height: '55px', flexShrink: 0, border: '1px solid var(--mercury)', overflow: 'hidden', backgroundColor: '#fff' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Uploaded Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--haiti)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Image Attached & Ready
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--boulder)', wordBreak: 'break-all', marginTop: '0.15rem', maxHeight: '2.2rem', overflow: 'hidden' }}>
                {value}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--main-color)', fontWeight: 600, marginTop: '0.25rem' }}>
                Click or drop another file to replace
              </div>
            </div>
          </div>
        ) : (
          <div>
            <svg style={{ width: '32px', height: '32px', margin: '0 auto 0.4rem', color: 'var(--main-color)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--haiti)' }}>
              Click to Upload or Drag & Drop Image
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--boulder)', marginTop: '0.2rem' }}>
              PNG, JPG, WEBP or AVIF via Cloudinary
            </div>
          </div>
        )}
      </div>

      {error && (
        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#d9534f', fontWeight: 600 }}>
          ⚠️ {error}
        </div>
      )}

      {showUrlInput && (
        <div style={{ marginTop: '0.5rem' }}>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={styles.input}
            style={{ fontSize: '0.85rem' }}
          />
        </div>
      )}
    </div>
  );
}
