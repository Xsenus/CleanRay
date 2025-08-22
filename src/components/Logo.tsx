import React from 'react';

/** Логотип: тёплое «ядро» (sun) + лучи brand/sun */
export const Logo: React.FC<{ className?: string; withText?: boolean }> = ({
  className = '',
  withText = true,
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`} aria-label="Luchisto">
      <svg
        width="32"
        height="32"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true">
        <defs>
          <radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE68A" /> {/* sun-200 */}
            <stop offset="55%" stopColor="#F59E0B" /> {/* sun-500 */}
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.15" />
          </radialGradient>
        </defs>

        {/* тёплое ядро */}
        <circle cx="32" cy="32" r="9" fill="url(#sunCore)" />

        {/* смешанные лучи brand/sun */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          const len = i % 2 === 0 ? 24 : 18;
          const color = i % 2 === 0 ? '#1E40AF' : '#F59E0B';
          const width = i % 2 === 0 ? 2 : 1.4;
          return (
            <line
              key={i}
              x1="32"
              y1="32"
              x2={32 + len * Math.cos((angle * Math.PI) / 180)}
              y2={32 + len * Math.sin((angle * Math.PI) / 180)}
              stroke={color}
              strokeWidth={width}
              strokeLinecap="round"
              opacity="0.95"
            />
          );
        })}
      </svg>

      {withText && (
        <span className="font-semibold tracking-tight text-ink">
          <span className="text-brand">ЛУЧ</span>исто
        </span>
      )}
    </div>
  );
};
