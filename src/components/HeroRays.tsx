import React from 'react';

/**
 * Яркие «живые» лучи:
 * - 3 вращающихся conic-слоя (brand + sun) с повышенной яркостью
 * - 2 проходящих блики (sweep beams) c большей видимостью
 * - 2 тёплых radial-glow (крупнее и контрастнее)
 * - уважает prefers-reduced-motion
 */
export const HeroRays: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* мягкая виньетка (чуть контрастнее) */}
      <div className="absolute inset-0 bg-[radial-gradient(closest-side,rgba(2,6,23,0.08),transparent_70%)]" />

      {/* Кольца-лучи — заметнее за счёт большей opacity и меньшего blur */}
      <div
        className="absolute inset-[-10%] animate-[spin_80s_linear_infinite]"
        style={{
          background:
            'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(30,64,175,0.35) 20deg, transparent 40deg, rgba(59,130,246,0.30) 60deg, transparent 80deg, rgba(30,64,175,0.28) 100deg, transparent 120deg)',
          filter: 'blur(8px)',
          opacity: 0.45,
        }}
      />
      <div
        className="absolute inset-[-10%] animate-[spin_110s_linear_infinite_reverse]"
        style={{
          background:
            'conic-gradient(from 12deg at 50% 50%, transparent 0deg, rgba(245,158,11,0.34) 18deg, transparent 36deg, rgba(250,204,21,0.28) 54deg, transparent 72deg, rgba(30,64,175,0.22) 90deg, transparent 108deg)',
          filter: 'blur(10px)',
          opacity: 0.38,
        }}
      />
      <div
        className="absolute inset-[-10%] animate-[spin_95s_linear_infinite_reverse]"
        style={{
          background:
            'conic-gradient(from -18deg at 50% 50%, transparent 0deg, rgba(59,130,246,0.28) 16deg, transparent 32deg, rgba(245,158,11,0.26) 48deg, transparent 64deg)',
          filter: 'blur(9px)',
          opacity: 0.34,
        }}
      />

      {/* Проходящие блики — толще и ярче */}
      <div
        className="absolute left-1/2 top-1/2 w-[180%] h-[180%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(245,158,11,0.45) 50%, transparent 100%)',
          filter: 'blur(10px)',
          opacity: 0.55,
          animation: 'sweep 24s linear infinite',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 w-[170%] h-[170%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.38) 50%, transparent 100%)',
          filter: 'blur(10px)',
          opacity: 0.48,
          animation: 'sweep 34s linear infinite reverse',
          animationDelay: '-8s',
          willChange: 'transform',
        }}
      />

      {/* Тёплые glows — крупнее и насыщеннее */}
      <div
        className="absolute w-[80%] h-[80%] -left-[10%] top-[6%]"
        style={{
          background: 'radial-gradient(closest-side, rgba(245,158,11,0.28), transparent 70%)',
          filter: 'blur(12px)',
          animation: 'drift1 38s ease-in-out infinite',
          willChange: 'transform, opacity',
        }}
      />
      <div
        className="absolute w-[70%] h-[70%] right-[-6%] bottom-[10%]"
        style={{
          background: 'radial-gradient(closest-side, rgba(59,130,246,0.25), transparent 65%)',
          filter: 'blur(12px)',
          animation: 'drift2 50s ease-in-out infinite',
          willChange: 'transform, opacity',
        }}
      />

      {/* лёгкое «дыхание» яркости — чуть сильнее */}
      <div className="absolute inset-0" style={{ animation: 'breath 7s ease-in-out infinite' }} />

      <style>{`
        @keyframes sweep {
          from { transform: rotate(0deg) }
          to   { transform: rotate(360deg) }
        }
        @keyframes drift1 {
          0%   { transform: translate3d(0, 0, 0) scale(1); opacity: .9; }
          50%  { transform: translate3d(7%, -5%, 0) scale(1.06); opacity: 1; }
          100% { transform: translate3d(0, 0, 0) scale(1); opacity: .9; }
        }
        @keyframes drift2 {
          0%   { transform: translate3d(0, 0, 0) scale(1); opacity: .85; }
          50%  { transform: translate3d(-6%, 7%, 0) scale(1.07); opacity: .98; }
          100% { transform: translate3d(0, 0, 0) scale(1); opacity: .85; }
        }
        @keyframes breath {
          0%, 100% { filter: brightness(1); }
          50%      { filter: brightness(1.12); }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-[spin_80s_linear_infinite],
          .animate-[spin_95s_linear_infinite_reverse],
          .animate-[spin_110s_linear_infinite_reverse] {
            animation: none !important;
          }
          div[style*="animation: sweep"],
          div[style*="animation: drift1"],
          div[style*="animation: drift2"],
          div[style*="animation: breath"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
