'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import styles from './ImageGallery.module.css'

interface ImageGalleryProps {
  images: string[]
  eager?: boolean
}

export default function ImageGallery({ images, eager = false }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (images.length === 0) return null

  const getColSpan = (idx: number, total: number) => {
    if (total === 1) return styles.gallerySingle
    if (idx === 0 && total % 2 !== 0) return styles.gallerySpanFull
    return ''
  }

  return (
    <>
      <div
        className={
          images.length === 1 ? styles.gallerySingleGrid : styles.galleryGrid
        }
      >
        {images.map((src, idx) => (
          <button
            key={idx}
            type="button"
            className={`${styles.galleryItem} ${getColSpan(idx, images.length)}`}
            onClick={() => {
              setLightboxIndex(idx)
              setLightboxOpen(true)
            }}
          >
            <img
              src={src}
              alt=""
              loading={eager ? 'eager' : 'lazy'}
              className={styles.galleryImg}
            />
          </button>
        ))}
      </div>
      <Lightbox
        open={lightboxOpen}
        index={lightboxIndex}
        close={() => setLightboxOpen(false)}
        slides={images.map((src) => ({ src }))}
      />
    </>
  )
}
