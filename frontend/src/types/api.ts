import {Roles} from '@/constants/roles';

export interface Institution {
  _id: string;
  name: string;
  country?: string | null;
  img?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  name: string;
  role: typeof Roles[keyof typeof Roles];
  isConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExchangeRate {
  _id: string;
  currencyFrom: string;
  currencyTo: string;
  exchangeRate: number;
  update_date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Conversion {
  _id: string;
  currencyFrom: string;
  currencyTo: string;
  amount: number;
  result: number;
  date: string;
  userId?: string;
  exchange_rate_id?: string;
  institution_exchange_rate_id?: string;
  createdAt: string;
  updatedAt: string;
}