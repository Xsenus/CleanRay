# CleanRay — лендинг клининговой компании (React + Vite + Tailwind, TypeScript)

Быстрый, доступный и SEO‑готовый лендинг для клинингового сервиса. Построен на **Vite 5**, **React 18**, **TypeScript** и **TailwindCSS**. Включает калькулятор стоимости, форму лида (Web3Forms), слайдер «до/после» и базовую SEO‑настройку через **react-helmet-async**.

---

## Оглавление

- [Стек](#стек)
- [Возможности](#возможности)
- [Быстрый старт](#быстрый-старт)
  - [Требования](#требования)
  - [Установка](#установка)
  - [Переменные окружения](#переменные-окружения)
  - [Режим разработки](#режим-разработки)
  - [Скрипты](#скрипты)
- [Структура проекта](#структура-проекта)
- [Качество кода](#качество-кода)
- [Доступность и SEO](#доступность-и-seo)
- [Деплой](#деплой)
  - [GitHub Pages (статический хостинг)](#github-pages-статический-хостинг)
  - [Vercel](#vercel)
  - [Netlify](#netlify)
- [GitHub Codespaces / Dev Container](#github-codespaces--dev-container)
- [Безопасность](#безопасность)
- [Лицензия](#лицензия)

---

## Стек

- **Сборка**: Vite 5
- **UI**: React 18 + TypeScript
- **Стили**: TailwindCSS 3
- **Иконки**: lucide-react
- **SEO**: react-helmet-async
- **Линтинг**: ESLint 9 (typescript-eslint, react-refresh, react-hooks)

## Возможности

- ✨ Герой‑секция с анимированными лучами и логотипом
- 🔁 Слайдер сравнения **до/после** (ComparisonSlider)
- 🧮 **InstantQuote** — калькулятор стоимости (настраиваемые тарифы)
- 📝 **LeadForm** с отправкой в Web3Forms (без собственного бэкенда)
- 🕸️ Базовое SEO: `<title>`, `description`, соц‑превью через **react-helmet-async**
- 📱 Полная адаптивность и доступность (клавиатурная навигация, фокус‑состояния)
- 🧩 Строгая типизация TypeScript
- 🧪 Готовность к CI‑сборке и деплою на GitHub Pages

---

## Быстрый старт

### Требования

- **Node.js 20+** (LTS). Проверка: `node -v`
- **npm** (входит в состав Node). Можно использовать и **pnpm/yarn**, но по умолчанию — npm.

### Установка

```bash
# 1) Установка зависимостей
npm ci

# 2) Запуск дев‑сервера
npm run dev
# Для запуска в контейнере/VM — проброс хоста:
npm run dev -- --host
```

Откройте [http://localhost:5173](http://localhost:5173)

### Переменные окружения

Скопируйте `.env.example` в `.env` и заполните значения:

```ini
# .env
VITE_HERO_LOGO=/images/logos/CleanRay-logo-horizontal.svg
VITE_WEB3FORMS_KEY=ЗАМЕНИТЕ_НА_СВОЙ_WEB3FORMS_ACCESS_KEY
VITE_WEB3FORMS_TO=you@example.com
```

### Режим разработки

```bash
# Проверка типов (если добавите отдельный скрипт)
# npx tsc --noEmit

# Линтинг
npm run lint
```

### Скрипты

- `npm run dev` — дев‑сервер Vite
- `npm run build` — продакшен‑сборка в `dist/`
- `npm run preview` — локальный предпросмотр сборки
- `npm run lint` — ESLint

---

## Структура проекта

```bash
.
├── public/
│   ├── images/
│   │   └── logos/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── ComparisonSlider.tsx
│   │   ├── InstantQuote.tsx
│   │   ├── LeadForm.tsx
│   │   ├── Header.tsx
│   │   ├── HeroRays.tsx
│   │   ├── MissionSection.tsx
│   │   ├── SubscriptionSection.tsx
│   │   ├── TrustBadgesMarquee.tsx
│   │   └── Section.tsx
│   ├── hooks/
│   │   └── useQuoteCalculator.ts
│   ├── data/
│   │   └── pricing.json
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
├── tsconfig*.json
├── package.json
└── eslint.config.js
```

---

## Качество кода

- **ESLint** настроен с правилами `@typescript-eslint` и `react-hooks`.
- Держите компоненты **маленькими, типизированными и с одной зоной ответственности**.
- Предпочитайте функциональные компоненты и хуки.
- Кладите статические файлы в `public/` — это избавляет от лишних запросов на рантайме.

---

## Доступность и SEO

- Видимые состояния фокуса и полная клавиатурная навигация.
- Корректные подписи и связи `<label>` ↔ `<input>` в формах.
- SEO через **react-helmet-async** (в `App.tsx`):
  - `title`, `meta[name="description"]`, Open Graph/Twitter.
- `robots.txt` и `sitemap.xml` находятся в `public/`.

---

## Деплой

Ниже — готовые варианты с минимальной настройкой.

### GitHub Pages (статический хостинг)

В репозитории предусмотрен workflow:  
`.github/workflows/deploy-pages.yml`

Он:

1. Устанавливает зависимости
2. Собирает проект
3. Копирует `index.html` в `404.html` (SPA‑fallback)
4. Публикует содержимое `dist/` на GitHub Pages

**Шаги:**

1. Добавьте файл workflow (см. выше) и запушьте в `main`.
2. В GitHub репозитории: **Settings → Pages** → Source: **GitHub Actions**.
3. Если сайт будет на `https://<owner>.github.io/<repo>/`, укажите базовый путь для Vite:
   - Передайте `BASE_PATH=/REPO_NAME/` как переменную среды в workflow и читайте её в `vite.config.ts`,
   - Либо задайте `base: "/REPO_NAME/"` напрямую в `vite.config.ts`.
4. Дождитесь завершения job — Pages начнёт отдавать сайт.

> Шаг с `404.html` уже включён, чтобы работали прямые переходы по маршрутам SPA.

### Vercel

- Импортируйте репозиторий в Vercel
- Framework preset: **Vite**
- Build command: `npm run build`
- Output: `dist`
- Переменные окружения: добавьте `VITE_*` из `.env`

### Netlify

- New site from Git → выберите репозиторий
- Build command: `npm run build`
- Publish directory: `dist`
- Добавьте переменные окружения

---

## GitHub Codespaces / Dev Container

Файл `.devcontainer/devcontainer.json` настраивает Node 20 и автоматически:

- ставит зависимости (`npm ci`) после создания контейнера,
- запускает дев‑сервер (`npm run dev -- --host`) при старте,
- пробрасывает порт `5173`.

Откройте: **Code → Codespaces → Create codespace on main** — и через минуту у вас в браузере рабочее окружение с уже запущенным проектом.

---

## Безопасность

- **Не коммитьте `.env`** и секреты. Для CI/хостинга используйте секреты репозитория/окружения.
- Ключ Web3Forms храните как секрет в панели хостинга/CI.
- Регулярно обновляйте зависимости и проверяйте сторонний код.

---

## Лицензия

[Связаться по email](mailto:xsenus92@gmail.com)
