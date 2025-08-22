import React from 'react';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  background?: 'white' | 'gray';
}

export const Section: React.FC<SectionProps> = ({
  id,
  children,
  className = '',
  title,
  subtitle,
  background = 'white',
}) => {
  const bgClass = background === 'gray' ? 'bg-gray-50' : 'bg-white';

  return (
    <section id={id} className={`py-16 lg:py-24 ${bgClass} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink mb-4">{title}</h2>
            )}
            {subtitle && (
              <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
