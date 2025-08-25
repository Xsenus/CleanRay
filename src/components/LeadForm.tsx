import React, { useState } from 'react';
import { X, Phone, User, MapPin, MessageSquare } from 'lucide-react';
import { LeadFormData, QuoteParams } from '../types';

interface LeadFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialData?: Partial<QuoteParams>;
  inline?: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  isOpen = true,
  onClose,
  initialData,
  inline = false,
}) => {
  const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
  const WEB3FORMS_TO = import.meta.env.VITE_WEB3FORMS_TO as string | undefined;

  const typeLabel: Record<string, string> = {
    regular: 'Влажная',
    general: 'Генеральная',
    special: 'Специальная',
    recurring: 'Регулярный клининг',
    gift: 'Уборка в подарок',
  };

  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: '',
    address: '',
    cleaningType: initialData ? (initialData.isGeneral ? 'general' : 'regular') : 'regular',
    area: initialData?.area || 0,
    comment: '',
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = <K extends keyof LeadFormData>(field: K, value: LeadFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ===== Телефон =====
  const onlyDigits = (s: string) => s.replace(/\D/g, '');

  const formatKzPhone = (raw: string) => {
    let d = onlyDigits(raw);
    if (d.startsWith('8')) d = '7' + d.slice(1);
    if (!d) return '';
    if (!d.startsWith('7')) return `+${d}`;

    const p1 = d.slice(1, 4);
    const p2 = d.slice(4, 7);
    const p3 = d.slice(7, 9);
    const p4 = d.slice(9, 11);

    let out = '+7';
    if (p1) out += ` (${p1}`;
    if (p1 && p1.length === 3) out += ')';
    if (p2) out += ' ' + p2;
    if (p3) out += `-${p3}`;
    if (p4) out += `-${p4}`;
    return out;
  };

  const getKzDigits = (val: string) => {
    let d = onlyDigits(val);
    if (d.startsWith('8')) d = '7' + d.slice(1);
    return d;
  };

  const phoneDigits = getKzDigits(formData.phone);
  const isPhoneValid = phoneDigits.startsWith('7') && phoneDigits.length === 11;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatKzPhone(e.target.value);
    updateField('phone', formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent || !isPhoneValid) return;

    setIsSubmitting(true);
    try {
      const key = WEB3FORMS_KEY?.trim();
      if (!key) {
        alert('Не задан VITE_WEB3FORMS_KEY в .env');
        throw new Error('WEB3FORMS_KEY is missing');
      }

      const subject = `ЛУЧисто • Заявка: ${formData.name || 'Без имени'}${
        formData.phone ? ` (${formData.phone})` : ''
      }`;

      const fd = new FormData();
      fd.append('access_key', key);
      fd.append('subject', subject);
      fd.append('from_name', 'Форма сайта ЛУЧисто');
      fd.append('Имя', formData.name);
      fd.append('Телефон', formData.phone);
      fd.append('Адрес', formData.address);
      fd.append('Тип уборки', typeLabel[formData.cleaningType] ?? formData.cleaningType);
      if (formData.area) fd.append('Площадь', `${formData.area} м²`);
      if (formData.comment) fd.append('Комментарий', formData.comment);
      fd.append('Согласие на обработку', formData.consent ? 'Да' : 'Нет');
      fd.append('Источник', location.href);

      const summary =
        `— Заявка с сайта ЛУЧисто —\n` +
        `Имя: ${formData.name}\n` +
        `Телефон: ${formData.phone}\n` +
        `Адрес: ${formData.address}\n` +
        `Тип уборки: ${typeLabel[formData.cleaningType] ?? formData.cleaningType}\n` +
        (formData.area ? `Площадь: ${formData.area} м²\n` : '') +
        (formData.comment ? `Комментарий: ${formData.comment}\n` : '') +
        (initialData ? `\nПараметры расчёта:\n${JSON.stringify(initialData, null, 2)}\n` : '');
      fd.append('Сводка', summary);

      fd.append('botcheck', '');
      if (WEB3FORMS_TO?.trim()) fd.append('email_to', WEB3FORMS_TO.trim());

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      const data = await res.json();

      if (data?.success) {
        setIsSubmitted(true);
        setTimeout(() => onClose?.(), 1800);
      } else {
        console.error('Web3Forms error:', data);
        alert(`Не удалось отправить заявку.\n${data?.message ?? 'Попробуйте ещё раз.'}`);
      }
    } catch (err) {
      console.error('Submit error:', err);
      alert('Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const Panel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div
      className={[
        inline
          ? ''
          : // full-screen на мобилках, карточка на десктопе
            'w-full sm:max-w-2xl bg-white sm:rounded-2xl sm:shadow-xl',
        // ограничиваем высоту и включаем прокрутку внутреннего контента
        'max-h-[100dvh] sm:max-h-[85vh] overflow-y-auto',
      ].join(' ')}>
      {children}
    </div>
  );

  const formContent = (
    <Panel>
      {/* Шапка: на мобилках прилипает сверху, чтобы кнопка закрытия была доступна */}
      {!inline && (
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border px-5 py-4 sm:rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-2xl font-bold text-ink">Оставить заявку</h3>
            {onClose && (
              <button
                onClick={onClose}
                className="text-muted hover:text-ink transition-colors p-1"
                aria-label="Закрыть">
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      )}

      {isSubmitted ? (
        <div className="px-5 py-8 sm:p-8 text-center">
          <div className="w-16 h-16 bg-green-100 mx-auto mb-4 flex items-center justify-center rounded-full">
            <svg
              viewBox="0 0 24 24"
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-ink mb-2">Заявка отправлена!</h4>
          <p className="text-muted">Мы свяжемся с вами в течение 15 минут для уточнения деталей.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="px-5 pb-6 pt-4 sm:p-8 space-y-4 text-base">
          {/* Имя */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Имя *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-200 outline-none transition-colors text-base"
                placeholder="Ваше имя"
                inputMode="text"
                autoComplete="name"
              />
            </div>
          </div>

          {/* Телефон */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Телефон *</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={handlePhoneChange}
                aria-invalid={!isPhoneValid}
                className={`w-full pl-10 pr-4 py-3 border rounded-md outline-none transition-colors text-base
                  ${
                    isPhoneValid
                      ? 'border-border focus:border-brand focus:ring-2 focus:ring-brand-200'
                      : 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                  }`}
                placeholder="+7 (___) ___-__-__"
                inputMode="tel"
                autoComplete="tel"
              />
            </div>
            {!isPhoneValid && (
              <p className="mt-1 text-sm text-red-600">
                Введите номер в формате <b>+7 (XXX) XXX-XX-XX</b>
              </p>
            )}
          </div>

          {/* Адрес */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Адрес *</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-200 outline-none transition-colors text-base"
                placeholder="Улица, дом, квартира"
                inputMode="text"
                autoComplete="street-address"
              />
            </div>
          </div>

          {/* Тип уборки и площадь */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Тип уборки</label>
              <select
                value={formData.cleaningType}
                onChange={(e) => updateField('cleaningType', e.target.value)}
                className="w-full px-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-200 outline-none transition-colors text-base">
                <option value="regular">Влажная</option>
                <option value="general">Генеральная</option>
                <option value="special">Специальная</option>
                <option value="recurring">Регулярный клининг</option>
                <option value="gift">Уборка в подарок</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Площадь (м²)</label>
              <input
                type="number"
                min={10}
                value={formData.area || ''}
                onChange={(e) => updateField('area', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-200 outline-none transition-colors text-base"
                placeholder="50"
                inputMode="numeric"
              />
            </div>
          </div>

          {/* Комментарий */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">Комментарий</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 text-muted w-5 h-5" />
              <textarea
                rows={3}
                value={formData.comment}
                onChange={(e) => updateField('comment', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-200 outline-none transition-colors resize-none text-base"
                placeholder="Дополнительные пожелания или информация"
              />
            </div>
          </div>

          {/* Согласие */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => updateField('consent', e.target.checked)}
              className="mt-1 w-5 h-5 text-brand border-border focus:ring-brand-200"
            />
            <label className="text-sm text-muted leading-relaxed">
              Я согласен(а) на обработку персональных данных и принимаю{' '}
              <a href="#privacy" className="text-brand hover:text-brand-600 underline">
                политику конфиденциальности
              </a>
            </label>
          </div>

          {/* Кнопка отправки — прилипает снизу на мобильных */}
          <div className="sticky bottom-0 left-0 right-0 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 -mx-5 px-5 py-4 sm:static sm:bg-transparent sm:px-0 sm:py-0 border-t sm:border-0">
            <button
              type="submit"
              disabled={!formData.consent || isSubmitting || !isPhoneValid}
              className="w-full bg-brand hover:bg-brand-600 disabled:bg-gray-300 text-white px-6 py-4 font-semibold transition-colors rounded-md">
              {isSubmitting ? 'Отправляется...' : 'Отправить заявку'}
            </button>
          </div>
        </form>
      )}
    </Panel>
  );

  if (inline) return formContent;
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Форма обратной связи">
      {/* Затемнение + контейнер, учитывающий безопасную высоту мобильных браузеров */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative h-[100dvh] w-full flex items-stretch sm:items-center justify-center sm:p-4">
        {formContent}
      </div>
    </div>
  );
};
