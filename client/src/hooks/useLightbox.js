import { useState } from 'react';

/** Estado de una galería: qué fotos mostrar, desde cuál y con qué título. */
export function useLightbox() {
  const [gallery, setGallery] = useState({ title: '', images: [], startIndex: 0 });

  const open = (title, images, startIndex = 0) => setGallery({ title, images, startIndex });
  const close = () => setGallery((current) => ({ ...current, images: [] }));

  return { ...gallery, open, close };
}
