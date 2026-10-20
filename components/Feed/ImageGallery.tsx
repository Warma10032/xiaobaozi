'use client'

import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import styles from './ImageGallery.module.css'
import type { FeedImage } from '@/app/api/feed/route'

interface ImageGalleryProps {
  images: FeedImage[]
  /**
   * How many images of this card should be fetched eagerly. The first card of
   * the feed is the most likely LCP candidate, everything else stays lazy.
   */
  priorityCount?: number
}

export default function ImageGallery({
  images,
  priorityCount = 0,
}: ImageGalleryProps) {
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
        {images.map((image, idx) => {
          const isPriority = idx < priorityCount

          return (
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
                src={image.url}
                alt=""
                width={image.width || undefined}
                height={image.height || undefined}
                loading={isPriority ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={isPriority ? 'high' : 'auto'}
                className={styles.galleryImg}
              />
            </button>
          )
        })}
      </div>
      <Lightbox
        open={lightboxOpen}
        index={lightboxIndex}
        close={() => setLightboxOpen(false)}
        slides={images.map((image) => ({ src: image.url }))}
      />
    </>
  )
}
