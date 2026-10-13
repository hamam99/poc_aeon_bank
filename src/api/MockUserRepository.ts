import type { AccountSummary } from '../types/dashboard';
import { simulateRequest } from './simulateRequest';

const mockUserResponse = {
  data: {
    accountNumber: '0460059173',
    holderName: 'Hamam Nasrodin',
    balance: 12480.55,
  } as AccountSummary,
};

export class MockUserRepository {
  async getUser(): Promise<AccountSummary> {
    return simulateRequest(mockUserResponse.data);
  }
}
