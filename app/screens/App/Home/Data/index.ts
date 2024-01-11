import { NavigatorScreenParams } from '@react-navigation/native';

import { pallets } from 'constant';
import { HomeRoutes, TransferRoutes } from 'navigation';

interface HomeSection {
  title: string;
  icon: IconName;
  color: string;
  route?: NavigatorScreenParams<HomeRoutes>;
  id: 'transfer' | 'bills' | 'airtime' | 'favorites' | 'utility';
}

interface TransferSectionProps {
  title: string;
  route: Extract<
    keyof TransferRoutes,
    'AwacashSelectAccount' | 'Beneficiary' | 'MyAccountSelect' | 'BankSelectAccount'
  >;
}

interface TransactionProps {
  type: 'debit' | 'credit';
  amount: string;
  date: Date;
  message: string;
}

export const homeSection: HomeSection[] = [
  {
    color: '#23E7B8',
    icon: 'send',
    id: 'transfer',
    route: {
      params: { screen: 'TransferMethod' },
      screen: 'Transfer',
    },
    title: 'Transfer',
  },
  {
    color: '#FDAA49',
    icon: 'receipt-2',
    id: 'bills',
    route: {
      params: { screen: 'Biller' },
      screen: 'Bill',
    },
    title: 'Pay Bills',
  },
  {
    color: '#4460F1',
    icon: 'wifi-square',
    id: 'airtime',
    route: {
      params: { screen: 'AirtimeOrData' },
      screen: 'Bill',
    },
    title: 'Data & Airtime',
  },
  {
    color: '#FDAA49',
    icon: 'flash',
    id: 'utility',
    title: 'Utility',
  },
  {
    color: pallets.primary,
    icon: 'add-circle',
    id: 'favorites',
    title: 'Favorites',
  },
];

export const transactions: TransactionProps[] = [
  {
    amount: '5000',
    date: new Date(),
    message: 'From Ola',
    type: 'credit',
  },
  {
    amount: '75000',
    date: new Date(),
    message: 'From Chinedu',
    type: 'debit',
  },
  {
    amount: '2500',
    date: new Date(),
    message: 'From James',
    type: 'credit',
  },
  {
    amount: '5000',
    date: new Date(),
    message: 'From Agba',
    type: 'credit',
  },
  {
    amount: '5000',
    date: new Date(),
    message: 'From Tunde',
    type: 'credit',
  },
];

export const transferSection: TransferSectionProps[] = [
  {
    route: 'AwacashSelectAccount',
    title: 'Transfer to Awacash Account',
  },
  {
    route: 'Beneficiary',
    title: 'Transfer to a Beneficiary',
  },
  {
    route: 'BankSelectAccount',
    title: 'Transfer to other Banks',
  },
  {
    route: 'MyAccountSelect',
    title: 'Transfer to my Account',
  },
];
