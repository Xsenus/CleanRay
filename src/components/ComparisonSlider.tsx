import React, { useRef, useState, useCallback, useEffect } from 'react';

type Labels = { before?: string; after?: string };

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string; // например: "w-full aspect-[4/3] rounded-xl shadow-sm"
  initial?: number; // стартовая позиция 0..100 (по умолчанию 50)
  labels?: Labels; // подписи "до/после"
  ariaLabel?: string; // label для role="slider"
  onChange?: (value: number) => void;
}

// Простой аналог clsx без зависимости
const cx = (...v: Array<string | undefined | null | false>) => v.filter(Boolean).join(' ');

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  beforeImage,
  afterImage,
  beforeAlt = 'Before',
  afterAlt = 'After',
  className = '',
  initial = 50,
  labels,
  ariaLabel = 'Сравнение до и после',
  onChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState<number>(clamp(initial));

  function clamp(v: number) {
    return Math.min(100, Math.max(0, v));
  }

  const setFromClientX = useCallback(
    (clientX: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      const next = clamp(pct);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPos(next);
        onChange?.(next);
      });
    },
    [onChange],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      setDragging(true);
      setFromClientX(e.clientX);
      e.preventDefault();
    },
    [setFromClientX],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      setFromClientX(e.clientX);
      e.preventDefault();
    },
    [dragging, setFromClientX],
  );

  const endDrag = useCallback(() => {
    setDragging(false);
  }, []);

  // Глобальный отпуск pointer-а
  useEffect(() => {
    const up = () => endDrag();
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, [endDrag]);

  // Корректный cleanup для RAF (строго void)
  useEffect(() => {
    return () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  // Клавиатура: ←/→ (±2), Shift+←/→ (±10), Home/End
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      const step = e.shiftKey ? 10 : 2;
      if (e.key === 'ArrowLeft') {
        setPos((p) => {
          const n = clamp(p - step);
          onChange?.(n);
          return n;
        });
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        setPos((p) => {
          const n = clamp(p + step);
          onChange?.(n);
          return n;
        });
        e.preventDefault();
      } else if (e.key === 'Home') {
        setPos(() => {
          const n = 0;
          onChange?.(n);
          return n;
        });
        e.preventDefault();
      } else if (e.key === 'End') {
        setPos(() => {
          const n = 100;
          onChange?.(n);
          return n;
        });
        e.preventDefault();
      }
    },
    [onChange],
  );

  const onDoubleClick = useCallback(() => {
    setPos(() => {
      const n = 50;
      onChange?.(n);
      return n;
    });
  }, [onChange]);

  return (
    <div
      ref={containerRef}
      className={cx('relative w-full overflow-hidden select-none touch-none', className)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onDoubleClick={onDoubleClick}
      style={{ cursor: dragging ? ('grabbing' as const) : ('grab' as const) }}
      aria-roledescription="Слайдер сравнения">
      {/* BEFORE */}
      <img
        src={beforeImage}
        alt={beforeAlt}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
        loading="lazy"
        decoding="async"
      />

      {/* AFTER */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `polygon(${pos}% 0%, 100% 0%, 100% 100%, ${pos}% 100%)` }}>
        <img
          src={afterImage}
          alt={afterAlt}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-[3px] sm:w-[4px]"
        style={{
          left: `${pos}%`,
          transform: 'translateX(-50%)',
          background: 'linear-gradient(to bottom, rgba(255,255,255,.95), rgba(255,255,255,.6))',
          boxShadow: '0 0 0 1px rgba(0,0,0,.06), 0 0 12px rgba(0,0,0,.20)',
        }}
        aria-hidden="true"
      />

      {/* Handle */}
      <button
        type="button"
        className={cx(
          'absolute top-1/2 -translate-y-1/2 -translate-x-1/2',
          'w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95',
          'shadow-md ring-1 ring-black/10 flex items-center justify-center',
          'cursor-grab focus:outline-none focus-visible:ring-2 focus-visible:ring-brand',
        )}
        style={{ left: `${pos}%` }}
        role="slider"
        aria-label={ariaLabel}
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}%`}
        onKeyDown={onKeyDown}>
        <div className="flex items-center gap-1">
          <span className="block w-[2px] h-4 bg-gray-400" />
          <span className="block w-[2px] h-4 bg-gray-400" />
          <span className="block w-[2px] h-4 bg-gray-400" />
        </div>
      </button>

      {/* Labels */}
      <div className="absolute top-3 left-3 bg-black/75 text-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded">
        {labels?.before ?? 'до'}
      </div>
      <div className="absolute top-3 right-3 bg-black/75 text-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide rounded">
        {labels?.after ?? 'после'}
      </div>
    </div>
  );
};
