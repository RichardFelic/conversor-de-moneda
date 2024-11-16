import { create } from 'zustand';
import type { ConversionStore } from '../types';

const initialState = {
  amount: '',
  currencyFrom: '',
  currencyTo: '',
  selectedInstitution: '',
  result: null,
  baseRate: null,
};

export const useConversionStore = create<ConversionStore>((set, get) => ({
  ...initialState,
  setAmount: (amount) => set({ amount }),
  setCurrencyFrom: (currencyFrom) => set({ currencyFrom }),
  setCurrencyTo: (currencyTo) => set({ currencyTo }),
  setSelectedInstitution: (selectedInstitution) => set({ selectedInstitution }),
  setResult: (result) => set({ result }),
  setBaseRate: (baseRate) => set({ baseRate }),
  reset: () => {
    const { currencyFrom, currencyTo } = get();
    set({
      ...initialState,
      currencyFrom,  // Mantener el ISO de origen
      currencyTo,    // Mantener el ISO de destino
    });
  },
}));