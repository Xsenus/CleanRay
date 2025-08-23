import React, { useEffect, useState } from 'react';
import { QuoteParams } from '../types';
import { useQuoteCalculator } from '../hooks/useQuoteCalculator';
import { Calculator, ArrowRight } from 'lucide-react';

type ServiceType = 'wet' | 'general' | 'special';

const ROOM_RANGES: Record<number, { min: number; max: number }> = {
  1: { min: 30, max: 45 },
  2: { min: 45, max: 70 },
  3: { min: 60, max: 100 },
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

interface InstantQuoteProps {
  onSendRequest: (params: QuoteParams) => void;
}

export const InstantQuote: React.FC<InstantQuoteProps> = ({ onSendRequest }) => {
  // локальный тип уборки (без изменения внешнего API)
  const [serviceType, setServiceType] = useState<ServiceType>('wet');

  const [params, setParams] = useState<QuoteParams>({
    area: 50,
    rooms: 2,
    bathrooms: 1,
    balconyCount: 0,
    closetCount: 0,
    isGeneral: false,
    frequency: 'onetime',
    isUrgent: false,
    isWeekend: false,
  });

  // Синхронизируем isGeneral с выбором типа
  useEffect(() => {
    setParams((p) => ({ ...p, isGeneral: serviceType === 'general' }));
  }, [serviceType]);

  // Диапазон площади по количеству комнат
  const range = ROOM_RANGES[params.rooms as 1 | 2 | 3] ?? { min: 30, max: 100 };

  const updateParam = <K extends keyof QuoteParams>(key: K, value: QuoteParams[K]) => {
    setParams((prev) => ({ ...prev, [key]: value } as QuoteParams));
  };

  // Обновление комнат с автокоррекцией площади под новый диапазон
  const updateRooms = (raw: number) => {
    const rooms = clamp(Math.round(raw || 1), 1, 3);
    const r = ROOM_RANGES[rooms];
    setParams((prev) => ({
      ...prev,
      rooms,
      area: clamp(prev.area, r.min, r.max),
    }));
  };

  // Обновление площади с учётом текущего допустимого диапазона
  const updateArea = (raw: number) => {
    const safe = clamp(Math.round(raw || range.min), range.min, range.max);
    updateParam('area', safe);
  };

  const result = useQuoteCalculator(params);
  const formatPrice = (n: number) => new Intl.NumberFormat('ru-RU').format(n);

  const isSpecial = serviceType === 'special';

  return (
    <div className="bg-white shadow-lg border border-border p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-8">
        <Calculator className="text-brand w-8 h-8" />
        <h3 className="text-2xl font-bold text-ink">Мгновенный расчёт</h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Форма */}
        <div className="space-y-6">
          {/* Вид уборки */}
          <div>
            <h4 className="font-semibold text-ink mb-3">Вид уборки</h4>
            <div className="grid sm:grid-cols-3 gap-2">
              {[
                { val: 'wet', label: 'Влажная' },
                { val: 'general', label: 'Генеральная' },
                { val: 'special', label: 'Специальная' },
              ].map((o) => (
                <label
                  key={o.val}
                  className="flex items-center gap-2 border border-border px-3 py-2 rounded-md cursor-pointer">
                  <input
                    type="radio"
                    name="serviceType"
                    className="w-5 h-5 text-brand border-border focus:ring-brand-100"
                    checked={serviceType === (o.val as ServiceType)}
                    onChange={() => setServiceType(o.val as ServiceType)}
                  />
                  <span className="text-ink">{o.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Площадь и комнаты */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Площадь (м²){' '}
                <span className="text-muted">
                  ({range.min}–{range.max})
                </span>
              </label>
              <input
                type="number"
                min={range.min}
                max={range.max}
                value={params.area}
                onChange={(e) => updateArea(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-100 outline-none transition-colors"
              />
              <p className="mt-1 text-xs text-muted">
                Диапазон зависит от количества комнат. При иных параметрах расчёт — индивидуально.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Комнаты <span className="text-muted">(1–3)</span>
              </label>
              <input
                type="number"
                min={1}
                max={3}
                value={params.rooms}
                onChange={(e) => updateRooms(parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-100 outline-none transition-colors"
              />
              <p className="mt-1 text-xs text-muted">
                1 комн: 30–45 • 2 комн: 45–70 • 3 комн: 60–100 м²
              </p>
            </div>
          </div>

          {/* Санузлы/балконы/кладовые */}
          <div className="grid sm:grid-cols-3 gap-4 items-start">
            <div>
              <label className="block text-sm font-medium text-ink mb-2 leading-snug sm:min-h-[40px]">
                Санузлы (всего)
              </label>
              <input
                type="number"
                min={1}
                max={5}
                value={params.bathrooms}
                onChange={(e) =>
                  updateParam('bathrooms', Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-full px-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-100 outline-none transition-colors"
              />
              <p className="mt-1 text-xs text-muted">1 санузел включён, доп. оплачиваются</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2 leading-snug sm:min-h-[40px]">
                Балконы / лоджии
              </label>
              <input
                type="number"
                min={0}
                max={4}
                value={params.balconyCount}
                onChange={(e) =>
                  updateParam('balconyCount', Math.max(0, parseInt(e.target.value) || 0))
                }
                className="w-full px-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-100 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-2 leading-snug sm:min-h-[40px]">
                Гардеробные / кладовые
              </label>
              <input
                type="number"
                min={0}
                max={4}
                value={params.closetCount}
                onChange={(e) =>
                  updateParam('closetCount', Math.max(0, parseInt(e.target.value) || 0))
                }
                className="w-full px-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-100 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Регулярность и условия (для специальной можно оставить - влияет на заявку) */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-ink mb-3">Регулярность</h4>
              <div className="space-y-2">
                {[
                  { value: 'onetime', label: 'Разовая уборка' },
                  { value: 'monthly', label: 'Ежемесячно (-5%)' },
                  { value: 'biweekly', label: 'Раз в 2 недели (-10%)' },
                  { value: 'weekly', label: 'Еженедельно (-20%)' },
                ].map((opt) => (
                  <label key={opt.value} className="flex items-center">
                    <input
                      type="radio"
                      name="frequency"
                      value={opt.value}
                      checked={params.frequency === opt.value}
                      onChange={(e) =>
                        updateParam('frequency', e.target.value as QuoteParams['frequency'])
                      }
                      className="mr-3 w-5 h-5 text-brand border-border focus:ring-brand-100"
                    />
                    <span className="text-ink">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-ink">Особые условия</h4>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={params.isUrgent}
                  onChange={(e) => updateParam('isUrgent', e.target.checked)}
                  className="mr-3 w-5 h-5 text-brand border-border focus:ring-brand-100"
                />
                <span className="text-ink">Срочная уборка (+40%)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={params.isWeekend}
                  onChange={(e) => updateParam('isWeekend', e.target.checked)}
                  className="mr-3 w-5 h-5 text-brand border-border focus:ring-brand-100"
                />
                <span className="text-ink">Выходной день (+20%)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Результат */}
        <div className="bg-brand-100 p-6">
          <h4 className="text-xl font-bold text-ink mb-4">Расчёт стоимости</h4>

          <div className="space-y-2 mb-4">
            <div className="text-sm text-muted">
              Рекомендуемая бригада: <span className="font-semibold text-ink">{result.team}</span>
              {isSpecial && <span className="ml-1 text-muted">(по прайсу)</span>}
            </div>
            <div className="text-sm text-muted">
              Оценка времени: <span className="font-semibold text-ink">{result.time}</span>
              {isSpecial && <span className="ml-1 text-muted">(по прайсу)</span>}
            </div>
          </div>

          {!isSpecial ? (
            <>
              <div className="space-y-2 mb-6">
                {result.breakdown.map((row, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className={row.amount < 0 ? 'text-green-700' : 'text-muted'}>
                      {row.label}:
                    </span>
                    <span
                      className={`font-medium ${row.amount < 0 ? 'text-green-700' : 'text-ink'}`}>
                      {row.amount < 0 ? '-' : ''}
                      {formatPrice(Math.abs(row.amount))} ₸
                    </span>
                  </div>
                ))}
                <div className="border-t border-brand-600 pt-3 mt-2">
                  <div className="flex justify-between text-xl font-bold text-brand-600">
                    <span>Итого:</span>
                    <span>{formatPrice(result.total)} ₸</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-3 mb-6">
              <div className="rounded-md bg-white/70 border border-brand-200 px-4 py-3 text-brand-700 font-semibold">
                Специальная уборка — <span className="underline decoration-dotted">под расчёт</span>
              </div>
              <p className="text-sm text-muted">
                Итоговая стоимость формируется по прайсу после уточнения параметров объекта.
              </p>
            </div>
          )}

          <p className="text-sm text-muted mb-6">
            {!isSpecial
              ? '*Расчёт по таблице для площадей 30–100 м². При иных параметрах — индивидуальный расчёт.'
              : '*Расчёт носит ознакомительный характер. Стоимость и состав работ подтверждаются менеджером.'}
          </p>

          <button
            onClick={() => onSendRequest(params)}
            className="w-full bg-brand hover:bg-brand-600 text-white px-6 py-4 font-semibold transition-colors flex items-center justify-center gap-2">
            Отправить заявку
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
