import React, { useState } from 'react';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';

type HeaderProps = {
  /** Откроет модалку с заявкой. Если не передан — fallback на #lead */
  onOrderClick?: () => void;
};

export const Header: React.FC<HeaderProps> = ({ onOrderClick }) => {
  const [open, setOpen] = useState(false);

  const handleOrderClick: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement> = (e) => {
    if (onOrderClick) {
      e.preventDefault?.();
      onOrderClick();
    } else {
      // безопасный fallback
      window.location.hash = 'lead';
    }
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 w-full border-b border-gray-100 bg-white/85 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Логотип */}
        <a
          href="#top"
          className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md">
          <Logo className="h-8" />
        </a>

        {/* Десктоп-навигация */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-ink/80 md:ml-10">
          <a
            href="#mission"
            className="py-2 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md">
            О нас
          </a>
          <a
            href="#gift"
            className="py-2 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md">
            Сертификат
          </a>
          <a
            href="#subscription"
            className="py-2 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md">
            Абонемент
          </a>
          <a
            href="#faq"
            className="py-2 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md">
            FAQ
          </a>
          <a
            href="#contact"
            className="py-2 hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md">
            Контакты
          </a>
        </nav>

        {/* Правая зона: CTA + бургер (бургер виден только на мобиле) */}
        <div className="flex items-center gap-2">
          {/* CTA для десктопа */}
          <a
            href="#lead"
            onClick={handleOrderClick}
            className="hidden md:inline-flex items-center justify-center rounded-xl bg-brand text-white px-3 py-2 text-sm font-medium hover:bg-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand">
            Заказать уборку
          </a>

          {/* CTA для мобилы — рядом с бургером */}
          <button
            type="button"
            onClick={handleOrderClick}
            className="md:hidden inline-flex items-center justify-center rounded-lg bg-brand text-white px-3 py-2 text-sm font-semibold hover:bg-brand-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label="Заказать уборку">
            Заказать уборку
          </button>

          {/* Бургер на мобиле */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-ink/80 hover:text-ink hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label="Открыть меню"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Мобильная панель (без CTA внутри) */}
      <div
        id="mobile-nav"
        className={`md:hidden origin-top ${
          open ? 'block' : 'hidden'
        } border-t border-gray-100 bg-white/95 backdrop-blur`}>
        <nav className="px-4 py-3 space-y-1 text-ink/90">
          <a
            href="#mission"
            onClick={() => setOpen(false)}
            className="block px-2 py-2 rounded-md hover:bg-gray-50">
            О нас
          </a>
          <a
            href="#gift"
            onClick={() => setOpen(false)}
            className="block px-2 py-2 rounded-md hover:bg-gray-50">
            Сертификат
          </a>
          <a
            href="#subscription"
            onClick={() => setOpen(false)}
            className="block px-2 py-2 rounded-md hover:bg-gray-50">
            Абонемент
          </a>
          <a
            href="#faq"
            onClick={() => setOpen(false)}
            className="block px-2 py-2 rounded-md hover:bg-gray-50">
            FAQ
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="block px-2 py-2 rounded-md hover:bg-gray-50">
            Контакты
          </a>
        </nav>
      </div>
    </header>
  );
};
