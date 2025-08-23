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
  // Ключ Web3Forms и (опционально) адрес получателя
  const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
  const WEB3FORMS_TO = import.meta.env.VITE_WEB3FORMS_TO as string | undefined;

  const typeLabel: Record<string, string> = {
    regular: 'Поддерживающая',
    general: 'Генеральная',
    special: 'Специальная',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;

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

      // Формируем multipart/form-data — самый совместимый формат для Web3Forms
      const fd = new FormData();
      fd.append('access_key', key);
      fd.append('subject', subject);
      fd.append('from_name', 'Форма сайта ЛУЧисто');

      // Человекочитаемые заголовки полей (письмо будет аккуратным и по-русски)
      fd.append('Имя', formData.name);
      fd.append('Телефон', formData.phone);
      fd.append('Адрес', formData.address);
      fd.append('Тип уборки', typeLabel[formData.cleaningType] ?? formData.cleaningType);
      if (formData.area) fd.append('Площадь', `${formData.area} м²`);
      if (formData.comment) fd.append('Комментарий', formData.comment);
      fd.append('Согласие на обработку', formData.consent ? 'Да' : 'Нет');
      fd.append('Источник', location.href);

      // Сводка одним полем (многострочный текст)
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

      // Антиспам и адрес получателя
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
        // при необходимости: очистка/закрытие
        // setTimeout(() => onClose?.(), 1800);
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

  // Маска телефона (KZ): +7 (XXX) XXX-XX-XX
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.startsWith('7')) {
      return cleaned.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    updateField('phone', formatted);
  };

  const formContent = (
    <div className={`${inline ? '' : 'bg-white p-8 max-w-2xl w-full mx-4'}`}>
      {!inline && (
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-ink">Оставить заявку</h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-muted hover:text-ink transition-colors"
              aria-label="Закрыть">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>
      )}

      {isSubmitted ? (
        <div className="text-center py-8">
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
        <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full pl-10 pr-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-200 outline-none transition-colors"
                placeholder="Ваше имя"
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
                className="w-full pl-10 pr-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-200 outline-none transition-colors"
                placeholder="+7 (___) ___-__-__"
              />
            </div>
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
                className="w-full pl-10 pr-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-200 outline-none transition-colors"
                placeholder="Улица, дом, квартира"
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
                className="w-full px-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-200 outline-none transition-colors">
                <option value="regular">Поддерживающая</option>
                <option value="general">Генеральная</option>
                <option value="special">Специальная</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Площадь (м²)</label>
              <input
                type="number"
                min={10}
                value={formData.area || ''}
                onChange={(e) => updateField('area', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-200 outline-none transition-colors"
                placeholder="50"
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
                className="w-full pl-10 pr-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-200 outline-none transition-colors resize-none"
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

          {/* Отправка */}
          <button
            type="submit"
            disabled={!formData.consent || isSubmitting}
            className="w-full bg-brand hover:bg-brand-600 disabled:bg-gray-300 text-white px-6 py-4 font-semibold transition-colors">
            {isSubmitting ? 'Отправляется...' : 'Отправить заявку'}
          </button>
        </form>
      )}
    </div>
  );

  if (inline) return formContent;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {formContent}
    </div>
  );
};
