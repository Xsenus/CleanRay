import React from 'react';
import { Section } from './Section';
import { HeroRays } from './HeroRays';
import { ArrowRight, Gift, Clock, SlidersHorizontal, Mail, Info } from 'lucide-react';

type GiftSectionProps = {
  /** Откроет форму заявки (тот же, что openLeadForm). Если не передан — fallback к #lead */
  onGiftClick?: () => void;
};

export const GiftSection: React.FC<GiftSectionProps> = ({ onGiftClick }) => (
  <Section id="gift" title="Подарить уборку" background="gray">
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Визуал карточки */}
      <div className="order-first md:order-last">
        <div className="relative mx-auto w-full max-w-md sm:max-w-lg aspect-[16/10] rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
          {/* Подсветка внутри карточки */}
          <div className="absolute inset-0 opacity-35 pointer-events-none">
            <HeroRays />
          </div>

          {/* Риббон */}
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center rounded-full bg-sun-50 text-sun ring-1 ring-sun/30 px-2.5 py-1 text-[11px] font-semibold">
              E-Gift
            </span>
          </div>

          {/* Контент */}
          <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col items-center justify-center text-center">
            <div className="mb-6">
              <div className="mx-auto w-28 h-28 rounded-full bg-white/80 ring-1 ring-sun/30 flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <div
                    className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full"
                    style={{
                      background:
                        'conic-gradient(from 0deg, rgba(30,64,175,0.22), transparent 30deg, rgba(245,158,11,0.24) 60deg, transparent 90deg)',
                    }}
                  />
                  <div
                    className="absolute inset-3 animate-[spin_60s_linear_infinite] rounded-full"
                    style={{
                      background:
                        'conic-gradient(from 15deg, rgba(59,130,246,0.25), transparent 40deg, rgba(59,130,246,0.22) 80deg, transparent 120deg)',
                    }}
                  />
                  <div
                    className="absolute inset-6 animate-[spin_80s_linear_infinite] rounded-full"
                    style={{
                      background:
                        'conic-gradient(from -20deg, rgba(245,158,11,0.22), transparent 50deg, rgba(14,165,233,0.2) 100deg, transparent 160deg)',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Gift className="w-10 h-10 text-brand" />
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-ink mb-2">Подарочный сертификат</h3>
            <p className="text-sm text-muted">На профессиональную уборку от компании «ЛУЧисто»</p>
          </div>
        </div>
      </div>

      {/* Текст + CTA */}
      <div className="order-last md:order-first">
        <p className="text-lg text-muted leading-relaxed mb-6">
          Идея для заботливых мужей: подарочный сертификат на уборку — лучший сюрприз, после
          которого жена улыбнётся, а выходные пройдут без хлопот.
        </p>

        {/* Улучшённый список преимуществ */}
        <ul className="mb-8 space-y-4">
          <li className="flex items-start gap-4">
            <span className="mt-0.5 inline-flex w-8 h-8 rounded-lg bg-sun-50 ring-1 ring-sun/30 items-center justify-center">
              <Clock className="w-4 h-4 text-sun" />
            </span>
            <div>
              <p className="font-semibold text-ink">Электронный сертификат за 1 минуту</p>
              <p className="text-sm text-muted">Оплата онлайн, моментальная доставка на e-mail</p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <span className="mt-0.5 inline-flex w-8 h-8 rounded-lg bg-sun-50 ring-1 ring-sun/30 items-center justify-center">
              <SlidersHorizontal className="w-4 h-4 text-sun" />
            </span>
            <div>
              <p className="font-semibold text-ink">Свобода выбора</p>
              <p className="text-sm text-muted">Выбираете сумму или конкретную услугу</p>
            </div>
          </li>

          <li className="flex items-start gap-4">
            <span className="mt-0.5 inline-flex w-8 h-8 rounded-lg bg-sun-50 ring-1 ring-sun/30 items-center justify-center">
              <Mail className="w-4 h-4 text-sun" />
            </span>
            <div>
              <p className="font-semibold text-ink">Красивая отправка адресату</p>
              <p className="text-sm text-muted">Письмо с поздравлением и сертификатом</p>
            </div>
          </li>
        </ul>

        {/* CTA-группа */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => (onGiftClick ? onGiftClick() : (window.location.hash = 'lead'))}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sun text-white px-5 py-3 font-semibold hover:bg-sun-600 transition-colors">
            Подарить уборку
            <ArrowRight className="w-5 h-5" />
          </button>

          <a
            href="#faq"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 text-ink px-5 py-3 font-semibold hover:bg-gray-100 transition-colors">
            <Info className="w-5 h-5 text-sun" />
            Как это работает?
          </a>
        </div>

        {/* Микро-бейджи условий */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 ring-1 ring-gray-200">
            Доставка на e-mail
          </span>
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 ring-1 ring-gray-200">
            Действителен 6 месяцев
          </span>
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 ring-1 ring-gray-200">
            Можно передать другому
          </span>
        </div>
      </div>
    </div>
  </Section>
);
