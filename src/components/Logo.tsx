import React from 'react';

type Props = {
  className?: string;
  withText?: boolean;
  width?: number;
  height?: number;
};

const LOGO_SRC = '/images/logos/base_logo.png';

export const Logo: React.FC<Props> = ({ className = '', withText = false, width, height }) => {
  const hasSize = width !== undefined || height !== undefined;

  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="Luchisto">
      <img
        src={LOGO_SRC}
        alt="ЛУЧисто — клининговая компания"
        className={hasSize ? 'select-none' : 'h-12 w-auto select-none'}
        style={hasSize ? { width, height: height ?? 'auto' } : undefined}
        decoding="async"
        fetchPriority="high"
        draggable={false}
      />
      {withText && (
        <span className="font-semibold tracking-tight text-ink">
          <span className="text-brand">ЛУЧ</span>исто
        </span>
      )}
    </div>
  );
};
