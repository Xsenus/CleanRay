import { useMemo } from 'react';
import { QuoteParams, QuoteResult } from '../types';

export const useQuoteCalculator = (params: QuoteParams): QuoteResult => {
  return useMemo<QuoteResult>(() => {
    // Диапазоны из вашей таблицы (м²)
    const tiers = [
      {
        min: 30,
        max: 45,
        wet: { price: 20000, team: '1 клинер', time: '3–4 часа' },
        gen: { price: 30000, team: '2 клинера', time: '4–5 часов' },
      },
      {
        min: 46,
        max: 70,
        wet: { price: 38000, team: '2 клинера', time: '3–4 часа' },
        gen: { price: 50000, team: '2 клинера', time: '4–5 часов' },
      },
      {
        min: 71,
        max: 100,
        wet: { price: 56000, team: '2 клинера', time: '4–6 часов' },
        gen: { price: 70000, team: '3–4 чел', time: '5–8 часов' },
      },
    ] as const;

    // Нормализуем площадь в границы таблицы
    const area = Math.min(Math.max(params.area || 30, 30), 100);
    const tier = tiers.find((t) => area >= t.min && area <= t.max) ?? tiers[tiers.length - 1];

    const pack = params.isGeneral ? tier.gen : tier.wet;

    // Доплаты (по скрину)
    const extraBathrooms = Math.max(0, (params.bathrooms || 1) - 1);
    const bathAdd = extraBathrooms * (params.isGeneral ? 8000 : 5000);
    const balconyAdd = (params.balconyCount || 0) * (params.isGeneral ? 7000 : 4000);
    const closetAdd = (params.closetCount || 0) * (params.isGeneral ? 7000 : 4000);

    const addOns = bathAdd + balconyAdd + closetAdd;

    // Надбавки
    const subtotal = pack.price + addOns;
    const urgent = params.isUrgent ? Math.round(subtotal * 0.4) : 0;
    const weekend = params.isWeekend ? Math.round(subtotal * 0.2) : 0;
    const withSurch = subtotal + urgent + weekend;

    // Скидки по регулярности
    const freqMul: Record<QuoteParams['frequency'], number> = {
      onetime: 0,
      monthly: 0.05,
      biweekly: 0.1,
      weekly: 0.2,
    };
    const discount = Math.round(withSurch * freqMul[params.frequency]);

    // Разбивка
    const breakdown: QuoteResult['breakdown'] = [
      { label: 'Базовая стоимость', amount: pack.price },
    ];
    if (bathAdd) breakdown.push({ label: `Доп. санузлы (${extraBathrooms} шт.)`, amount: bathAdd });
    if (balconyAdd)
      breakdown.push({ label: `Балконы/лоджии (${params.balconyCount} шт.)`, amount: balconyAdd });
    if (closetAdd)
      breakdown.push({
        label: `Гардеробные/кладовые (${params.closetCount} шт.)`,
        amount: closetAdd,
      });
    if (urgent) breakdown.push({ label: 'Срочность (+40%)', amount: urgent });
    if (weekend) breakdown.push({ label: 'Выходной день (+20%)', amount: weekend });
    if (discount) breakdown.push({ label: 'Скидка по регулярности', amount: -discount });

    return {
      base: pack.price,
      addOns,
      surcharges: urgent + weekend,
      frequencyDiscount: discount,
      total: Math.max(0, withSurch - discount),
      team: pack.team,
      time: pack.time,
      breakdown,
    };
  }, [params]);
};
