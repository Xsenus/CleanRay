import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Section } from './components/Section';
import { HeroRays } from './components/HeroRays';
import { Header } from './components/Header';
import { ComparisonSlider } from './components/ComparisonSlider';
import { InstantQuote } from './components/InstantQuote';
import { LeadForm } from './components/LeadForm';
import {
  Sparkles,
  Users,
  CheckCircle,
  Phone,
  Mail,
  Clock,
  MapPin,
  ArrowRight,
  Leaf,
  Wrench,
  Eye,
  ChevronDown,
} from 'lucide-react';
import { MissionSection } from './components/MissionSection';
import { GiftSection } from './components/GiftSection';
import { SubscriptionSection } from './components/SubscriptionSection';
import { TrustBadgesMarquee } from './components/TrustBadgesMarquee';
import { QuoteParams } from './types';

function App() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [leadFormData, setLeadFormData] = useState<Partial<QuoteParams>>();

  const openLeadForm = (data?: Partial<QuoteParams>) => {
    setLeadFormData(data);
    setIsLeadFormOpen(true);
  };

  const closeLeadForm = () => {
    setIsLeadFormOpen(false);
    setLeadFormData(undefined);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://ЛУЧисто.kz/#organization',
        name: 'ЛУЧисто',
        url: 'https://ЛУЧисто.kz',
        telephone: '+7 (727) 000-00-00',
        email: 'info@ЛУЧисто.kz',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ул. Примерная, 123',
          addressLocality: 'Алматы',
          addressCountry: 'KZ',
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://ЛУЧисто.kz/#business',
        name: 'ЛУЧисто — Профессиональная уборка',
        description:
          'Качественная уборка квартир и домов в Алматы. Эко-средства, обученный персонал, гарантия качества.',
        url: 'https://ЛУЧисто.kz',
        telephone: '+7 (727) 000-00-00',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'ул. Примерная, 123',
          addressLocality: 'Алматы',
          addressCountry: 'KZ',
        },
        openingHours: 'Mo-Su 08:00-22:00',
        priceRange: '$$',
      },
    ],
  };

  const heroLogoSrc = import.meta.env.VITE_HERO_LOGO?.trim() || undefined;

  return (
    <HelmetProvider>
      <div className="font-montserrat">
        <Helmet>
          <title>ЛУЧисто — Профессиональная уборка квартир и домов в Алматы</title>
          <meta
            name="description"
            content="Качественная уборка квартир от профессионалов ЛУЧисто. Эко-средства, обученный персонал, гарантия качества. Заказать уборку можно уже на завтра!"
          />
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-brand-100 to-white">
          {/* Фоновые слои */}
          <div aria-hidden="true" className="absolute inset-0 z-0">
            {/* Фото */}
            <div
              className="absolute inset-0 bg-center bg-cover opacity-40 sm:opacity-60 pointer-events-none select-none"
              style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/hero-window.jpg)` }}
            />
            {/* Затухание к низу для читаемости текста */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/90" />
          </div>

          {/* Лучи — поверх фото */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-20 pointer-events-none select-none opacity-80">
            <HeroRays />
          </div>

          {/* Логотип-призрак под лучами */}
          {heroLogoSrc && (
            <img
              src={heroLogoSrc}
              alt=""
              aria-hidden="true"
              className="absolute z-10 left-1/2 top-[36%] -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none w-[55vw] max-w-[820px]"
            />
          )}

          {/* Хедер гарантированно над лучами */}
          <div className="relative z-30">
            <Header onOrderClick={() => openLeadForm()} />
          </div>

          {/* Контент выше всего */}
          <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-16 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-ink mb-6 leading-tight">
                Профессиональная уборка <span className="text-brand">ЛУЧ</span>исто
              </h1>
              <p className="text-xl sm:text-2xl text-muted mb-8 leading-relaxed max-w-3xl mx-auto">
                Создаем идеальную чистоту в вашем доме с помощью экологичных средств и современного
                оборудования
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <button
                  onClick={() => openLeadForm()}
                  className="bg-brand hover:bg-brand-600 text-white px-8 py-4 text-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  Заказать уборку
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="border-2 border-brand text-brand hover:bg-brand hover:text-white px-8 py-4 text-lg font-semibold transition-colors">
                  Рассчитать стоимость
                </button>
              </div>

              <TrustBadgesMarquee />
            </div>
          </div>
        </section>

        {/* Before/After Section */}
        <Section
          id="results"
          title="Результаты нашей работы"
          subtitle="Посмотрите, как преображаются квартиры после уборки"
          background="gray">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            <div className="w-full max-w-[560px] space-y-3">
              <ComparisonSlider
                beforeImage="https://images.pexels.com/photos/6248900/pexels-photo-6248900.jpeg?auto=compress&cs=tinysrgb&w=1200"
                afterImage="https://images.pexels.com/photos/15409513/pexels-photo-15409513.jpeg?auto=compress&cs=tinysrgb&w=1200"
                beforeAlt="Кухня до уборки"
                afterAlt="Кухня после уборки"
                className="w-full aspect-[4/3] rounded-xl shadow-sm"
              />
              <p className="text-center text-muted font-medium">Кухня</p>
            </div>

            <div className="w-full max-w-[560px] space-y-3">
              <ComparisonSlider
                beforeImage="https://images.pexels.com/photos/10473003/pexels-photo-10473003.jpeg?auto=compress&cs=tinysrgb&w=1200"
                afterImage="https://images.pexels.com/photos/7005282/pexels-photo-7005282.jpeg?auto=compress&cs=tinysrgb&w=1200"
                beforeAlt="Ванная до уборки"
                afterAlt="Ванная после уборки"
                className="w-full aspect-[4/3] rounded-xl shadow-sm"
              />
              <p className="text-center text-muted font-medium">Ванная комната</p>
            </div>

            <div className="w-full max-w-[560px] space-y-3">
              <ComparisonSlider
                beforeImage="https://images.pexels.com/photos/5102904/pexels-photo-5102904.jpeg?auto=compress&cs=tinysrgb&w=1200"
                afterImage="https://images.pexels.com/photos/19889135/pexels-photo-19889135.jpeg?auto=compress&cs=tinysrgb&w=1200"
                beforeAlt="Гостиная до уборки"
                afterAlt="Гостиная после уборки"
                className="w-full aspect-[4/3] rounded-xl shadow-sm"
              />
              <p className="text-center text-muted font-medium">Гостиная</p>
            </div>
          </div>
        </Section>

        {/* Services Section */}

        <Section
          id="services"
          title="Виды уборки"
          subtitle="Выберите подходящий тип уборки для вашего дома">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Влажная',
                price: 'от 20 000 ₸',
                description: 'Регулярная уборка для поддержания чистоты',
                features: [
                  'Влажная уборка всех поверхностей',
                  'Пылесос ковров и мебели',
                  'Мытье полов',
                  'Вынос мусора',
                  'Базовая уборка санузла',
                ],
                popular: false,
              },
              {
                title: 'Генеральная',
                price: 'от 30 000 ₸',
                description: 'Глубокая уборка всех помещений',
                features: [
                  'Все услуги поддерживающей',
                  'Мытье окон изнутри',
                  'Чистка бытовой техники',
                  'Уборка внутри шкафов',
                  'Мытье люстр и светильников',
                ],
                popular: true,
              },
              {
                title: 'Специальная',
                price: 'от 50 000 ₸',
                description: 'Уборка после ремонта, переезда',
                features: [
                  'Все услуги генеральной',
                  'Удаление строительной пыли',
                  'Мытье окон снаружи',
                  'Чистка балкона/лоджии',
                  'Уборка нестандартных загрязнений',
                ],
                popular: false,
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`relative bg-white border-2 p-8 ${
                  service.popular ? 'border-brand shadow-lg transform scale-105' : 'border-border'
                }`}>
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand text-white px-4 py-1 text-sm font-semibold">
                    ПОПУЛЯРНО
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-ink mb-2">{service.title}</h3>
                  <div className="text-3xl font-bold text-brand mb-2">{service.price}</div>
                  <p className="text-muted">{service.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-ink">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openLeadForm({ isGeneral: service.title === 'Генеральная' })}
                  className="w-full bg-brand hover:bg-brand-600 text-white px-6 py-3 font-semibold transition-colors">
                  Заказать услугу
                </button>
              </div>
            ))}
          </div>
        </Section>

        {/* Quote Calculator */}
        <Section
          id="quote"
          title="Рассчитать стоимость"
          subtitle="Получите примерную стоимость уборки за несколько секунд"
          background="gray">
          <InstantQuote onSendRequest={openLeadForm} />
        </Section>

        {/* Why Us Section */}
        <Section
          id="why-us"
          title={
            <>
              Почему выбирают <span className="text-brand">ЛУЧ</span>исто
            </>
          }
          subtitle="Мы предоставляем качественные услуги с гарантией результата"
          background="gray">
          <div className="relative">
            {/* мягкая подсветка секции (не мешает контенту) */}

            <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                {
                  icon: Leaf,
                  badge: 'Eco',
                  title: 'Эко-средства',
                  description: 'Безопасно для детей и животных. Европейские составы.',
                  points: ['Гипоаллергенно', 'Без резких запахов', 'Сертификаты качества'],
                  headerClass: 'from-sun-50 via-white to-white', // тёплый градиент
                },
                {
                  icon: Wrench,
                  badge: 'PRO',
                  title: 'Профессиональное оборудование',
                  description: 'Применяем технику и насадки для сложных случаев.',
                  points: ['Парогенераторы', 'Пылесосы с HEPA', 'Деликатные насадки'],
                  headerClass: 'from-brand-50 via-white to-white', // холодный градиент
                },
                {
                  icon: Users,
                  badge: 'Team',
                  title: 'Обученный персонал',
                  description: 'Собственная программа обучения и проверок.',
                  points: ['Проверка и инструктаж', 'Форма и бейджи', 'Стандарты общения'],
                  headerClass: 'from-white via-sun-50 to-white',
                },
                {
                  icon: Eye,
                  badge: 'QC',
                  title: 'Контроль качества',
                  description: 'Работаем по чек-листам и дорабатываем при необходимости.',
                  points: ['Чек-лист на объект', 'Фотоотчёт', 'Гарантия повторного выезда'],
                  headerClass: 'from-white via-brand-50 to-white',
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  {/* Иллюстративный «хедер» карточки */}
                  <div className={`relative aspect-[4/3] bg-gradient-to-br ${f.headerClass}`}>
                    {/* лёгкие лучи в хедере карточки */}
                    <div className="absolute inset-0 opacity-30 pointer-events-none">
                      <HeroRays />
                    </div>

                    {/* бейдж в углу */}
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 ring-1 ring-gray-200 px-2.5 py-1 text-[11px] font-semibold text-ink">
                      <f.icon className="w-3.5 h-3.5 text-sun" />
                      {f.badge}
                    </span>

                    {/* крупная иконка как «силуэт» */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <f.icon className="w-16 h-16 text-brand/20 group-hover:text-brand/25 transition-colors" />
                    </div>
                  </div>

                  {/* Текстовая часть */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-ink mb-1">{f.title}</h3>
                    <p className="text-muted leading-relaxed mb-4">{f.description}</p>

                    <ul className="space-y-2 text-sm">
                      {f.points.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="mt-1 w-1.5 h-1.5 rounded-full bg-sun"></span>
                          <span className="text-ink/90">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {/* Мини-статистика под карточками */}
            <div className="relative mt-10 grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-white ring-1 ring-gray-200 p-4">
                <div className="text-2xl font-bold text-ink">5+ лет</div>
                <div className="text-xs text-muted mt-1">опыта в клининге</div>
              </div>
              <div className="rounded-xl bg-white ring-1 ring-gray-200 p-4">
                <div className="text-2xl font-bold text-ink">3 000+</div>
                <div className="text-xs text-muted mt-1">выполненных уборок</div>
              </div>
              <div className="rounded-xl bg-white ring-1 ring-gray-200 p-4">
                <div className="text-2xl font-bold text-ink">98%</div>
                <div className="text-xs text-muted mt-1">довольных клиентов</div>
              </div>
            </div>
          </div>
        </Section>

        {/* Миссия */}
        <MissionSection />

        {/* Подарочный сертификат */}
        <GiftSection onGiftClick={() => openLeadForm()} />

        {/* Абонемент на регулярный клининг */}
        <SubscriptionSection onSubscribeClick={() => openLeadForm()} />

        {/* FAQ Section */}
        <Section
          id="faq"
          title="Часто задаваемые вопросы"
          subtitle="Ответы на популярные вопросы о наших услугах"
          background="gray">
          <div className="max-w-4xl mx-auto">
            <FAQAccordion />
          </div>
        </Section>

        {/* Contact Form Section */}
        <Section
          id="contact"
          title="Оставить заявку"
          subtitle="Заполните форму и мы свяжемся с вами в течение 15 минут">
          <div className="max-w-2xl mx-auto">
            <LeadForm inline />
          </div>
        </Section>

        {/* Footer */}
        <footer className="relative bg-ink text-white">
          {/* мягкая подсветка сверху футера */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_380px_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)]"
            aria-hidden="true"
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid md:grid-cols-4 gap-10 mb-10">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-8 h-8 text-brand" />
                  <span className="text-2xl font-bold">ЛУЧисто</span>
                </div>
                <p className="text-white/75 leading-relaxed">
                  Профессиональная клининговая компания в Алматы. Создаём идеальную чистоту в вашем
                  доме с заботой о здоровье и окружающей среде.
                </p>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Контакты</h4>
                <address className="not-italic space-y-3">
                  <a
                    href="tel:+77270000000"
                    className="flex items-center gap-3 text-white/80 hover:text-white">
                    <Phone className="w-5 h-5 text-brand shrink-0" />
                    +7 (727) 000-00-00
                  </a>
                  <a
                    href="mailto:info@luchisto.kz"
                    className="flex items-center gap-3 text-white/80 hover:text-white">
                    <Mail className="w-5 h-5 text-brand shrink-0" />
                    info@luchisto.kz
                  </a>
                  <div className="flex items-center gap-3 text-white/80">
                    <MapPin className="w-5 h-5 text-brand shrink-0" />
                    г. Алматы, ул. Примерная, 123
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <Clock className="w-5 h-5 text-brand shrink-0" />
                    Ежедневно с 8:00 до 22:00
                  </div>
                </address>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Услуги</h4>
                <nav className="space-y-2">
                  <a href="#services" className="block text-white/80 hover:text-white">
                    Поддерживающая уборка
                  </a>
                  <a href="#services" className="block text-white/80 hover:text-white">
                    Генеральная уборка
                  </a>
                  <a href="#services" className="block text-white/80 hover:text-white">
                    Специальная уборка
                  </a>
                  <a href="#quote" className="block text-white/80 hover:text-white">
                    Расчёт стоимости
                  </a>
                </nav>
              </div>
            </div>

            {/* Bottom line */}
            <div className="border-t border-white/10 pt-6">
              <div className="text-center">
                <p className="text-sm text-white/80">
                  <a
                    href="mailto:xsenus92@gmail.com"
                    className="underline-offset-4 hover:underline hover:text-white">
                    xsenus92@gmail.com
                  </a>
                  <span className="mx-1">©</span> 2025
                </p>
                <p className="mt-1 text-xs text-white/60">Все права защищены.</p>
              </div>
            </div>
          </div>
        </footer>

        {/* Lead Form Modal */}
        <LeadForm isOpen={isLeadFormOpen} onClose={closeLeadForm} initialData={leadFormData} />
      </div>
    </HelmetProvider>
  );
}

// FAQ Accordion Component
const FAQAccordion: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqData = [
    {
      question: 'В чем разница между поддерживающей и генеральной уборкой?',
      answer:
        'Поддерживающая уборка направлена на поддержание чистоты и включает основные процедуры: влажную уборку, пылесос, мытье полов. Генеральная уборка более глубокая и включает мытье окон, чистку техники, уборку внутри мебели и другие детальные процедуры.',
    },
    {
      question: 'Безопасны ли ваши чистящие средства?',
      answer:
        'Мы используем только экологически безопасные средства европейского производства, которые не содержат агрессивных химических веществ. Все средства гипоаллергенны и безопасны для детей и домашних животных.',
    },
    {
      question: 'Сколько времени занимает уборка квартиры?',
      answer:
        'Время зависит от площади, типа уборки и степени загрязнения. В среднем: поддерживающая уборка 2-3 часа, генеральная 4-6 часов для квартиры 70-80 м². Точное время оговаривается при осмотре.',
    },
    {
      question: 'Предоставляете ли вы гарантию на работу?',
      answer:
        'Да, мы предоставляем гарантию качества на все виды услуг. Если вы не удовлетворены результатом, мы бесплатно устраним недочеты в течение 24 часов после уборки.',
    },
    {
      question: 'Можно ли изменить цену после осмотра?',
      answer:
        'Окончательная цена определяется после бесплатного осмотра объекта. Если реальная площадь или объем работ отличается от заявленного, стоимость может быть скорректирована, но только с вашего согласия.',
    },
    {
      question: 'Как заказать уборку?',
      answer:
        'Вы можете заказать уборку через форму на сайте, по телефону или в мессенджерах. Мы проведем бесплатный осмотр, согласуем детали и время, после чего выполним уборку в удобное для вас время.',
    },
  ];

  return (
    <div className="space-y-4">
      {faqData.map((item, index) => (
        <div key={index} className="border border-border bg-white">
          <button
            onClick={() => setOpenItem(openItem === index ? null : index)}
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
            <span className="font-semibold text-ink pr-4">{item.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-brand transition-transform ${
                openItem === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openItem === index && (
            <div className="px-6 pb-4">
              <p className="text-muted leading-relaxed">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
