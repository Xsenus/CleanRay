import React, { useState } from 'react';
import { Section } from './Section';
import { HeroRays } from './HeroRays';
import { CalendarDays, ArrowRight, Clock, Users, Shield, Percent } from 'lucide-react';

type SubscriptionSectionProps = {
  /** Откроет форму заявки (та же, что «Заказать уборку»). Если не передан — fallback к #lead */
  onSubscribeClick?: () => void;
};

export const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({ onSubscribeClick }) => {
  const [plan, setPlan] = useState<'weekly' | 'biweekly' | 'monthly'>('biweekly');

  return (
    <Section id="subscription" title="Абонемент на регулярный клининг" background="gray">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Визуал карточки с подсветкой */}
        <div className="order-last md:order-first">
          <div className="relative mx-auto w-full max-w-md sm:max-w-lg aspect-[16/10] rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
            {/* Подсветка внутри */}
            <div className="absolute inset-0 opacity-35 pointer-events-none">
              <HeroRays />
            </div>

            <div className="relative z-10 h-full p-6 sm:p-8 flex flex-col items-center justify-center text-center">
              <div className="mb-6">
                <div className="mx-auto w-28 h-28 rounded-full bg-white/75 ring-1 ring-sun/30 flex items-center justify-center">
                  <div className="relative w-24 h-24">
                    <div
                      className="absolute inset-0 animate-[spin_50s_linear_infinite] rounded-full"
                      style={{
                        background:
                          'conic-gradient(from 0deg, rgba(30,64,175,0.18), transparent 40deg, rgba(30,64,175,0.18) 80deg, transparent 120deg)',
                      }}
                    />
                    <div
                      className="absolute inset-3 animate-[spin_70s_linear_infinite] rounded-full"
                      style={{
                        background:
                          'conic-gradient(from 30deg, rgba(245,158,11,0.22), transparent 50deg, rgba(59,130,246,0.2) 100deg, transparent 150deg)',
                      }}
                    />
                    <div
                      className="absolute inset-6 animate-[spin_90s_linear_infinite] rounded-full"
                      style={{
                        background:
                          'conic-gradient(from -10deg, rgba(14,165,233,0.2), transparent 60deg, rgba(14,165,233,0.16) 120deg, transparent 180deg)',
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CalendarDays className="w-10 h-10 text-brand" />
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-ink mb-2">Абонемент на клининг</h3>
              <p className="text-sm text-muted">Регулярная уборка по удобному графику со скидкой</p>
            </div>
          </div>
        </div>

        {/* Текст + UI планов + CTA */}
        <div className="order-first md:order-last">
          <p className="text-lg text-muted leading-relaxed mb-6">
            Для тех, кто ценит стабильность и порядок. Выберите частоту: каждую неделю, раз в две
            недели или ежемесячно.
          </p>

          {/* Выбор частоты (чипы) */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[
              { key: 'weekly', label: 'Каждую неделю', save: '15%' },
              { key: 'biweekly', label: 'Раз в 2 недели', save: '10%' },
              { key: 'monthly', label: 'Ежемесячно', save: '5%' },
            ].map((p) => {
              const active = plan === (p.key as typeof plan);
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setPlan(p.key as typeof plan)}
                  className={[
                    'rounded-xl px-3 py-2 text-sm font-semibold transition-colors',
                    'ring-1',
                    active
                      ? 'bg-sun-50 text-ink ring-sun/40'
                      : 'bg-white text-ink/80 ring-gray-200 hover:bg-gray-50',
                  ].join(' ')}>
                  <div className="flex flex-col items-center leading-snug">
                    <span>{p.label}</span>
                    <span className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-sun">
                      <Percent className="w-3.5 h-3.5" />
                      экономия {p.save}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Улучшённый список преимуществ */}
          <ul className="mb-8 space-y-4">
            <li className="flex items-start gap-4">
              <span className="mt-0.5 inline-flex w-8 h-8 rounded-lg bg-gray-100 ring-1 ring-gray-200 items-center justify-center">
                <Shield className="w-4 h-4 text-brand" />
              </span>
              <div>
                <p className="font-semibold text-ink">Приоритет и стабильность</p>
                <p className="text-sm text-muted">Фиксированные слоты и закреплённая команда</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-0.5 inline-flex w-8 h-8 rounded-lg bg-sun-50 ring-1 ring-sun/30 items-center justify-center">
                <Clock className="w-4 h-4 text-sun" />
              </span>
              <div>
                <p className="font-semibold text-ink">Удобный график</p>
                <p className="text-sm text-muted">Неделя, 2 недели или месяц — как вам комфортно</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="mt-0.5 inline-flex w-8 h-8 rounded-lg bg-gray-100 ring-1 ring-gray-200 items-center justify-center">
                <Users className="w-4 h-4 text-brand" />
              </span>
              <div>
                <p className="font-semibold text-ink">Персональный подход</p>
                <p className="text-sm text-muted">Персональный менеджер и контроль качества</p>
              </div>
            </li>
          </ul>

          {/* CTA-группа */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() =>
                onSubscribeClick ? onSubscribeClick() : (window.location.hash = 'lead')
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand text-white px-5 py-3 font-semibold hover:bg-brand-600 transition-colors"
              data-plan={plan}>
              Оформить абонемент
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#faq"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 text-ink px-5 py-3 font-semibold hover:bg-gray-100 transition-colors">
              Подробнее в FAQ
            </a>
          </div>

          {/* Микро-условия */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 ring-1 ring-gray-200">
              Скидка применяется к каждому визиту
            </span>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 ring-1 ring-gray-200">
              Гибкая пауза по договорённости
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
};
