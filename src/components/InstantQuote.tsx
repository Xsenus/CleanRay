import React, { useMemo, useState } from 'react';
import type { QuoteParams } from '../types';
import { useQuoteCalculator } from '../hooks/useQuoteCalculator';
import { Calculator, ArrowRight } from 'lucide-react';

type ServiceType = 'wet' | 'general' | 'special';

const ROOM_RANGES: Record<number, { min: number; max: number }> = {
  1: { min: 30, max: 45 },
  2: { min: 45, max: 70 },
  3: { min: 60, max: 100 },
};

interface InstantQuoteProps {
  onSendRequest: (params: QuoteParams) => void;
}

export const InstantQuote: React.FC<InstantQuoteProps> = ({ onSendRequest }) => {
  // ТРИ ВВОДА ПОЛЬЗОВАТЕЛЯ:
  const [serviceType, setServiceType] = useState<ServiceType>('wet'); // вид уборки
  const [rooms, setRooms] = useState<1 | 2 | 3>(2); // комнаты
  const [area, setArea] = useState<number>(50); // квадратура

  const range = ROOM_RANGES[rooms] ?? { min: 30, max: 100 };
  const inRange = area >= range.min && area <= range.max;
  const isSpecial = serviceType === 'special';

  // Параметры для расчёта (скрытые дефолты без UI)
  const params: QuoteParams = useMemo(
    () => ({
      area,
      rooms,
      bathrooms: 1,
      balconyCount: 0,
      closetCount: 0,
      isGeneral: serviceType === 'general',
      frequency: 'onetime',
      isUrgent: false,
      isWeekend: false,
    }),
    [area, rooms, serviceType],
  );

  const result = useQuoteCalculator(params);
  const formatPrice = (n: number) => new Intl.NumberFormat('ru-RU').format(n);

  return (
    <div className="bg-white shadow-lg border border-border p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-8">
        <Calculator className="text-brand w-8 h-8" />
        <h3 className="text-2xl font-bold text-ink">Мгновенный расчёт</h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Левая колонка — ровно 3 поля */}
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

          {/* Комнаты */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Количество комнат <span className="text-muted">(1–3)</span>
            </label>
            <input
              type="number"
              min={1}
              max={3}
              value={rooms}
              onChange={(e) => {
                const v = Math.round(Number(e.target.value) || 1);
                const safe = (v < 1 ? 1 : v > 3 ? 3 : v) as 1 | 2 | 3;
                setRooms(safe);
              }}
              className="w-full px-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-100 outline-none transition-colors"
            />
            <p className="mt-1 text-xs text-muted">
              1 комн: 30–45 • 2 комн: 45–70 • 3 комн: 60–100 м²
            </p>
          </div>

          {/* Площадь */}
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              Площадь (м²){' '}
              <span className="text-muted">
                (допустимо {range.min}–{range.max})
              </span>
            </label>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(Math.max(0, Math.round(Number(e.target.value) || 0)))}
              className="w-full px-4 py-3 border border-border focus:border-brand focus:ring-2 focus:ring-brand-100 outline-none transition-colors"
            />
            {!inRange && (
              <p className="mt-1 text-xs text-rose-700">
                Вне диапазона для {rooms} комн. Будет индивидуальный расчёт.
              </p>
            )}
          </div>
        </div>

        {/* Правая колонка — результат */}
        <div className="bg-brand-100 p-6 rounded-md">
          <h4 className="text-xl font-bold text-ink mb-4">Результат</h4>

          {isSpecial || !inRange ? (
            <div className="space-y-3 mb-6">
              <div className="rounded-md bg-white/70 border border-brand-200 px-4 py-3 text-brand-700 font-semibold">
                {isSpecial ? 'Специальная уборка' : 'Площадь вне диапазона'} —{' '}
                <span className="underline decoration-dotted">индивидуальный расчёт</span>
              </div>
              <p className="text-sm text-muted">
                Уточним параметры и назовём точную стоимость после заявки.
              </p>
            </div>
          ) : (
            <div className="space-y-4 mb-6">
              <div className="text-sm text-muted">
                Рекомендуемая бригада: <span className="font-semibold text-ink">{result.team}</span>
              </div>
              <div className="text-sm text-muted">
                Оценка времени: <span className="font-semibold text-ink">{result.time}</span>
              </div>
              <div className="border-t border-brand-600 pt-3 mt-2">
                <div className="flex justify-between text-xl font-bold text-brand-600">
                  <span>Итого:</span>
                  <span>{formatPrice(result.total)} ₸</span>
                </div>
              </div>
            </div>
          )}

          <p className="text-sm text-muted mb-6">
            *Для {rooms} комн. допустимый диапазон {range.min}–{range.max} м². При иных параметрах —
            индивидуальный расчёт менеджера.
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
