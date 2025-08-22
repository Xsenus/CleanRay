import React from 'react';
import { Shield, Leaf, Star, Clock, ShieldCheck, CreditCard, Recycle, Award } from 'lucide-react';

const BADGES = [
  { icon: Shield, text: 'Проверенный персонал' },
  { icon: Leaf, text: 'Эко-средства' },
  { icon: Star, text: 'Гарантия качества' },
  { icon: Clock, text: 'Доступно уже завтра' },
  { icon: ShieldCheck, text: 'Страховка ответственности' },
  { icon: CreditCard, text: 'Оплата онлайн/картой' },
  { icon: Recycle, text: 'Сортировка и вынос мусора' },
  { icon: Award, text: 'Собственные стандарты' },
];

const BadgeCard: React.FC<{ Icon: React.ComponentType<{ className?: string }>; text: string }> = ({
  Icon,
  text,
}) => (
  <div className="group relative">
    <div
      className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"
      aria-hidden="true"
    />
    <div className="relative flex items-center gap-3 rounded-xl border border-white/40 bg-white/30 backdrop-blur-md px-3 py-2 shadow-[0_2px_18px_rgba(15,23,42,0.06)] transition hover:shadow-md">
      <div className="shrink-0 w-8 h-8 rounded-full bg-white/70 ring-1 ring-sun/30 flex items-center justify-center">
        <Icon className="w-4 h-4 text-sun" />
      </div>
      <span className="text-sm sm:text-[15px] font-semibold text-ink/90 whitespace-nowrap">
        {text}
      </span>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl">
        <span className="absolute -left-1/3 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 animate-[shine_1.1s_ease-in-out]" />
      </span>
    </div>
  </div>
);

export const TrustBadgesMarquee: React.FC = () => {
  return (
    <div className="marquee relative w-screen -ml-[calc(50vw-50%)] mt-5">
      {/* мягкое затухание краёв */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-28 bg-gradient-to-r from-white/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-28 bg-gradient-to-l from-white/80 to-transparent" />

      <div className="overflow-hidden">
        {/* трек — без внешних паддингов/отступов! */}
        <div className="marquee-track flex will-change-transform animate-marquee">
          {/* первая группа */}
          <ul className="inline-flex items-center gap-3 sm:gap-4 min-w-max">
            {BADGES.map((b, i) => (
              <li key={`a-${i}`} className="list-none">
                <BadgeCard Icon={b.icon} text={b.text} />
              </li>
            ))}
          </ul>
          {/* дубль для бесшовности */}
          <ul className="inline-flex items-center gap-3 sm:gap-4 min-w-max" aria-hidden="true">
            {BADGES.map((b, i) => (
              <li key={`b-${i}`} className="list-none">
                <BadgeCard Icon={b.icon} text={b.text} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* keyframes и поведение */}
      <style>{`
        /* длительность можно менять переменной */
        .marquee { --marquee-duration: 28s; }
        .animate-marquee {
          animation: marqueeSlide var(--marquee-duration) linear infinite;
        }
        @keyframes marqueeSlide {
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); } /* ровно до шва */
        }
        .marquee:hover .marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .marquee-track { animation: none !important; } }

        @keyframes shine {
          0%   { transform: translateX(-60%) skewX(-12deg); opacity: 0; }
          45%  { opacity: .8; }
          100% { transform: translateX(180%) skewX(-12deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
