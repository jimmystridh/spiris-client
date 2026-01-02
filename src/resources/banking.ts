import { VismaEAccountingClient } from '../client';
import {
  BankAccount,
  BankTransaction,
  Bank,
  PaginationParams,
  PaginatedResponse,
} from '../types';

export class BankAccountsResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get all bank accounts with optional pagination
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<BankAccount>> {
    return this.client.get<PaginatedResponse<BankAccount>>('/v2/bankaccounts', params);
  }

  /**
   * Get a single bank account by ID
   */
  async get(id: string): Promise<BankAccount> {
    return this.client.get<BankAccount>(`/v2/bankaccounts/${id}`);
  }

  /**
   * Create a new bank account
   */
  async create(data: Partial<BankAccount>): Promise<BankAccount> {
    return this.client.post<BankAccount>('/v2/bankaccounts', data);
  }

  /**
   * Update an existing bank account
   */
  async update(id: string, data: Partial<BankAccount>): Promise<BankAccount> {
    return this.client.put<BankAccount>(`/v2/bankaccounts/${id}`, data);
  }

  /**
   * Delete a bank account
   */
  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`/v2/bankaccounts/${id}`);
  }
}

export class BankTransactionsResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get all bank transactions with optional pagination
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<BankTransaction>> {
    return this.client.get<PaginatedResponse<BankTransaction>>('/v2/banktransactions', params);
  }

  /**
   * Get a single bank transaction by ID
   */
  async get(id: string): Promise<BankTransaction> {
    return this.client.get<BankTransaction>(`/v2/banktransactions/${id}`);
  }

  /**
   * Get transactions for a specific bank account
   */
  async getByBankAccount(
    bankAccountId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<BankTransaction>> {
    return this.client.get<PaginatedResponse<BankTransaction>>('/v2/banktransactions', {
      ...params,
      bankAccountId,
    });
  }

  /**
   * Create a new bank transaction
   */
  async create(data: Partial<BankTransaction>): Promise<BankTransaction> {
    return this.client.post<BankTransaction>('/v2/banktransactions', data);
  }

  /**
   * Update an existing bank transaction
   */
  async update(id: string, data: Partial<BankTransaction>): Promise<BankTransaction> {
    return this.client.put<BankTransaction>(`/v2/banktransactions/${id}`, data);
  }

  /**
   * Delete a bank transaction
   */
  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`/v2/banktransactions/${id}`);
  }

  /**
   * Mark transaction as reconciled
   */
  async markAsReconciled(id: string): Promise<BankTransaction> {
    return this.client.post<BankTransaction>(`/v2/banktransactions/${id}/reconcile`, {});
  }
}

export class BanksResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get all banks (reference data)
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Bank>> {
    return this.client.get<PaginatedResponse<Bank>>('/v2/banks', params);
  }

  /**
   * Get a single bank by ID
   */
  async get(id: string): Promise<Bank> {
    return this.client.get<Bank>(`/v2/banks/${id}`);
  }
}
