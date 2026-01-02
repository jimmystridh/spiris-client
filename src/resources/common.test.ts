import { describe, it, expect, beforeEach } from 'vitest';
import {
  PaymentTermsResource,
  VatRatesResource,
  FiscalYearsResource,
  AccountsResource,
  VouchersResource,
} from './common';
import {
  createMockClient,
  createPaginatedResponse,
  mockPaymentTerm,
  mockVatRate,
  mockFiscalYear,
  mockAccount,
  mockVoucher,
} from '../test-utils';

describe('PaymentTermsResource', () => {
  let resource: PaymentTermsResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new PaymentTermsResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all payment terms', async () => {
      const response = createPaginatedResponse([mockPaymentTerm]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/paymentterms', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('get', () => {
    it('should fetch a single payment term by ID', async () => {
      mockClient.get.mockResolvedValue(mockPaymentTerm);

      const result = await resource.get('pt-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/paymentterms/pt-123');
      expect(result).toEqual(mockPaymentTerm);
    });
  });

  describe('create', () => {
    it('should create a new payment term', async () => {
      const createData = { name: 'Net 60', numberOfDays: 60 };
      mockClient.post.mockResolvedValue({ id: 'new-pt', ...createData });

      const result = await resource.create(createData);

      expect(mockClient.post).toHaveBeenCalledWith('/v2/paymentterms', createData);
      expect(result.name).toBe('Net 60');
    });
  });

  describe('update', () => {
    it('should update an existing payment term', async () => {
      const updateData = { numberOfDays: 45 };
      mockClient.put.mockResolvedValue({ ...mockPaymentTerm, ...updateData });

      const result = await resource.update('pt-123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith('/v2/paymentterms/pt-123', updateData);
      expect(result.numberOfDays).toBe(45);
    });
  });

  describe('delete', () => {
    it('should delete a payment term', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('pt-123');

      expect(mockClient.delete).toHaveBeenCalledWith('/v2/paymentterms/pt-123');
    });
  });
});

describe('VatRatesResource', () => {
  let resource: VatRatesResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new VatRatesResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all VAT rates', async () => {
      const response = createPaginatedResponse([mockVatRate]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/vatrates', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('get', () => {
    it('should fetch a single VAT rate by ID', async () => {
      mockClient.get.mockResolvedValue(mockVatRate);

      const result = await resource.get('vat-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/vatrates/vat-123');
      expect(result).toEqual(mockVatRate);
    });
  });
});

describe('FiscalYearsResource', () => {
  let resource: FiscalYearsResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new FiscalYearsResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all fiscal years', async () => {
      const response = createPaginatedResponse([mockFiscalYear]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/fiscalyears', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('get', () => {
    it('should fetch a single fiscal year by ID', async () => {
      mockClient.get.mockResolvedValue(mockFiscalYear);

      const result = await resource.get('fy-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/fiscalyears/fy-123');
      expect(result).toEqual(mockFiscalYear);
    });
  });

  describe('getCurrent', () => {
    it('should fetch the current fiscal year', async () => {
      mockClient.get.mockResolvedValue(mockFiscalYear);

      const result = await resource.getCurrent();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/fiscalyears/current');
      expect(result).toEqual(mockFiscalYear);
    });
  });
});

describe('AccountsResource', () => {
  let resource: AccountsResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new AccountsResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all accounts', async () => {
      const response = createPaginatedResponse([mockAccount]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/accounts', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('get', () => {
    it('should fetch a single account by ID', async () => {
      mockClient.get.mockResolvedValue(mockAccount);

      const result = await resource.get('acc-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/accounts/acc-123');
      expect(result).toEqual(mockAccount);
    });
  });

  describe('create', () => {
    it('should create a new account', async () => {
      const createData = { number: '2910', name: 'Skuld' };
      mockClient.post.mockResolvedValue({ id: 'new-acc', ...createData });

      const result = await resource.create(createData);

      expect(mockClient.post).toHaveBeenCalledWith('/v2/accounts', createData);
      expect(result.number).toBe('2910');
    });
  });

  describe('update', () => {
    it('should update an existing account', async () => {
      const updateData = { name: 'Updated Kassa' };
      mockClient.put.mockResolvedValue({ ...mockAccount, ...updateData });

      const result = await resource.update('acc-123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith('/v2/accounts/acc-123', updateData);
      expect(result.name).toBe('Updated Kassa');
    });
  });

  describe('delete', () => {
    it('should delete an account', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('acc-123');

      expect(mockClient.delete).toHaveBeenCalledWith('/v2/accounts/acc-123');
    });
  });
});

describe('VouchersResource', () => {
  let resource: VouchersResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new VouchersResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all vouchers', async () => {
      const response = createPaginatedResponse([mockVoucher]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/vouchers', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('get', () => {
    it('should fetch a single voucher by ID', async () => {
      mockClient.get.mockResolvedValue(mockVoucher);

      const result = await resource.get('vouch-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/vouchers/vouch-123');
      expect(result).toEqual(mockVoucher);
    });
  });

  describe('create', () => {
    it('should create a new voucher', async () => {
      const createData = {
        voucherDate: '2024-02-01',
        voucherText: 'New voucher',
        voucherRows: [
          { accountNumber: '4010', debitAmount: 500 },
          { accountNumber: '1910', creditAmount: 500 },
        ],
      };
      mockClient.post.mockResolvedValue({ id: 'new-vouch', ...createData });

      const result = await resource.create(createData);

      expect(mockClient.post).toHaveBeenCalledWith('/v2/vouchers', createData);
      expect(result.voucherText).toBe('New voucher');
    });
  });

  describe('update', () => {
    it('should update an existing voucher', async () => {
      const updateData = { voucherText: 'Updated text' };
      mockClient.put.mockResolvedValue({ ...mockVoucher, ...updateData });

      const result = await resource.update('vouch-123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith('/v2/vouchers/vouch-123', updateData);
      expect(result.voucherText).toBe('Updated text');
    });
  });

  describe('delete', () => {
    it('should delete a voucher', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('vouch-123');

      expect(mockClient.delete).toHaveBeenCalledWith('/v2/vouchers/vouch-123');
    });
  });
});
