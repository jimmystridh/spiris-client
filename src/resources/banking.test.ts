import { describe, it, expect, beforeEach } from 'vitest';
import {
  BankAccountsResource,
  BankTransactionsResource,
  BanksResource,
} from './banking';
import {
  createMockClient,
  createPaginatedResponse,
  mockBankAccount,
  mockBankTransaction,
} from '../test-utils';

describe('BankAccountsResource', () => {
  let resource: BankAccountsResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new BankAccountsResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all bank accounts', async () => {
      const response = createPaginatedResponse([mockBankAccount]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/bankaccounts', undefined);
      expect(result).toEqual(response);
    });

    it('should pass pagination params', async () => {
      const response = createPaginatedResponse([mockBankAccount]);
      mockClient.get.mockResolvedValue(response);

      await resource.getAll({ page: 2, pageSize: 20 });

      expect(mockClient.get).toHaveBeenCalledWith('/v2/bankaccounts', {
        page: 2,
        pageSize: 20,
      });
    });
  });

  describe('get', () => {
    it('should fetch a single bank account by ID', async () => {
      mockClient.get.mockResolvedValue(mockBankAccount);

      const result = await resource.get('bank-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/bankaccounts/bank-123');
      expect(result).toEqual(mockBankAccount);
    });
  });

  describe('create', () => {
    it('should create a new bank account', async () => {
      const createData = {
        name: 'Savings Account',
        bankAccountNumber: '9876543210',
        bankName: 'SEB',
      };
      mockClient.post.mockResolvedValue({ id: 'new-bank', ...createData });

      const result = await resource.create(createData);

      expect(mockClient.post).toHaveBeenCalledWith('/v2/bankaccounts', createData);
      expect(result.name).toBe('Savings Account');
    });
  });

  describe('update', () => {
    it('should update an existing bank account', async () => {
      const updateData = { name: 'Updated Account' };
      mockClient.put.mockResolvedValue({ ...mockBankAccount, ...updateData });

      const result = await resource.update('bank-123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith('/v2/bankaccounts/bank-123', updateData);
      expect(result.name).toBe('Updated Account');
    });
  });

  describe('delete', () => {
    it('should delete a bank account', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('bank-123');

      expect(mockClient.delete).toHaveBeenCalledWith('/v2/bankaccounts/bank-123');
    });
  });
});

describe('BankTransactionsResource', () => {
  let resource: BankTransactionsResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new BankTransactionsResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all bank transactions', async () => {
      const response = createPaginatedResponse([mockBankTransaction]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/banktransactions', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('get', () => {
    it('should fetch a single bank transaction by ID', async () => {
      mockClient.get.mockResolvedValue(mockBankTransaction);

      const result = await resource.get('btx-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/banktransactions/btx-123');
      expect(result).toEqual(mockBankTransaction);
    });
  });

  describe('getByBankAccount', () => {
    it('should fetch transactions for a specific bank account', async () => {
      const response = createPaginatedResponse([mockBankTransaction]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getByBankAccount('bank-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/banktransactions', {
        bankAccountId: 'bank-123',
      });
      expect(result).toEqual(response);
    });

    it('should pass pagination params with bank account filter', async () => {
      const response = createPaginatedResponse([mockBankTransaction]);
      mockClient.get.mockResolvedValue(response);

      await resource.getByBankAccount('bank-123', { page: 2, pageSize: 10 });

      expect(mockClient.get).toHaveBeenCalledWith('/v2/banktransactions', {
        bankAccountId: 'bank-123',
        page: 2,
        pageSize: 10,
      });
    });
  });

  describe('create', () => {
    it('should create a new bank transaction', async () => {
      const createData = {
        bankAccountId: 'bank-123',
        transactionDate: '2024-02-01',
        amount: 2500,
        description: 'New transaction',
      };
      mockClient.post.mockResolvedValue({ id: 'new-btx', ...createData });

      const result = await resource.create(createData);

      expect(mockClient.post).toHaveBeenCalledWith('/v2/banktransactions', createData);
      expect(result.amount).toBe(2500);
    });
  });

  describe('update', () => {
    it('should update an existing bank transaction', async () => {
      const updateData = { description: 'Updated description' };
      mockClient.put.mockResolvedValue({ ...mockBankTransaction, ...updateData });

      const result = await resource.update('btx-123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith('/v2/banktransactions/btx-123', updateData);
      expect(result.description).toBe('Updated description');
    });
  });

  describe('delete', () => {
    it('should delete a bank transaction', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('btx-123');

      expect(mockClient.delete).toHaveBeenCalledWith('/v2/banktransactions/btx-123');
    });
  });

  describe('markAsReconciled', () => {
    it('should mark transaction as reconciled', async () => {
      const reconciledTx = { ...mockBankTransaction, isReconciled: true };
      mockClient.post.mockResolvedValue(reconciledTx);

      const result = await resource.markAsReconciled('btx-123');

      expect(mockClient.post).toHaveBeenCalledWith('/v2/banktransactions/btx-123/reconcile', {});
      expect(result.isReconciled).toBe(true);
    });
  });
});

describe('BanksResource', () => {
  let resource: BanksResource;
  let mockClient: ReturnType<typeof createMockClient>;

  const mockBank = {
    id: 'bank-ref-123',
    name: 'Nordea',
    bic: 'NDEASESS',
    countryCode: 'SE',
  };

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new BanksResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all banks', async () => {
      const response = createPaginatedResponse([mockBank]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/banks', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('get', () => {
    it('should fetch a single bank by ID', async () => {
      mockClient.get.mockResolvedValue(mockBank);

      const result = await resource.get('bank-ref-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/banks/bank-ref-123');
      expect(result).toEqual(mockBank);
    });
  });
});
