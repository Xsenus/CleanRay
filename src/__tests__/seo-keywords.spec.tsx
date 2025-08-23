import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';

describe('SEO keywords integration', () => {
  test('title/description/keywords содержат основные ключи и «Алматы»', async () => {
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>,
    );

    // title
    expect(document.title).toMatch(/Алматы/i);
    expect(document.title).toMatch(/Уборка квартир/i);

    // meta description
    const desc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    expect(desc?.content || '').toMatch(/профессиональная уборка/i);
    expect(desc?.content || '').toMatch(/Алматы/i);
    expect(desc?.content || '').toMatch(/генеральная|влажная/i);

    // meta keywords
    const keywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
    const kw = (keywords?.content || '').toLowerCase();

    const phrases = [
      'уборка алматы',
      'клининг алматы',
      'уборка после ремонта алматы',
      'клининг квартир алматы',
      'генеральная уборка алматы',
      'регулярная уборка алматы',
      'эко-клининг алматы',
      'экологическая уборка алматы',
    ];

    for (const p of phrases) {
      expect(kw).toContain(p);
    }
  });

  test('страница содержит ключевые блоки (услуги и расчёт)', () => {
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>,
    );

    expect(document.body).toHaveTextContent(/Влажная/i);
    expect(document.body).toHaveTextContent(/Генеральная/i);
    expect(document.body).toHaveTextContent(/Рассчитать стоимость/i);
  });
});
