import React, { useMemo, useState } from 'react';
import type { QuoteParams } from '../types';
import { useQuoteCalculator } from '../hooks/useQuoteCalculator';
import { Calculator, ArrowRight } from 'lucide-react';

type PlanKey = 'wet-1' | 'wet-2' | 'wet-3' | 'gen-1' | 'gen-2' | 'gen-3';

interface InstantQuoteProps {
  onSendRequest: (params: QuoteParams) => void;
}

// Базовые пресеты без лишних полей — mid площади из диапазонов
const baseParams = {
  bathrooms: 1,
  balconyCount: 0,
  closetCount: 0,
  frequency: 'onetime' as const,
  isUrgent: false,
  isWeekend: false,
};

function presetParams(key: PlanKey): QuoteParams {
  switch (key) {
    case 'wet-1':
      return { ...baseParams, rooms: 1, area: 38, isGeneral: false };
    case 'wet-2':
      return { ...baseParams, rooms: 2, area: 58, isGeneral: false };
    case 'wet-3':
      return { ...baseParams, rooms: 3, area: 80, isGeneral: false };
    case 'gen-1':
      return { ...baseParams, rooms: 1, area: 38, isGeneral: true };
    case 'gen-2':
      return { ...baseParams, rooms: 2, area: 58, isGeneral: true };
    case 'gen-3':
      return { ...baseParams, rooms: 3, area: 80, isGeneral: true };
  }
}

export const InstantQuote: React.FC<InstantQuoteProps> = ({ onSendRequest }) => {
  const [selected, setSelected] = useState<PlanKey>('wet-2');

  // Вызываем hook ровно 6 раз (без циклов/условий), затем собираем данные в массив
  const r_w1 = useQuoteCalculator(presetParams('wet-1'));
  const r_w2 = useQuoteCalculator(presetParams('wet-2'));
  const r_w3 = useQuoteCalculator(presetParams('wet-3'));
  const r_g1 = useQuoteCalculator(presetParams('gen-1'));
  const r_g2 = useQuoteCalculator(presetParams('gen-2'));
  const r_g3 = useQuoteCalculator(presetParams('gen-3'));

  const plans = useMemo(
    () =>
      [
        { key: 'wet-1', title: 'Влажная', subtitle: '1 комната • 30–45 м²', result: r_w1 },
        { key: 'wet-2', title: 'Влажная', subtitle: '2 комнаты • 45–70 м²', result: r_w2 },
        { key: 'wet-3', title: 'Влажная', subtitle: '3 комнаты • 60–100 м²', result: r_w3 },
        { key: 'gen-1', title: 'Генеральная', subtitle: '1 комната • 30–45 м²', result: r_g1 },
        { key: 'gen-2', title: 'Генеральная', subtitle: '2 комнаты • 45–70 м²', result: r_g2 },
        { key: 'gen-3', title: 'Генеральная', subtitle: '3 комнаты • 60–100 м²', result: r_g3 },
      ] as const,
    [r_w1, r_w2, r_w3, r_g1, r_g2, r_g3],
  );

  const current = plans.find((p) => p.key === selected)!;
  const currentParams = presetParams(selected);
  const formatPrice = (n: number) => new Intl.NumberFormat('ru-RU').format(n);

  return (
    <div className="bg-white shadow-lg border border-border p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-8">
        <Calculator className="text-brand w-8 h-8" />
        <h3 className="text-2xl font-bold text-ink">Мгновенный расчёт</h3>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Левая часть — 6 карточек */}
        <div className="grid sm:grid-cols-2 gap-4">
          {plans.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setSelected(p.key as PlanKey)}
              className={`text-left rounded-xl border-2 p-5 transition
                ${
                  selected === p.key
                    ? 'border-brand shadow-md bg-brand-50/40'
                    : 'border-border hover:border-brand'
                }`}>
              <div className="text-sm font-semibold text-ink/80">{p.title}</div>
              <div className="text-xs text-muted mb-2">{p.subtitle}</div>
              <div className="text-2xl font-bold text-brand">{formatPrice(p.result.total)} ₸</div>
              <div className="mt-2 text-xs text-muted">
                {p.result.team} • {p.result.time}
              </div>
            </button>
          ))}
        </div>

        {/* Правая часть — выбранный план */}
        <div className="bg-brand-100 p-6 rounded-md">
          <h4 className="text-xl font-bold text-ink mb-4">Вы выбрали</h4>
          <div className="rounded-md bg-white/80 border border-brand-200 p-4 mb-4">
            <div className="text-sm font-semibold text-ink/80">
              {current.title} — {current.subtitle}
            </div>
            <div className="mt-1 text-2xl font-bold text-brand">
              {formatPrice(current.result.total)} ₸
            </div>
            <div className="mt-1 text-sm text-muted">
              {current.result.team} • {current.result.time}
            </div>
          </div>

          <p className="text-sm text-muted mb-6">
            *Расчёт ознакомительный по таблице (30–100 м²). При иных параметрах — индивидуальный
            расчёт менеджера.
          </p>

          <button
            onClick={() => onSendRequest(currentParams)}
            className="w-full bg-brand hover:bg-brand-600 text-white px-6 py-4 font-semibold transition-colors flex items-center justify-center gap-2">
            Отправить заявку
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="mt-4 text-xs text-muted">
            Нужна уборка после ремонта или переезда?{' '}
            <span className="font-semibold text-ink">Специальная уборка — под расчёт.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
