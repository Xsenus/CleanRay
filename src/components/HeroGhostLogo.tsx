import React from 'react';

type Props = {
  className?: string;
  fileName?: string;
};

export const HeroGhostLogo: React.FC<Props> = ({ className = '', fileName = 'hero-ghost.svg' }) => {
  const base = import.meta.env.BASE_URL;
  const src = `${base}images/${fileName}`;
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={['absolute pointer-events-none select-none opacity-10 z-10', className].join(' ')}
      loading="eager"
      decoding="async"
    />
  );
};
