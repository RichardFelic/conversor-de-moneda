import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { toast } from 'sonner';
import type { ConversionResult } from '../types';

interface ConversionData {
  amount: number;
  currencyFrom: string;
  currencyTo: string;
  institution_exchange_rate_id?: string;
}

export const useConversion = (onSuccess: (data: ConversionResult) => void) => {
  return useMutation({
    mutationFn: async (data: ConversionData) => {
      if (!data.amount || !data.currencyFrom || !data.currencyTo) {
        throw new Error('Invalid conversion data');
      }
      const response = await api.post<ConversionResult>('/conversions/convert', data);
      return response.data;
    },
    onSuccess,
    onError: (error: unknown) => {
      const errorMessage = (error as { response?: { data?: { error?: string } } }).response?.data?.error || 'Failed to convert currency';
      toast.error(errorMessage);
    }
  });
};