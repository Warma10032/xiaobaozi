'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import EchoCard from './EchoCard'
import styles from './Feed.module.css'
import echoStyles from './EchoCard.module.css'
import galleryStyles from './ImageGallery.module.css'
import { useLanguage } from '@/i18n/LanguageProvider'
import { translations } from '@/i18n/translations'
import type { FeedItem, ServerInfo } from '@/app/api/feed/route'

interface FeedResponse {
  items?: FeedItem[]
  hasMore?: boolean
  server?: ServerInfo | null
}

const PAGE_SIZE = 5
const COL_COUNT = 2

function distributeToColumns(
  items: FeedItem[],
  heights: number[],
  rowGap: number,
): FeedItem[][] {
  const colHeights = new Array(COL_COUNT).fill(0)
  const cols: FeedItem[][] = Array.from({ length: COL_COUNT }, () => [])
  let lastTop = 0

  for (let i = 0; i < items.length; i++) {
    const h = heights[i] ?? 0
    const eligibleColumns = colHeights
      .map((height, index) => ({ height, index }))
      .filter(({ height }) => height >= lastTop)
    const candidates =
      eligibleColumns.length > 0
        ? eligibleColumns
        : colHeights.map((height, index) => ({ height, index }))
    const minH = Math.min(...candidates.map(({ height }) => height))
    const col =
      candidates.find(({ height }) => height === minH)?.index ?? 0

    cols[col].push(items[i])
    // The rendered columns include spacing between cards. Keep that spacing in
    // the layout math too, otherwise the estimated "shortest" column drifts
    // away from the browser's actual visual height and breaks chronology.
    lastTop = colHeights[col]
    colHeights[col] += h + rowGap
  }

  return cols
}

/**
 * Waits for the gallery images to settle before the masonry columns are
 * measured. Lazy images that never scroll into view would otherwise block the
 * measurement forever, so the wait is capped: the intrinsic width/height
 * attributes on every image already reserve the correct box, so the measured
 * heights stay accurate even when the wait times out.
 */
function waitForImages(
  images: HTMLImageElement[],
  timeoutMs = 1500,
): Promise<void> {
  const allLoaded = Promise.all(
    images.map((image) => {
      const waitForLoad =
        image.complete && image.naturalWidth > 0
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              const settle = () => resolve()
              image.addEventListener('load', settle, { once: true })
              image.addEventListener('error', settle, { once: true })
            })

      return waitForLoad.then(async () => {
        if (image.naturalWidth === 0 || !image.decode) return
        try {
          await image.decode()
        } catch {
          // A failed decode should not block layout forever; the load/error
          // event above already tells us the image has reached a final state.
        }
      })
    }),
  ).then(() => undefined)

  return Promise.race([
    allLoaded,
    new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
  ])
}

export default function Feed() {
  const { lang } = useLanguage()
  const t = translations.feed
  const [items, setItems] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [hasMore, setHasMore] = useState(false)
  const [columns, setColumns] = useState<FeedItem[][]>([])
  const [measured, setMeasured] = useState(false)
  const measureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false

    fetch(`/api/feed?limit=${limit}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        return res.json() as Promise<FeedResponse>
      })
      .then((data) => {
        if (cancelled) return
        setItems(data.items ?? [])
        setHasMore(Boolean(data.hasMore))
        setMeasured(false)
        setLoading(false)
      })
      .catch(() => {
        if (!cancelled) {
          setHasMore(false)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [limit])

  const redistribute = useCallback(async () => {
    const el = measureRef.current
    if (!el) return

    const galleryImages = Array.from(
      el.querySelectorAll(`.${galleryStyles.galleryImg}`),
    ) as HTMLImageElement[]
    await waitForImages(galleryImages)
    if (measureRef.current !== el) return

    // Wait for the browser to commit the final image dimensions into layout
    // before reading heights. One frame is not always enough after decode.
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => resolve())
      })
    })
    if (measureRef.current !== el) return

    const cards = el.querySelectorAll(`.${echoStyles.echoCard}`)
    if (cards.length !== items.length) return

    const heights: number[] = []
    for (let i = 0; i < cards.length; i++) {
      const h = (cards[i] as HTMLElement).offsetHeight
      if (h > 0) heights.push(h)
    }

    if (heights.length !== items.length) return

    const firstCard = cards[0] as HTMLElement | undefined
    const rowGap = firstCard
      ? Number.parseFloat(window.getComputedStyle(firstCard).marginBottom) || 0
      : 0

    setColumns(distributeToColumns(items, heights, rowGap))
    setMeasured(true)
  }, [items])

  useEffect(() => {
    if (items.length === 0 || measured) return
    requestAnimationFrame(() => {
      requestAnimationFrame(redistribute)
    })
  }, [items, measured, redistribute])

  useEffect(() => {
    if (items.length === 0) return
    let timeout: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => setMeasured(false), 200)
    }
    window.addEventListener('resize', onResize)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', onResize)
    }
  }, [items])

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.headerLine} />
        <h2 className={styles.headerTitle}>{t.header}</h2>
      </div>
      {loading ? (
        <p className={styles.statusMsg}>{t.loading}</p>
      ) : items.length === 0 ? (
        <p className={styles.statusMsg}>
          {lang === 'zh' ? t.empty : t.emptyEn}
        </p>
      ) : (
        <div className={styles.masonry} ref={measured ? undefined : measureRef}>
          {!measured ? (
            <>
              <div className={styles.masonryCol}>
                {items.map((item, index) => (
                  <EchoCard
                    key={item.id}
                    echo={item}
                    lang={lang}
                    priorityImages={index === 0 ? 1 : 0}
                  />
                ))}
              </div>
              <div className={styles.masonryCol} />
            </>
          ) : (
            columns.map((col, ci) => (
              <div key={ci} className={styles.masonryCol}>
                {col.map((item) => (
                  <EchoCard
                    key={item.id}
                    echo={item}
                    lang={lang}
                    priorityImages={
                      items.findIndex((candidate) => candidate.id === item.id) === 0
                        ? 1
                        : 0
                    }
                  />
                ))}
              </div>
            ))
          )}
        </div>
      )}

      {!loading && hasMore && (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.loadMoreBtn}
            onClick={() => setLimit((prev) => prev + PAGE_SIZE)}
          >
            {lang === 'zh' ? '继续装填' : 'Load More'}
          </button>
        </div>
      )}

      {!loading && !hasMore && items.length > 0 && (
        <p className={styles.statusMsg}>
          {lang === 'zh' ? '没有更多了' : 'No more echoes'}
        </p>
      )}
    </section>
  )
}
