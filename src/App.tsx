import React, { useState } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Section } from './components/Section';
import { HeroRays } from './components/HeroRays';
import { Header } from './components/Header';
import { InstantQuote } from './components/InstantQuote';
import { LeadForm } from './components/LeadForm';
import { Users, CheckCircle, ArrowRight, Leaf, Wrench, Eye, ChevronDown } from 'lucide-react';
import { MissionSection } from './components/MissionSection';
import { GiftSection } from './components/GiftSection';
import { SubscriptionSection } from './components/SubscriptionSection';
import { TrustBadgesMarquee } from './components/TrustBadgesMarquee';
import { QuoteParams } from './types';
import { HeroGhostLogo } from './components/HeroGhostLogo';
import { ComparisonSliderSmart } from './components/ComparisonSliderSmart';
import Footer from './components/Footer';

function App() {
  const base = import.meta.env.BASE_URL;

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
            <div
              className="absolute inset-0 bg-center bg-cover opacity-40 sm:opacity-60 pointer-events-none select-none"
              style={{ backgroundImage: `url(${base}images/hero-window.jpg)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/90" />
          </div>

          {/* Лучи */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-20 pointer-events-none select-none opacity-80">
            <HeroRays />
          </div>

          {/* Логотип-призрак под лучами */}
          <HeroGhostLogo className="left-1/2 top-[36%] -translate-x-1/2 -translate-y-1/2 w-[55vw] max-w-[820px]" />

          {/* Хедер и контент поверх всего */}
          <div className="relative z-30">
            <Header onOrderClick={() => openLeadForm()} />
          </div>

          <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-16 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-ink mb-6 leading-tight">
                Профессиональная уборка <span className="text-brand">ЛУЧ</span>исто
              </h1>
              <p className="text-xl sm:text-2xl text-muted mb-8 leading-relaxed max-w-3xl mx-auto">
                Создаем идеальную чистоту в вашем доме с помощью экологичных средств и современного
                оборудования
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                <button
                  onClick={() => openLeadForm()}
                  className="btn-primary flex items-center justify-center gap-2">
                  Заказать уборку <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })
                  }
                  className="btn-outline-brand">
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
            {/* Кухня */}
            <div className="w-full max-w-[560px] space-y-3">
              <ComparisonSliderSmart
                beforeCandidates={[
                  `${base}images/results/kitchen-before.webp`,
                  `${base}images/results/kitchen-before.jpg`,
                  'https://images.pexels.com/photos/6248900/pexels-photo-6248900.jpeg?auto=compress&cs=tinysrgb&w=1200',
                ]}
                afterCandidates={[
                  `${base}images/results/kitchen-after.webp`,
                  `${base}images/results/kitchen-after.jpg`,
                  'https://images.pexels.com/photos/15409513/pexels-photo-15409513.jpeg?auto=compress&cs=tinysrgb&w=1200',
                ]}
                beforeAlt="Кухня до уборки"
                afterAlt="Кухня после уборки"
                className="w-full aspect-[4/3] rounded-xl shadow-sm"
              />
              <p className="text-center text-muted font-medium">Кухня</p>
            </div>

            {/* Ванная */}
            <div className="w-full max-w-[560px] space-y-3">
              <ComparisonSliderSmart
                beforeCandidates={[
                  `${base}images/results/bath-before.webp`,
                  `${base}images/results/bath-before.jpg`,
                  'https://images.pexels.com/photos/10473003/pexels-photo-10473003.jpeg?auto=compress&cs=tinysrgb&w=1200',
                ]}
                afterCandidates={[
                  `${base}images/results/bath-after.webp`,
                  `${base}images/results/bath-after.jpg`,
                  'https://images.pexels.com/photos/7005282/pexels-photo-7005282.jpeg?auto=compress&cs=tinysrgb&w=1200',
                ]}
                beforeAlt="Ванная до уборки"
                afterAlt="Ванная после уборки"
                className="w-full aspect-[4/3] rounded-xl shadow-sm"
              />
              <p className="text-center text-muted font-medium">Ванная комната</p>
            </div>

            {/* Гостиная */}
            <div className="w-full max-w-[560px] space-y-3">
              <ComparisonSliderSmart
                beforeCandidates={[
                  `${base}images/results/living-before.webp`,
                  `${base}images/results/living-before.jpg`,
                  'https://images.pexels.com/photos/5102904/pexels-photo-5102904.jpeg?auto=compress&cs=tinysrgb&w=1200',
                ]}
                afterCandidates={[
                  `${base}images/results/living-after.webp`,
                  `${base}images/results/living-after.jpg`,
                  'https://images.pexels.com/photos/19889135/pexels-photo-19889135.jpeg?auto=compress&cs=tinysrgb&w=1200',
                ]}
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
                description:
                  'Регулярная влажная уборка квартир и домов: экологичная поддержка порядка и свежести',
                features: [
                  'Протирка пыли со всех доступных поверхностей (мебель, техника, подоконники, выключатели)',
                  'Чистка зеркал и стеклянных перегородок',
                  'Наведение порядка, застелим постель',
                  'Кухня: снаружи шкафов и техники, дезинфекция раковины, столешницы и фартука',
                  'Санузел: чистка и дезинфекция сантехники',
                  'Пылесос (сухая очистка) ковров/пола',
                  'Мытьё пола и плинтусов',
                  'Сбор и вынос мусора',
                ],
                popular: false,
              },
              {
                title: 'Генеральная',
                price: 'от 30 000 ₸',
                description:
                  'Генеральная уборка: глубокий профессиональный клининг квартир и коттеджей. Максимальная детализация и гигиена.',
                features: [
                  'Проветривание, мойка потолочных светильников/простых ламп',
                  'Окна и рамы: внутри и снаружи (в тёплое время года)',
                  'Протирка стен и всех поверхностей, батарей, розеток, выключателей, дверей',
                  'Двигаем доступную мебель/технику и убираем за/под ними',
                  'Шкафы: уборка внутри (где доступно/пусто), наведение порядка',
                  'Зеркала и стеклянные перегородки до блеска',
                  'Кухня: шкафы и техника снаружи и внутри, дезинфекция раковины, столешницы, фартука; прочистка слива',
                  'Санузел: плитка стен, хром и сантехника, прочистка слива',
                  'Глубокая пыле-/влажная очистка мягкой мебели, ковров/поликов',
                  'Мытьё пола и плинтусов, вынос мусора; входная дверь',
                ],
                popular: true,
              },
              {
                title: 'Специальная',
                price: 'от 50 000 ₸',
                description:
                  'Специальная уборка после ремонта/переезда: удаление строительной пыли, детальный клининг квартир/домов.',
                features: [
                  'Сбор и вынос строительного мусора, многоуровневое обеспыливание',
                  'Мытьё стен (моющиеся поверхности), потолков и всех плоскостей',
                  'Детальная чистка розеток, выключателей, радиаторов, плинтусов',
                  'Окна: внутри и снаружи (по погоде), рам/подоконников; снятие наклеек',
                  'Кухня: интенсивное обезжиривание, фасады/внутри шкафов, техника снаружи и внутри',
                  'Санузел: удаление цементной/известковой пыли, полировка хрома',
                  'Балкон/лоджия: полный клининг, при необходимости — вынос мусора',
                  'Финишное мытьё полов и полировка лакокрасочных поверхностей',
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
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-600 text-white px-4 py-1 text-sm font-semibold rounded-md shadow">
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
                      <CheckCircle className="w-5 h-5 text-sun flex-shrink-0" />
                      <span className="text-ink">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => openLeadForm({ isGeneral: service.title === 'Генеральная' })}
                  className="w-full btn-primary">
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

        <Footer />

        {/* Lead Form Modal */}
        <LeadForm isOpen={isLeadFormOpen} onClose={closeLeadForm} initialData={leadFormData} />
      </div>
    </HelmetProvider>
  );
}

// FAQ Accordion Component
const FAQAccordion: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqData: { question: string; answer: React.ReactNode }[] = [
    {
      question: 'Чем отличается влажная уборка от генеральной?',
      answer: (
        <div className="space-y-3">
          <p>
            Влажная уборка — регулярное поддержание порядка: протираем поверхности, пылесосим, моем
            полы, убираем лёгкие загрязнения.
          </p>
          <p>
            Генеральная уборка — глубокая чистка всего пространства, включая труднодоступные зоны,
            стены, плинтусы, шкафы изнутри, кухонную технику и санузлы. Подходит, когда нужна уборка
            «до блеска» или дом давно не убирался.
          </p>
        </div>
      ),
    },
    {
      question: 'Что такое спецуборка?',
      answer: (
        <div className="space-y-3">
          <p>
            Спецуборка — индивидуальный клининг под конкретную ситуацию. Мы оцениваем объект,
            подбираем средства/технику и состав бригады; сроки и стоимость — индивидуальны.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>после ремонта или переезда;</li>
            <li>после пожара или затопления;</li>
            <li>сильно запущенные квартиры;</li>
            <li>деликатная уборка у пожилых людей и другие нестандартные случаи.</li>
          </ul>
        </div>
      ),
    },
    {
      question: 'Какое оборудование используется во время уборки?',
      answer: (
        <ul className="list-disc pl-5 space-y-1">
          <li>профессиональные пылесосы с HEPA-фильтрами;</li>
          <li>парогенераторы;</li>
          <li>специальные щётки, скребки и салфетки для разных поверхностей.</li>
        </ul>
      ),
    },
    {
      question: 'Безопасны ли чистящие средства, которые вы используете?',
      answer: (
        <div className="space-y-3">
          <p>
            Да. Используем сертифицированные, экологичные средства, безопасные для детей, животных и
            аллергиков.
          </p>
          <p>
            В арсенале — проверенная бытовая и профессиональная химия европейского уровня. По
            желанию возможен 100% эко-клининг.
          </p>
        </div>
      ),
    },
    {
      question: 'Несёте ли вы гарантию за своих сотрудников?',
      answer: (
        <div className="space-y-3">
          <p>
            Абсолютно. Все клинеры проходят отбор, обучение и проверку; не работаем со случайными
            людьми.
          </p>
          <p>
            В случае непредвидённой ситуации — оперативно решаем вопросы и всегда на стороне
            клиента.
          </p>
        </div>
      ),
    },
    {
      question: 'Сколько по времени длится уборка?',
      answer: (
        <ul className="list-disc pl-5 space-y-1">
          <li>влажная уборка 1-комн. квартиры — от 2–3 часов;</li>
          <li>генеральная уборка квартиры — от 4–6 часов;</li>
          <li>дом — от 6 часов и более.</li>
        </ul>
      ),
    },
    {
      question: 'Нужно ли находиться дома во время уборки?',
      answer: (
        <div className="space-y-3">
          <p>Нет, ваше присутствие не требуется.</p>
          <p>
            Клиенты часто передают ключи/код доступа — возвращаются в уже чистый дом. По итогам
            предоставим фотоотчёт или свяжемся удобным способом. При желании можем работать в вашем
            присутствии.
          </p>
        </div>
      ),
    },
    {
      question: 'Нужно ли что-то готовить к вашему приезду?',
      answer: (
        <div className="space-y-3">
          <p>Нет, готовиться не нужно.</p>
          <p>
            Привезём всё необходимое: химию, оборудование, расходники, мешки для мусора и инвентарь.
            Покупать ничего не требуется.
          </p>
        </div>
      ),
    },
    {
      question: 'Мы хотим регулярную уборку — например, раз в неделю. Это возможно?',
      answer: (
        <div className="space-y-3">
          <p>Да, это удобно и выгодно.</p>
          <p>
            Можно оформить абонемент (еженедельно, раз в две недели, ежемесячно). По возможности
            закрепим постоянного клинера и будем поддерживать порядок под ваш график.
          </p>
        </div>
      ),
    },
    {
      question: 'Можно ли заказать уборку в подарок?',
      answer: (
        <div className="space-y-3">
          <p>Конечно! Это практичный и душевный подарок для близких.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>выбрать конкретную услугу;</li>
            <li>оформить подарочный сертификат на сумму или формат;</li>
            <li>добавить персональное поздравление.</li>
          </ul>
          <p>Согласуем дату с получателем и организуем всё без хлопот.</p>
        </div>
      ),
    },
    {
      question: 'Какие есть дополнительные услуги?',
      answer: (
        <ul className="list-disc pl-5 space-y-1">
          <li>чистка люстр/светильников, нестандартных плафонов;</li>
          <li>снятие, стирка и отпаривание штор и тюля;</li>
          <li>вымывание витражей, нестандартных окон, стеклянных/зеркальных поверхностей;</li>
          <li>уход за декором, кашпо, статуями;</li>
          <li>химчистка мебели, матрасов, ковров, одежды и др.</li>
        </ul>
      ),
    },
    {
      question: 'Как заказать у вас клининг?',
      answer: (
        <ul className="list-disc pl-5 space-y-1">
          <li>📞 по телефону;</li>
          <li>💬 через мессенджеры;</li>
          <li>📝 через сайт или форму обратной связи.</li>
        </ul>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {faqData.map((item, index) => {
        const isOpen = openItem === index;
        const panelId = `faq-panel-${index}`;
        const btnId = `faq-btn-${index}`;
        return (
          <div key={index} className="border border-border bg-white">
            <button
              id={btnId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenItem(isOpen ? null : index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
              <span className="font-semibold text-ink pr-4">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-brand-600 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div id={panelId} role="region" aria-labelledby={btnId} className="px-6 pb-4">
                <div className="text-muted leading-relaxed">{item.answer}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default App;
