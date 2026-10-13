import type { Promo } from '../types/dashboard';
import { simulateRequest } from './simulateRequest';

const mockPromosResponse = {
  data: [
    {
      id: '1',
      title: 'Cashback eWallet',
      description:
        'Topup and you will get cashback up to RM 10 for every transaction.',
    },
    {
      id: '2',
      title: 'Gold Financing',
      description:
        'Get gold financing without processing fees throughout this month.',
    },
  ] satisfies Promo[],
};

export class MockPromoRepository {
  async getPromos(): Promise<Promo[]> {
    return simulateRequest(mockPromosResponse.data);
  }
}
