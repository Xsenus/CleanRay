// src/utils/phone.ts
/** Форматирование под вид: +7 (XXX) XXX XXX
 * Работает как минимум для номеров, начинающихся с 7 (Россия/Казахстан).
 * Если не удаётся привести — вернём исходную строку без изменений.
 */
export function formatPhoneDisplay(input?: string): string {
  if (!input) return '';

  // Оставляем только цифры и ведущий '+'
  const hasPlus = input.trim().startsWith('+');
  const digits = (input.match(/\d+/g) || []).join('');

  // Если начинается с 7 (или пришло с '+7'), форматируем как +7 (XXX) XXX XXX
  // Поддержим как 10-значные (включая ведущую 7), так и 11-значные (7 + 10 цифр)
  let d = digits;
  if (hasPlus && d.startsWith('7')) {
    // уже '+7...'
  } else if (!hasPlus && d.startsWith('7')) {
    // ок
  } else if (!hasPlus && d.startsWith('8') && d.length >= 10) {
    // популярный ввод с 8 — приведём к 7
    d = '7' + d.slice(1);
  }

  // теперь пытаемся собрать +7 (XXX) XXX XXX
  if (d.startsWith('7') && d.length >= 10) {
    const rest = d.slice(1); // после "7"
    const a = rest.slice(0, 3);
    const b = rest.slice(3, 6);
    const c = rest.slice(6, 9);
    const tail = rest.slice(9); // если вдруг есть лишние цифры — аккуратно добавим

    return `+7 (${a}) ${b} ${c}${tail ? ' ' + tail : ''}`.trim();
  }

  // fallback — если не распознали схему
  return (hasPlus ? '+' : '') + digits;
}
