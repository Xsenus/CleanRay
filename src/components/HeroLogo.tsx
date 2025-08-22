import React, { useState } from 'react';

type Props = {
  src?: string;
  alt?: string;
  className?: string;
};

export const HeroLogo: React.FC<Props> = ({ src, alt = 'ЛУЧисто', className = '' }) => {
  const [ok, setOk] = useState(Boolean(src));
  if (!src || !ok) return null;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setOk(false)} // при ошибке загрузки — скрываем логотип
    />
  );
};
