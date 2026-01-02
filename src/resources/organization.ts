import { VismaEAccountingClient } from '../client';
import {
  CostCenter,
  CostCenterItem,
  CustomerLabel,
  ArticleLabel,
  CustomerLedgerItem,
  ArticleAccountCoding,
  PaginationParams,
  PaginatedResponse,
} from '../types';

export class CostCentersResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get all cost centers with optional pagination
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<CostCenter>> {
    return this.client.get<PaginatedResponse<CostCenter>>('/v2/costcenters', params);
  }

  /**
   * Get a single cost center by ID
   */
  async get(id: string): Promise<CostCenter> {
    return this.client.get<CostCenter>(`/v2/costcenters/${id}`);
  }

  /**
   * Create a new cost center
   */
  async create(data: Partial<CostCenter>): Promise<CostCenter> {
    return this.client.post<CostCenter>('/v2/costcenters', data);
  }

  /**
   * Update an existing cost center
   */
  async update(id: string, data: Partial<CostCenter>): Promise<CostCenter> {
    return this.client.put<CostCenter>(`/v2/costcenters/${id}`, data);
  }

  /**
   * Delete a cost center
   */
  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`/v2/costcenters/${id}`);
  }
}

export class CostCenterItemsResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get all cost center items with optional pagination
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<CostCenterItem>> {
    return this.client.get<PaginatedResponse<CostCenterItem>>('/v2/costcenteritems', params);
  }

  /**
   * Get cost center items by cost center ID
   */
  async getByCostCenter(
    costCenterId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<CostCenterItem>> {
    return this.client.get<PaginatedResponse<CostCenterItem>>('/v2/costcenteritems', {
      ...params,
      costCenterId,
    });
  }

  /**
   * Get a single cost center item by ID
   */
  async get(id: string): Promise<CostCenterItem> {
    return this.client.get<CostCenterItem>(`/v2/costcenteritems/${id}`);
  }

  /**
   * Create a new cost center item
   */
  async create(data: Partial<CostCenterItem>): Promise<CostCenterItem> {
    return this.client.post<CostCenterItem>('/v2/costcenteritems', data);
  }

  /**
   * Update an existing cost center item
   */
  async update(id: string, data: Partial<CostCenterItem>): Promise<CostCenterItem> {
    return this.client.put<CostCenterItem>(`/v2/costcenteritems/${id}`, data);
  }

  /**
   * Delete a cost center item
   */
  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`/v2/costcenteritems/${id}`);
  }
}

export class CustomerLabelsResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get all customer labels
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<CustomerLabel>> {
    return this.client.get<PaginatedResponse<CustomerLabel>>('/v2/customerlabels', params);
  }

  /**
   * Get a single customer label by ID
   */
  async get(id: string): Promise<CustomerLabel> {
    return this.client.get<CustomerLabel>(`/v2/customerlabels/${id}`);
  }

  /**
   * Create a new customer label
   */
  async create(data: Partial<CustomerLabel>): Promise<CustomerLabel> {
    return this.client.post<CustomerLabel>('/v2/customerlabels', data);
  }

  /**
   * Update an existing customer label
   */
  async update(id: string, data: Partial<CustomerLabel>): Promise<CustomerLabel> {
    return this.client.put<CustomerLabel>(`/v2/customerlabels/${id}`, data);
  }

  /**
   * Delete a customer label
   */
  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`/v2/customerlabels/${id}`);
  }
}

export class ArticleLabelsResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get all article labels
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<ArticleLabel>> {
    return this.client.get<PaginatedResponse<ArticleLabel>>('/v2/articlelabels', params);
  }

  /**
   * Get a single article label by ID
   */
  async get(id: string): Promise<ArticleLabel> {
    return this.client.get<ArticleLabel>(`/v2/articlelabels/${id}`);
  }

  /**
   * Create a new article label
   */
  async create(data: Partial<ArticleLabel>): Promise<ArticleLabel> {
    return this.client.post<ArticleLabel>('/v2/articlelabels', data);
  }

  /**
   * Update an existing article label
   */
  async update(id: string, data: Partial<ArticleLabel>): Promise<ArticleLabel> {
    return this.client.put<ArticleLabel>(`/v2/articlelabels/${id}`, data);
  }

  /**
   * Delete an article label
   */
  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`/v2/articlelabels/${id}`);
  }
}

export class CustomerLedgerItemsResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get all customer ledger items
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<CustomerLedgerItem>> {
    return this.client.get<PaginatedResponse<CustomerLedgerItem>>('/v2/customerledgeritems', params);
  }

  /**
   * Get ledger items for a specific customer
   */
  async getByCustomer(
    customerId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<CustomerLedgerItem>> {
    return this.client.get<PaginatedResponse<CustomerLedgerItem>>('/v2/customerledgeritems', {
      ...params,
      customerId,
    });
  }

  /**
   * Get a single customer ledger item by ID
   */
  async get(id: string): Promise<CustomerLedgerItem> {
    return this.client.get<CustomerLedgerItem>(`/v2/customerledgeritems/${id}`);
  }
}

export class ArticleAccountCodingsResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get all article account codings
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<ArticleAccountCoding>> {
    return this.client.get<PaginatedResponse<ArticleAccountCoding>>('/v2/articleaccountcodings', params);
  }

  /**
   * Get account coding for a specific article
   */
  async getByArticle(articleId: string): Promise<ArticleAccountCoding> {
    return this.client.get<ArticleAccountCoding>(`/v2/articleaccountcodings/${articleId}`);
  }

  /**
   * Create or update article account coding
   */
  async upsert(data: ArticleAccountCoding): Promise<ArticleAccountCoding> {
    return this.client.post<ArticleAccountCoding>('/v2/articleaccountcodings', data);
  }

  /**
   * Delete article account coding
   */
  async delete(articleId: string): Promise<void> {
    return this.client.delete<void>(`/v2/articleaccountcodings/${articleId}`);
  }
}
