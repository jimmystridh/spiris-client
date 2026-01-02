import { describe, it, expect, beforeEach } from 'vitest';
import {
  AccountBalancesResource,
  AccountTypesResource,
  CompanySettingsResource,
  CountriesResource,
  CurrenciesResource,
  AllocationPeriodsResource,
} from './reference';
import {
  createMockClient,
  createPaginatedResponse,
  mockCompanySettings,
  mockCountry,
  mockCurrency,
} from '../test-utils';

describe('AccountBalancesResource', () => {
  let resource: AccountBalancesResource;
  let mockClient: ReturnType<typeof createMockClient>;

  const mockBalance = {
    accountNumber: '1910',
    accountName: 'Kassa',
    balance: 50000,
    openingBalance: 10000,
    closingBalance: 50000,
  };

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new AccountBalancesResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all account balances', async () => {
      const response = createPaginatedResponse([mockBalance]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/accountbalances', undefined);
      expect(result).toEqual(response);
    });

    it('should pass fiscal year and date filters', async () => {
      const response = createPaginatedResponse([mockBalance]);
      mockClient.get.mockResolvedValue(response);

      await resource.getAll({
        fiscalYearId: 'fy-123',
        fromDate: '2024-01-01',
        toDate: '2024-12-31',
      });

      expect(mockClient.get).toHaveBeenCalledWith('/v2/accountbalances', {
        fiscalYearId: 'fy-123',
        fromDate: '2024-01-01',
        toDate: '2024-12-31',
      });
    });
  });

  describe('getByAccountNumber', () => {
    it('should fetch balance for a specific account', async () => {
      mockClient.get.mockResolvedValue(mockBalance);

      const result = await resource.getByAccountNumber('1910');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/accountbalances/1910', {
        fiscalYearId: undefined,
      });
      expect(result).toEqual(mockBalance);
    });

    it('should pass fiscal year ID', async () => {
      mockClient.get.mockResolvedValue(mockBalance);

      await resource.getByAccountNumber('1910', 'fy-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/accountbalances/1910', {
        fiscalYearId: 'fy-123',
      });
    });
  });
});

describe('AccountTypesResource', () => {
  let resource: AccountTypesResource;
  let mockClient: ReturnType<typeof createMockClient>;

  const mockAccountType = {
    id: 'at-123',
    name: 'Tillgångar',
    nameEnglish: 'Assets',
    isActive: true,
  };

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new AccountTypesResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all account types', async () => {
      const response = createPaginatedResponse([mockAccountType]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/accounttypes', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('get', () => {
    it('should fetch a single account type by ID', async () => {
      mockClient.get.mockResolvedValue(mockAccountType);

      const result = await resource.get('at-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/accounttypes/at-123');
      expect(result).toEqual(mockAccountType);
    });
  });
});

describe('CompanySettingsResource', () => {
  let resource: CompanySettingsResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new CompanySettingsResource(mockClient);
  });

  describe('get', () => {
    it('should fetch company settings', async () => {
      mockClient.get.mockResolvedValue(mockCompanySettings);

      const result = await resource.get();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/companysettings');
      expect(result).toEqual(mockCompanySettings);
    });
  });

  describe('update', () => {
    it('should update company settings', async () => {
      const updateData = { companyName: 'Updated Company AB' };
      mockClient.put.mockResolvedValue({ ...mockCompanySettings, ...updateData });

      const result = await resource.update(updateData);

      expect(mockClient.put).toHaveBeenCalledWith('/v2/companysettings', updateData);
      expect(result.companyName).toBe('Updated Company AB');
    });
  });
});

describe('CountriesResource', () => {
  let resource: CountriesResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new CountriesResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all countries', async () => {
      const response = createPaginatedResponse([mockCountry]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/countries', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('get', () => {
    it('should fetch a country by code', async () => {
      mockClient.get.mockResolvedValue(mockCountry);

      const result = await resource.get('SE');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/countries/SE');
      expect(result).toEqual(mockCountry);
    });
  });
});

describe('CurrenciesResource', () => {
  let resource: CurrenciesResource;
  let mockClient: ReturnType<typeof createMockClient>;

  const mockExchangeRate = {
    currencyCode: 'USD',
    rate: 10.5,
    date: '2024-01-15',
  };

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new CurrenciesResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all currencies', async () => {
      const response = createPaginatedResponse([mockCurrency]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/currencies', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('get', () => {
    it('should fetch a currency by code', async () => {
      mockClient.get.mockResolvedValue(mockCurrency);

      const result = await resource.get('SEK');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/currencies/SEK');
      expect(result).toEqual(mockCurrency);
    });
  });

  describe('getExchangeRate', () => {
    it('should fetch exchange rate for a currency', async () => {
      mockClient.get.mockResolvedValue(mockExchangeRate);

      const result = await resource.getExchangeRate('USD');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/currencies/USD/exchangerate', {
        date: undefined,
      });
      expect(result).toEqual(mockExchangeRate);
    });

    it('should pass date parameter', async () => {
      mockClient.get.mockResolvedValue(mockExchangeRate);

      await resource.getExchangeRate('USD', '2024-01-15');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/currencies/USD/exchangerate', {
        date: '2024-01-15',
      });
    });
  });

  describe('getExchangeRates', () => {
    it('should fetch exchange rates for all currencies', async () => {
      const rates = [mockExchangeRate];
      mockClient.get.mockResolvedValue({ data: rates });

      const result = await resource.getExchangeRates();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/currencies/exchangerates', {
        date: undefined,
      });
      expect(result).toEqual(rates);
    });

    it('should pass date parameter', async () => {
      const rates = [mockExchangeRate];
      mockClient.get.mockResolvedValue({ data: rates });

      await resource.getExchangeRates('2024-01-15');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/currencies/exchangerates', {
        date: '2024-01-15',
      });
    });
  });
});

describe('AllocationPeriodsResource', () => {
  let resource: AllocationPeriodsResource;
  let mockClient: ReturnType<typeof createMockClient>;

  const mockPeriod = {
    id: 'period-123',
    name: 'Q1 2024',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    isActive: true,
  };

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new AllocationPeriodsResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all allocation periods', async () => {
      const response = createPaginatedResponse([mockPeriod]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/allocationperiods', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('get', () => {
    it('should fetch a single allocation period by ID', async () => {
      mockClient.get.mockResolvedValue(mockPeriod);

      const result = await resource.get('period-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/allocationperiods/period-123');
      expect(result).toEqual(mockPeriod);
    });
  });

  describe('create', () => {
    it('should create a new allocation period', async () => {
      const createData = {
        name: 'Q2 2024',
        startDate: '2024-04-01',
        endDate: '2024-06-30',
      };
      mockClient.post.mockResolvedValue({ id: 'new-period', ...createData });

      const result = await resource.create(createData);

      expect(mockClient.post).toHaveBeenCalledWith('/v2/allocationperiods', createData);
      expect(result.name).toBe('Q2 2024');
    });
  });

  describe('update', () => {
    it('should update an existing allocation period', async () => {
      const updateData = { name: 'Updated Q1' };
      mockClient.put.mockResolvedValue({ ...mockPeriod, ...updateData });

      const result = await resource.update('period-123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith('/v2/allocationperiods/period-123', updateData);
      expect(result.name).toBe('Updated Q1');
    });
  });

  describe('delete', () => {
    it('should delete an allocation period', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('period-123');

      expect(mockClient.delete).toHaveBeenCalledWith('/v2/allocationperiods/period-123');
    });
  });
});
