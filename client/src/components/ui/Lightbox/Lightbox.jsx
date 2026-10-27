import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from './Lightbox.module.css';

/**
 * Galería a pantalla completa. Se abre cuando `images` tiene fotos y se cierra con `onClose`.
 * Navegación: flechas en pantalla, flechas del teclado y Escape para cerrar.
 */
export default function Lightbox({ title, images, startIndex = 0, onClose }) {
  const dialogRef = useRef(null);
  const [index, setIndex] = useState(startIndex);
  const isOpen = images.length > 0;
  const hasMany = images.length > 1;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      setIndex(startIndex);
      dialog.showModal();
    }
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen, startIndex]);

  const show = (step) => setIndex((current) => (current + step + images.length) % images.length);

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') show(1);
    if (event.key === 'ArrowLeft') show(-1);
  };

  // Un clic en el fondo oscuro (fuera de la foto) cierra la galería.
  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) onClose();
  };

  const image = images[index];

  return (
    <dialog
      ref={dialogRef}
      className={styles.lightbox}
      aria-label={title}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
    >
      {image && (
        <figure className={styles.figure}>
          <img src={image.src} alt={image.alt} />
          <figcaption>
            {title} · {index + 1} / {images.length}
          </figcaption>
        </figure>
      )}

      <button className={`${styles.control} ${styles.close}`} onClick={onClose} aria-label="Cerrar galería">
        <X size={28} />
      </button>
      {hasMany && (
        <>
          <button className={`${styles.control} ${styles.prev}`} onClick={() => show(-1)} aria-label="Foto anterior">
            <ChevronLeft size={32} />
          </button>
          <button className={`${styles.control} ${styles.next}`} onClick={() => show(1)} aria-label="Foto siguiente">
            <ChevronRight size={32} />
          </button>
        </>
      )}
    </dialog>
  );
}
