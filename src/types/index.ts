export type Rarity = 'consumer' | 'industrial' | 'milspec' | 'restricted' | 'classified' | 'covert' | 'rare';

export interface RarityMeta {
  label: string;
  color: string;
}

export interface CaseItem {
  weapon: string;
  name: string;
  rarity: Rarity;
  price: number;
  weight: number;
}

export interface Case {
  id: string;
  name: string;
  tag: string;
  price: number;
  cover: string;
  items: CaseItem[];
}

export interface InventoryItem extends CaseItem {
  uid: string;
  caseId: string;
}

export interface User {
  username: string;
}

export type Page = 'home' | 'cases' | 'battle' | 'inventory' | 'signin' | 'signup';
