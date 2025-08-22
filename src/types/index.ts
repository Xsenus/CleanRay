export type Frequency = 'onetime' | 'monthly' | 'biweekly' | 'weekly';

export type QuoteParams = {
  area: number; // площадь, м² (30–100 по таблице)
  rooms: number; // для формы; в формуле не участвует
  bathrooms: number; // всего санузлов/ванн (1 включён в базу)
  balconyCount: number; // кол-во балконов/лоджий
  closetCount: number; // кол-во гардеробных/кладовых
  isGeneral: boolean; // генеральная уборка
  frequency: Frequency; // регулярность
  isUrgent: boolean; // срочно (+40%)
  isWeekend: boolean; // выходной (+20%)
};

export type QuoteResult = {
  base: number; // базовая стоимость по диапазону
  addOns: number; // сумма доп.работ
  surcharges: number; // надбавки (срочно/выходной)
  frequencyDiscount: number; // скидка по регулярности (положительное число, вычитается)
  total: number; // итог
  team: string; // «1 клинер», «2 клинера», «3–4 чел»
  time: string; // «3–4 часа», «5–8 часов»
  breakdown: { label: string; amount: number }[]; // расшифровка строк
};


export interface LeadFormData {
  name: string;
  phone: string;
  address: string;
  cleaningType: string;
  area: number;
  comment: string;
  consent: boolean;
}