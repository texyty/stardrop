import type { Case, Rarity, RarityMeta } from '../types';

export const rarities: Record<Rarity, RarityMeta> = {
  consumer: { label: 'Ширпотреб', color: '#b0c3d9' },
  industrial: { label: 'Промышленное', color: '#5e98d9' },
  milspec: { label: 'Армейское', color: '#4b69ff' },
  restricted: { label: 'Запрещённое', color: '#8847ff' },
  classified: { label: 'Засекреченное', color: '#d32ce6' },
  covert: { label: 'Тайное', color: '#eb4b4b' },
  rare: { label: '★ Тайное', color: '#f6b73c' }
};

export const cases: Case[] = [
  {
    id: 'starter',
    name: 'Стартовый кейс',
    tag: 'Бюджет',
    price: 99,
    cover: 'linear-gradient(135deg, #1b2440, #0a0e1a)',
    items: [
      { weapon: 'P250', name: 'Пепел', rarity: 'consumer', price: 24, weight: 440 },
      { weapon: 'MP9', name: 'Гроза', rarity: 'industrial', price: 58, weight: 280 },
      { weapon: 'Galil AR', name: 'Холод', rarity: 'milspec', price: 140, weight: 160 },
      { weapon: 'FAMAS', name: 'Кибер', rarity: 'milspec', price: 165, weight: 70 },
      { weapon: 'M4A1-S', name: 'Неон', rarity: 'restricted', price: 420, weight: 30 },
      { weapon: 'AK-47', name: 'Пурпур', rarity: 'restricted', price: 560, weight: 15 },
      { weapon: 'USP-S', name: 'Осколок', rarity: 'classified', price: 1250, weight: 3 },
      { weapon: 'AWP', name: 'Призрак', rarity: 'covert', price: 3400, weight: 2 }
    ]
  },
  {
    id: 'neon',
    name: 'Neon Rush',
    tag: 'Хит',
    price: 249,
    cover: 'linear-gradient(135deg, #3b0f52, #101a3a)',
    items: [
      { weapon: 'Glock-18', name: 'Неон', rarity: 'consumer', price: 60, weight: 420 },
      { weapon: 'MAC-10', name: 'Лазер', rarity: 'industrial', price: 130, weight: 260 },
      { weapon: 'SSG 08', name: 'Импульс', rarity: 'milspec', price: 310, weight: 180 },
      { weapon: 'M4A4', name: 'Киберпанк', rarity: 'milspec', price: 380, weight: 90 },
      { weapon: 'AK-47', name: 'Вольт', rarity: 'restricted', price: 890, weight: 35 },
      { weapon: 'Desert Eagle', name: 'Плазма', rarity: 'restricted', price: 1100, weight: 10 },
      { weapon: 'AWP', name: 'Синтвейв', rarity: 'classified', price: 2900, weight: 4 },
      { weapon: '★ Керамбит', name: 'Неон', rarity: 'rare', price: 9800, weight: 1 }
    ]
  },
  {
    id: 'dragon',
    name: 'Dragon Case',
    tag: 'Премиум',
    price: 999,
    cover: 'linear-gradient(135deg, #4a1d0c, #1a0a06)',
    items: [
      { weapon: 'M249', name: 'Уголь', rarity: 'consumer', price: 120, weight: 380 },
      { weapon: 'PP-Bizon', name: 'Дым', rarity: 'industrial', price: 260, weight: 240 },
      { weapon: 'SG 553', name: 'Дракон', rarity: 'milspec', price: 640, weight: 180 },
      { weapon: 'M4A1-S', name: 'Пламя', rarity: 'restricted', price: 1450, weight: 120 },
      { weapon: 'AK-47', name: 'Огненный змей', rarity: 'classified', price: 4200, weight: 50 },
      { weapon: 'Desert Eagle', name: 'Пламя', rarity: 'classified', price: 3800, weight: 20 },
      { weapon: 'AWP', name: 'Dragon Lore', rarity: 'covert', price: 14500, weight: 9 },
      { weapon: '★ Керамбит', name: 'Fade', rarity: 'rare', price: 26000, weight: 1 }
    ]
  },
  {
    id: 'knife',
    name: 'Knife Only',
    tag: 'Ножи',
    price: 8999,
    cover: 'linear-gradient(135deg, #2c2c1a, #0c0c08)',
    items: [
      { weapon: '★ Наваха', name: 'Скандал', rarity: 'covert', price: 3200, weight: 200 },
      { weapon: '★ Флип', name: 'Градиент', rarity: 'covert', price: 4100, weight: 250 },
      { weapon: '★ Штык-нож', name: 'Красная линия', rarity: 'covert', price: 5200, weight: 200 },
      { weapon: '★ Бабочка', name: 'Градиент', rarity: 'rare', price: 12800, weight: 250 },
      { weapon: '★ Керамбит', name: 'Убийство', rarity: 'rare', price: 15400, weight: 60 },
      { weapon: '★ Керамбит', name: 'Градиент', rarity: 'rare', price: 18900, weight: 25 },
      { weapon: '★ Тальон', name: 'Рубин', rarity: 'rare', price: 29000, weight: 10 },
      { weapon: '★ Керамбит', name: 'Изумруд', rarity: 'rare', price: 46000, weight: 5 }
    ]
  },
  {
    id: 'budget',
    name: 'Бюджетный кейс',
    tag: 'Дешёвый',
    price: 49,
    cover: 'linear-gradient(135deg, #0f2b2a, #081414)',
    items: [
      { weapon: 'Nova', name: 'Пески', rarity: 'consumer', price: 12, weight: 500 },
      { weapon: 'PP-Bizon', name: 'Ночной', rarity: 'industrial', price: 30, weight: 280 },
      { weapon: 'MP7', name: 'Армия', rarity: 'milspec', price: 75, weight: 150 },
      { weapon: 'Galil AR', name: 'Тигр', rarity: 'restricted', price: 190, weight: 50 },
      { weapon: 'AK-47', name: 'Синий', rarity: 'restricted', price: 280, weight: 15 },
      { weapon: 'AWP', name: 'Сафари', rarity: 'classified', price: 720, weight: 4 },
      { weapon: '★ Флип', name: 'Лапша', rarity: 'rare', price: 3200, weight: 1 }
    ]
  },
  {
    id: 'elite',
    name: 'Elite Case',
    tag: 'Топ',
    price: 499,
    cover: 'linear-gradient(135deg, #0c2a4a, #08111f)',
    items: [
      { weapon: 'Five-SeveN', name: 'Кобальт', rarity: 'consumer', price: 45, weight: 430 },
      { weapon: 'MP7', name: 'Шторм', rarity: 'industrial', price: 110, weight: 240 },
      { weapon: 'M4A4', name: 'Азимов', rarity: 'milspec', price: 480, weight: 200 },
      { weapon: 'AK-47', name: 'Азимов', rarity: 'restricted', price: 1150, weight: 100 },
      { weapon: 'AWP', name: 'Азимов', rarity: 'classified', price: 3600, weight: 15 },
      { weapon: 'M4A1-S', name: 'Принтстрим', rarity: 'classified', price: 4200, weight: 10 },
      { weapon: '★ Бабочка', name: 'Кровавая паутина', rarity: 'rare', price: 19800, weight: 3 },
      { weapon: '★ Керамбит', name: 'Доплер', rarity: 'rare', price: 24500, weight: 2 }
    ]
  }
];

export function getCaseById(id: string) {
  return cases.find((c) => c.id === id) || null;
}

export function pickWeighted(items: typeof cases[number]['items']) {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * total;
  for (const item of items) {
    roll -= item.weight;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

export function getChance(item: typeof cases[number]['items'][number], items: typeof cases[number]['items']) {
  const total = items.reduce((sum, i) => sum + i.weight, 0);
  return (item.weight / total) * 100;
}

export const rarityRank: Record<Rarity, number> = {
  consumer: 0,
  industrial: 1,
  milspec: 2,
  restricted: 3,
  classified: 4,
  covert: 5,
  rare: 6
};
