import React from 'react';

const Glyph = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="3" width="18" height="18" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
  </svg>
);

/** Shows an uploaded image, or a labeled placeholder box (matches the reference's <image-slot>). */
export default function ImageSlot({ src, alt = '', label = 'Image', gray = false, style, className = '' }) {
  const merged = { objectFit: 'cover', ...style };
  if (src) {
    return <img src={src} alt={alt} className={`${gray ? 'grayscale' : ''} ${className}`} style={merged} loading="lazy" />;
  }
  return (
    <div className={`img-slot ${gray ? 'grayscale' : ''} ${className}`} style={style}>
      <Glyph /><span>{label}</span>
    </div>
  );
}
