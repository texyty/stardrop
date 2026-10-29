import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CaseItem, InventoryItem, User } from '../types';
import { uid } from '../lib/format';

interface Accounts {
  [key: string]: { username: string; password: string };
}

interface AppState {
  balance: number;
  inventory: InventoryItem[];
  user: User | null;
  accounts: Accounts;
  setBalance: (value: number) => void;
  addBalance: (value: number) => void;
  addItem: (item: CaseItem & { caseId: string }) => InventoryItem;
  removeItem: (uid: string) => void;
  setInventory: (items: InventoryItem[]) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
  register: (username: string, password: string) => boolean;
  authenticate: (username: string, password: string) => User | null;
}

const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      balance: 10000,
      inventory: [],
      user: null,
      accounts: {},
      setBalance: (value) =>
        set({ balance: Math.max(0, Math.round(Number(value) || 0)) }),
      addBalance: (value) => set((state) => ({ balance: Math.max(0, Math.round(state.balance + Number(value))) })),
      addItem: (item) => {
        const entry: InventoryItem = {
          uid: uid(),
          caseId: item.caseId,
          weapon: item.weapon,
          name: item.name,
          rarity: item.rarity,
          price: item.price,
          weight: item.weight
        };
        set((state) => ({ inventory: [entry, ...state.inventory] }));
        return entry;
      },
      removeItem: (id) => set((state) => ({ inventory: state.inventory.filter((item) => item.uid !== id) })),
      setInventory: (items) => set({ inventory: items }),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
      register: (username, password) => {
        const key = username.trim().toLowerCase();
        if (key.length < 3) return false;
        if (password.length < 6) return false;
        const accounts = get().accounts;
        if (accounts[key]) return false;
        const updated: Accounts = { ...accounts, [key]: { username: username.trim(), password } };
        set({ accounts: updated, user: { username: username.trim() } });
        return true;
      },
      authenticate: (username, password) => {
        const key = username.trim().toLowerCase();
        const account = get().accounts[key];
        if (!account) return null;
        if (account.password !== password) return null;
        set({ user: { username: account.username } });
        return { username: account.username };
      }
    }),
    {
      name: 'starlight-store'
    }
  )
);

export default useStore;
