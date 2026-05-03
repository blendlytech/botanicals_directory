'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Camera, Loader2, X } from 'lucide-react';

interface ImageUploadProps {
  bucket: 'inventory' | 'vendors';
  onUploadComplete: (url: string) => void;
  currentImageUrl?: string | null;
  label?: string;
}

export default function ImageUpload({ bucket, onUploadComplete, currentImageUrl, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      setError(null);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setPreviewUrl(publicUrl);
      onUploadComplete(publicUrl);
    } catch (err: any) {
      setError(err.message);
      console.error('Error uploading image:', err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    onUploadComplete('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {label && <label className="form-label">{label}</label>}
      
      <div style={{ position: 'relative' }}>
        {previewUrl ? (
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            aspectRatio: '16/9', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            border: '1px solid var(--gold-dim)', 
            backgroundColor: 'var(--bg-surface)' 
          }}>
            <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button
              onClick={removeImage}
              style={{ 
                position: 'absolute', 
                top: '0.5rem', 
                right: '0.5rem', 
                padding: '0.25rem', 
                backgroundColor: '#EF4444', 
                color: 'white', 
                borderRadius: '50%', 
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
              type="button"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <label style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '100%', 
            aspectRatio: '16/9', 
            borderRadius: '12px', 
            border: '2px dashed var(--gold-dim)', 
            backgroundColor: 'var(--bg-surface)', 
            cursor: 'pointer',
            transition: 'border-color 0.2s ease'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.25rem 0 1.5rem' }}>
              {uploading ? (
                <Loader2 style={{ width: '2rem', height: '2rem', color: 'var(--gold)', animation: 'spin 1s linear infinite' }} />
              ) : (
                <Camera style={{ width: '2rem', height: '2rem', color: 'var(--gold-dim)', marginBottom: '0.5rem' }} />
              )}
              <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <span style={{ fontWeight: 600 }}>Click to upload</span> or drag and drop
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>PNG, JPG or WEBP (MAX. 5MB)</p>
            </div>
            <input
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
        )}
      </div>

      {error && <p style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem' }}>{error}</p>}
    </div>
  );
}
