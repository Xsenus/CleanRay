import { useEffect, useState } from 'react';

export type SiteConfig = {
  company: { name: string; tagline?: string };
  contacts: { phone?: string; email?: string; address?: string; hours?: string };
  links?: { whatsapp?: string; telegram?: string; instagram?: string; vk?: string };
  ownerEmail?: string;
  year?: number;
};

const DEFAULT_CFG: SiteConfig = {
  company: { name: 'ЛУЧисто', tagline: 'Профессиональная клининговая компания в Алматы' },
  contacts: {
    phone: '+7 (727) 000-00-00',
    email: 'info@luchisto.kz',
    address: 'г. Алматы, ул. Примерная, 123',
    hours: 'Ежедневно с 8:00 до 22:00',
  },
  links: {},
  ownerEmail: 'xsenus92@gmail.com',
  year: new Date().getFullYear(),
};

export function useSiteConfig() {
  const [cfg, setCfg] = useState<SiteConfig>(DEFAULT_CFG);
  const base = import.meta.env.BASE_URL;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${base}site.json`, { cache: 'no-store' });
        if (!res.ok) throw new Error('no cfg');
        const data = (await res.json()) as Partial<SiteConfig>;
        if (cancelled) return;
        setCfg({
          ...DEFAULT_CFG,
          ...data,
          company: { ...DEFAULT_CFG.company, ...(data.company || {}) },
          contacts: { ...DEFAULT_CFG.contacts, ...(data.contacts || {}) },
          links: { ...DEFAULT_CFG.links, ...(data.links || {}) },
          year: data.year ?? DEFAULT_CFG.year,
        });
      } catch {
        if (!cancelled) setCfg(DEFAULT_CFG);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [base]);

  return cfg;
}
