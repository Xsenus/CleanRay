import React from 'react';
import { useImageFallback } from '../hooks/useImageFallback';
import { ComparisonSlider } from './ComparisonSlider';

type Props = {
  beforeCandidates: string[];
  afterCandidates: string[];
  beforeAlt: string;
  afterAlt: string;
  className?: string;
};

export const ComparisonSliderSmart: React.FC<Props> = ({
  beforeCandidates,
  afterCandidates,
  beforeAlt,
  afterAlt,
  className,
}) => {
  const beforeImage = useImageFallback(beforeCandidates);
  const afterImage = useImageFallback(afterCandidates);

  return (
    <ComparisonSlider
      beforeImage={beforeImage}
      afterImage={afterImage}
      beforeAlt={beforeAlt}
      afterAlt={afterAlt}
      className={className}
    />
  );
};
