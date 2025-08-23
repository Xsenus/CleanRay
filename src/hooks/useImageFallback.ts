import { useEffect, useState } from 'react';

/**
 * Возвращает первый URL из списка, который реально грузится (onload).
 * Если ничего не загрузилось — возвращает последний элемент списка (обычно дефолтный).
 */
export function useImageFallback(candidates: string[]): string {
  const [src, setSrc] = useState<string>(candidates[candidates.length - 1] ?? '');

  useEffect(() => {
    let cancelled = false;

    const probe = (url: string) =>
      new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => reject();
        img.src = url;
      });

    (async () => {
      for (const url of candidates) {
        try {
          await probe(url);
          if (!cancelled) setSrc(url);
          break;
        } catch {
          // пробуем следующий
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // candidates стабилен (формируем массивы литералами)
  }, [candidates]);

  return src;
}
