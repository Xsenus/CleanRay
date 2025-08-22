import React, { useState } from 'react';
import { QuoteParams } from '../types';
import { useQuoteCalculator } from '../hooks/useQuoteCalculator';
import { Calculator, ArrowRight } from 'lucide-react';

interface InstantQuoteProps {
  onSendRequest: (params: QuoteParams) => void;
}

export const InstantQuote: React.FC<InstantQuoteProps> = ({ onSendRequest }) => {
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

  const result = useQuoteCalculator(params);

  const updateParam = <K extends keyof QuoteParams>(key: K, value: QuoteParams[K]) => {
    setParams((prev: QuoteParams) => ({ ...prev, [key]: value } as QuoteParams));
  };

  const formatPrice = (n: number) => new Intl.NumberFormat('ru-RU').format(n);

  return (
    <div className="bg-white shadow-lg border border-border p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-8">
        <Calculator className="text-brand w-8 h-8" />
        <h3 className="text-2xl font-bold text-ink">Мгновенный расчёт</h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Форма */}
        <div className="space-y-6">
          {/* Площадь и комнаты */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-2">
                Площадь (м²) <span className="text-muted">(30–100)</span>
              </label>
              <input
                type="number"
                min={1}
                max={1000}
                value={params.area}
                onChange={(e) =>
                  updateParam('area', Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))
                }
                className="w-full px-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-100 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-2">Комнаты</label>
              <input
                type="number"
                min={1}
                max={10}
                value={params.rooms}
                onChange={(e) => updateParam('rooms', parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-100 outline-none transition-colors"
              />
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

          {/* Тип и регулярность */}
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={params.isGeneral}
                onChange={(e) => updateParam('isGeneral', e.target.checked)}
                className="mr-3 w-5 h-5 text-brand border-border focus:ring-brand-100"
              />
              <span className="text-ink">Генеральная уборка</span>
            </label>

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
            </div>
            <div className="text-sm text-muted">
              Оценка времени: <span className="font-semibold text-ink">{result.time}</span>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            {result.breakdown.map((row, idx) => (
              <div key={idx} className="flex justify-between">
                <span className={row.amount < 0 ? 'text-green-700' : 'text-muted'}>
                  {row.label}:
                </span>
                <span className={`font-medium ${row.amount < 0 ? 'text-green-700' : 'text-ink'}`}>
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

          <p className="text-sm text-muted mb-6">
            *Расчёт по таблице для площадей 30–100 м². Для иных параметров менеджер уточнит
            стоимость.
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
