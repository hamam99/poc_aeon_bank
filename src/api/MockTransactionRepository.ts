import dayjs from 'dayjs';

import type { Transaction } from '../types/transaction';
import { simulateRequest } from './simulateRequest';

const now = dayjs();

const mockTransactionsResponse = {
  data: [
    {
      id: 'txn-1001',
      title: 'Salary Credit',
      description: 'Monthly payroll',
      amount: 4200,
      date: now.subtract(1, 'day').hour(9).minute(2).toISOString(),
    },
    {
      id: 'txn-1002',
      title: 'DuitNow Transfer',
      description: 'To Nurul Aisyah',
      amount: -250,
      date: now.subtract(3, 'hour').toISOString(),
    },
    {
      id: 'txn-1003',
      title: 'eWallet Top Up',
      description: 'Touch n Go eWallet',
      amount: -100,
      date: now.subtract(5, 'day').hour(20).minute(15).toISOString(),
    },
    {
      id: 'txn-1004',
      title: 'Card Purchase',
      description: 'AEON BiG Mid Valley',
      amount: -68.4,
      date: now.subtract(30, 'minute').toISOString(),
    },
    {
      id: 'txn-1005',
      title: 'Cashback Reward',
      description: 'eWallet campaign',
      amount: 12.5,
      date: now.subtract(9, 'day').hour(11).minute(45).toISOString(),
    },
    {
      id: 'txn-1006',
      title: 'Utility Bill',
      description: 'TNB electricity',
      amount: -156.2,
      date: now.subtract(2, 'day').hour(8).minute(30).toISOString(),
    },
    {
      id: 'txn-1007',
      title: 'ATM Withdrawal',
      description: 'AEON Bank Kota Damansara',
      amount: -300,
      date: now.subtract(12, 'day').hour(18).minute(5).toISOString(),
    },
    {
      id: 'txn-1008',
      title: 'Refund',
      description: 'Online order return',
      amount: 45.9,
      date: now.subtract(6, 'day').hour(14).minute(20).toISOString(),
    },
    {
      id: 'txn-1009',
      title: 'Gold Financing Payment',
      description: 'Monthly instalment',
      amount: -420,
      date: now.subtract(7, 'day').hour(10).toISOString(),
    },
  ] as Transaction[],
};

export class MockTransactionRepository {
  async getTransactions(): Promise<Transaction[]> {
    return simulateRequest(mockTransactionsResponse.data);
  }
}
