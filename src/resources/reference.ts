import { VismaEAccountingClient } from '../client';
import {
  AccountBalance,
  AccountType,
  CompanySettings,
  Country,
  Currency,
  ExchangeRate,
  AllocationPeriod,
  PaginationParams,
  PaginatedResponse,
} from '../types';

export class AccountBalancesResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get account balances with optional filters
   */
  async getAll(params?: PaginationParams & {
    fiscalYearId?: string;
    fromDate?: string;
    toDate?: string;
  }): Promise<PaginatedResponse<AccountBalance>> {
    return this.client.get<PaginatedResponse<AccountBalance>>('/v2/accountbalances', params);
  }

  /**
   * Get balance for a specific account
   */
  async getByAccountNumber(
    accountNumber: string,
    fiscalYearId?: string
  ): Promise<AccountBalance> {
    return this.client.get<AccountBalance>(`/v2/accountbalances/${accountNumber}`, {
      fiscalYearId,
    });
  }
}

export class AccountTypesResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get all account types
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<AccountType>> {
    return this.client.get<PaginatedResponse<AccountType>>('/v2/accounttypes', params);
  }

  /**
   * Get a single account type by ID
   */
  async get(id: string): Promise<AccountType> {
    return this.client.get<AccountType>(`/v2/accounttypes/${id}`);
  }
}

export class CompanySettingsResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get company settings
   */
  async get(): Promise<CompanySettings> {
    return this.client.get<CompanySettings>('/v2/companysettings');
  }

  /**
   * Update company settings
   */
  async update(data: Partial<CompanySettings>): Promise<CompanySettings> {
    return this.client.put<CompanySettings>('/v2/companysettings', data);
  }
}

export class CountriesResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get all countries
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Country>> {
    return this.client.get<PaginatedResponse<Country>>('/v2/countries', params);
  }

  /**
   * Get a country by code
   */
  async get(code: string): Promise<Country> {
    return this.client.get<Country>(`/v2/countries/${code}`);
  }
}

export class CurrenciesResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get all currencies
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Currency>> {
    return this.client.get<PaginatedResponse<Currency>>('/v2/currencies', params);
  }

  /**
   * Get a currency by code
   */
  async get(code: string): Promise<Currency> {
    return this.client.get<Currency>(`/v2/currencies/${code}`);
  }

  /**
   * Get exchange rate for a currency
   */
  async getExchangeRate(currencyCode: string, date?: string): Promise<ExchangeRate> {
    return this.client.get<ExchangeRate>(`/v2/currencies/${currencyCode}/exchangerate`, {
      date,
    });
  }

  /**
   * Get exchange rates for multiple currencies
   */
  async getExchangeRates(date?: string): Promise<ExchangeRate[]> {
    const response = await this.client.get<{ data: ExchangeRate[] }>('/v2/currencies/exchangerates', {
      date,
    });
    return response.data;
  }
}

export class AllocationPeriodsResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get all allocation periods
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<AllocationPeriod>> {
    return this.client.get<PaginatedResponse<AllocationPeriod>>('/v2/allocationperiods', params);
  }

  /**
   * Get a single allocation period by ID
   */
  async get(id: string): Promise<AllocationPeriod> {
    return this.client.get<AllocationPeriod>(`/v2/allocationperiods/${id}`);
  }

  /**
   * Create a new allocation period
   */
  async create(data: Partial<AllocationPeriod>): Promise<AllocationPeriod> {
    return this.client.post<AllocationPeriod>('/v2/allocationperiods', data);
  }

  /**
   * Update an existing allocation period
   */
  async update(id: string, data: Partial<AllocationPeriod>): Promise<AllocationPeriod> {
    return this.client.put<AllocationPeriod>(`/v2/allocationperiods/${id}`, data);
  }

  /**
   * Delete an allocation period
   */
  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`/v2/allocationperiods/${id}`);
  }
}
