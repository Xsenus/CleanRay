import { Sparkles, Phone, Clock, MessageCircle, MapPin, Instagram } from 'lucide-react';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { formatPhoneDisplay } from '../utils/phone';

const Footer: React.FC = () => {
  const cfg = useSiteConfig();

  const rawPhone = cfg.contacts.phone ?? '+7 (088) 008 173';
  const displayPhone = formatPhoneDisplay(rawPhone);
  const digits = rawPhone.replace(/[^\d+]/g, '');
  const telHref = digits ? `tel:${digits}` : undefined;
  const waHref = digits
    ? `https://wa.me/${digits.replace(/^\+/, '')}?text=${encodeURIComponent(
        'Здравствуйте! Хочу заказать уборку.',
      )}`
    : undefined;

  // --- Instagram: нормализуем и показываем @handle ---
  const rawInsta = cfg.links?.instagram?.trim();
  const instaHandle = rawInsta
    ? rawInsta
        .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '')
        .replace(/\/+$/, '')
        .replace(/^@/, '')
    : undefined;
  const instaHref = instaHandle ? `https://instagram.com/${instaHandle}` : undefined;

  const year = cfg.year ?? new Date().getFullYear();

  return (
    <footer id="contacts" className="relative bg-ink text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_380px_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-brand-400" />
              <span className="text-2xl font-bold">{cfg.company.name}</span>
            </div>
            {cfg.company.tagline && (
              <p className="text-white/75 leading-relaxed">{cfg.company.tagline}</p>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <address className="not-italic space-y-3">
              {rawPhone && (
                <a
                  href={telHref}
                  className="flex items-center gap-3 text-white/80 hover:text-white"
                  aria-label={`Позвонить ${displayPhone}`}>
                  <Phone className="w-5 h-5 text-brand-400 shrink-0" />
                  {displayPhone}
                </a>
              )}

              {waHref && (
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/80 hover:text-white"
                  aria-label={`Написать в WhatsApp на номер ${displayPhone}`}>
                  <MessageCircle className="w-5 h-5 text-green-400 shrink-0" />
                  WhatsApp
                </a>
              )}

              {instaHref && instaHandle && (
                <a
                  href={instaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/80 hover:text-white"
                  aria-label={`Перейти в Instagram ${instaHandle}`}>
                  <Instagram className="w-5 h-5 text-pink-400 shrink-0" />@{instaHandle}
                </a>
              )}

              {cfg.contacts.address && (
                <div className="flex items-center gap-3 text-white/80">
                  <MapPin className="w-5 h-5 text-brand-400 shrink-0" />
                  {cfg.contacts.address}
                </div>
              )}

              {cfg.contacts.hours && (
                <div className="flex items-center gap-3 text-white/80">
                  <Clock className="w-5 h-5 text-brand-400 shrink-0" />
                  {cfg.contacts.hours}
                </div>
              )}
            </address>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">УСЛУГИ</h4>
            <nav className="space-y-2">
              <a href="#services" className="block text-white/80 hover:text-white">
                Влажная уборка
              </a>
              <a href="#services" className="block text-white/80 hover:text-white">
                Генеральная уборка
              </a>
              <a href="#services" className="block text-white/80 hover:text-white">
                Специальная уборка
              </a>
              <a href="#quote" className="block text-white/80 hover:text-white">
                Расчет стоимости
              </a>
            </nav>

            <h4 className="text-lg font-semibold mt-6 mb-4">ПЛЮШКИ</h4>
            <nav className="space-y-2">
              <a href="#subscription" className="block text-white/80 hover:text-white">
                Регулярный клининг
              </a>
              <a href="#gift" className="block text-white/80 hover:text-white">
                Уборка в подарок
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-white/10 pt-6">
          <div className="text-center">
            <p className="text-sm text-white/80">
              {cfg.ownerEmail ? (
                <a
                  href={`mailto:${cfg.ownerEmail}`}
                  className="underline-offset-4 hover:underline hover:text-white">
                  {cfg.ownerEmail}
                </a>
              ) : null}
              <span className="mx-1">©</span> {year}
            </p>
            <p className="mt-1 text-xs text-white/60">Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
