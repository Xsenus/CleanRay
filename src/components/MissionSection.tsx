import React from 'react';
import { Section } from './Section';
import { HeroRays } from './HeroRays';
import { Leaf, Shield, Heart, Award, Users, Quote } from 'lucide-react';

export const MissionSection: React.FC = () => (
  <Section
    id="mission"
    title={
      <>
        Миссия компании <span className="text-brand">ЛУЧ</span>исто
      </>
    }
    subtitle="Мы помогаем заботиться о комфорте тех, кого вы любите."
    background="white">
    <div className="relative card overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <HeroRays />
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-8 p-6 sm:p-8">
        {/* Левая колонка — текст, цель, цитата и CTA */}
        <div>
          {/* Значки */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="badge-sun">
              <Leaf className="w-4 h-4" /> Эко-подход
            </span>
            <span className="badge-neutral">
              <Shield className="w-4 h-4 text-brand-600" /> Надёжность
            </span>
            <span className="badge-neutral">
              <Heart className="w-4 h-4 text-sun" /> Забота о семье
            </span>
          </div>

          {/* Цель компании */}
          <h4 className="text-base font-semibold text-ink mb-2">Наша цель</h4>
          <p className="mb-4">
            Обеспечивать высокий стандарт чистоты и уюта в доме, предлагая профессиональный клининг,
            который с уверенностью дарят близким — женам, мамам и семьям.
          </p>

          {/* Миссия */}
          <h4 className="text-base font-semibold text-ink mb-2">Миссия</h4>
          <p className="mb-4">
            Мы — надёжные помощники в создании идеального порядка. Сочетая высокое качество услуг,
            бережный подход и внимание к деталям, дарим освобождение от бытовой рутины, свежесть в
            доме и радость в мелочах.
          </p>
          <p className="mb-4">
            Наша миссия — быть тем самым лучом света, который делает дом чище, атмосферу — легче, а
            настроение — лучше.
          </p>

          {/* Слоган */}
          <figure className="relative mt-6 rounded-xl bg-white/70 ring-1 ring-gray-200 p-4 sm:p-5">
            <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-sun-50 ring-1 ring-sun/30 flex items-center justify-center">
              <Quote className="w-4 h-4 text-sun" />
            </div>
            <blockquote className="italic text-ink/90">
              «ЛУЧисто: когда чисто — по-настоящему».
            </blockquote>
          </figure>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#gift"
              aria-label="Переход к разделу подарочного сертификата"
              className="inline-flex justify-center items-center bg-brand hover:bg-brand-600 text-white px-5 py-3 rounded-md font-semibold transition-colors">
              Подарить уборку
            </a>
            <a
              href="#subscription"
              aria-label="Переход к разделу регулярного клининга (абонемент)"
              className="inline-flex justify-center items-center border-2 border-brand text-brand hover:bg-brand hover:text-white px-5 py-3 rounded-md font-semibold transition-colors">
              Регулярный клининг
            </a>
          </div>
        </div>

        {/* Правая колонка — ценности и мини-статистика */}
        <div>
          <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-brand-50/60 via-white to-white p-6 shadow-sm">
            <h4 className="text-lg font-semibold text-ink mb-4">Наши ценности</h4>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-lg bg-sun-50 text-sun ring-1 ring-sun/30 flex items-center justify-center">
                  <Leaf className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">Бережность</p>
                  <p className="text-muted">
                    Экологичные средства и аккуратная работа с вещами клиентов.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-lg bg-gray-100 text-brand ring-1 ring-gray-200 flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">Ответственность</p>
                  <p className="text-muted">
                    Проверенный персонал, чёткие стандарты и контроль качества.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-10 h-10 rounded-lg bg-gray-100 text-sun ring-1 ring-gray-200 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-semibold text-ink">Результат</p>
                  <p className="text-muted">
                    Стабильно высокий уровень сервиса и гарантия доработки.
                  </p>
                </div>
              </li>
            </ul>

            {/* Мини-статистика */}
            <div className="mt-6 grid grid-cols-3 divide-x divide-gray-200 text-center">
              <div className="px-2">
                <div className="text-2xl font-bold text-ink">5+</div>
                <div className="text-xs text-muted">лет опыта</div>
              </div>
              <div className="px-2">
                <div className="text-2xl font-bold text-ink">3 000+</div>
                <div className="text-xs text-muted">уборок</div>
              </div>
              <div className="px-2">
                <div className="text-2xl font-bold text-ink">98%</div>
                <div className="text-xs text-muted">довольных клиентов</div>
              </div>
            </div>

            {/* Микро-подпись */}
            <div className="mt-4 flex items-center gap-2 text-xs text-muted">
              <Users className="w-4 h-4 text-brand" />
              Команда обученных специалистов под присмотром менеджера качества
            </div>
          </div>
        </div>
      </div>
    </div>
  </Section>
);
