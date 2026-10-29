export function formatRub(value: number | string) {
  const num = Math.round(Number(value) || 0);
  return num.toLocaleString('ru-RU') + ' ₽';
}

export function uid() {
  return 'it_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
}
