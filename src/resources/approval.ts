import { VismaEAccountingClient } from '../client';
import {
  VatReportApproval,
  SupplierInvoiceApproval,
  PaginationParams,
  PaginatedResponse,
} from '../types';

export class VatReportApprovalResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get all VAT report approvals
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<VatReportApproval>> {
    return this.client.get<PaginatedResponse<VatReportApproval>>('/v2/approval/vatreport', params);
  }

  /**
   * Get a single VAT report approval by ID
   */
  async get(id: string): Promise<VatReportApproval> {
    return this.client.get<VatReportApproval>(`/v2/approval/vatreport/${id}`);
  }

  /**
   * Approve a VAT report
   */
  async approve(id: string): Promise<VatReportApproval> {
    return this.client.post<VatReportApproval>(`/v2/approval/vatreport/${id}/approve`, {});
  }

  /**
   * Reject a VAT report
   */
  async reject(id: string, reason?: string): Promise<VatReportApproval> {
    return this.client.post<VatReportApproval>(`/v2/approval/vatreport/${id}/reject`, {
      reason,
    });
  }
}

export class SupplierInvoiceApprovalResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get all supplier invoice approvals
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<SupplierInvoiceApproval>> {
    return this.client.get<PaginatedResponse<SupplierInvoiceApproval>>(
      '/v2/approval/supplierinvoice',
      params
    );
  }

  /**
   * Get pending approvals
   */
  async getPending(params?: PaginationParams): Promise<PaginatedResponse<SupplierInvoiceApproval>> {
    return this.client.get<PaginatedResponse<SupplierInvoiceApproval>>(
      '/v2/approval/supplierinvoice',
      { ...params, status: 'pending' }
    );
  }

  /**
   * Get a single supplier invoice approval by ID
   */
  async get(id: string): Promise<SupplierInvoiceApproval> {
    return this.client.get<SupplierInvoiceApproval>(`/v2/approval/supplierinvoice/${id}`);
  }

  /**
   * Approve a supplier invoice
   */
  async approve(id: string, comment?: string): Promise<SupplierInvoiceApproval> {
    return this.client.post<SupplierInvoiceApproval>(
      `/v2/approval/supplierinvoice/${id}/approve`,
      { comment }
    );
  }

  /**
   * Reject a supplier invoice
   */
  async reject(id: string, comment?: string): Promise<SupplierInvoiceApproval> {
    return this.client.post<SupplierInvoiceApproval>(
      `/v2/approval/supplierinvoice/${id}/reject`,
      { comment }
    );
  }

  /**
   * Request changes to a supplier invoice
   */
  async requestChanges(id: string, comment: string): Promise<SupplierInvoiceApproval> {
    return this.client.post<SupplierInvoiceApproval>(
      `/v2/approval/supplierinvoice/${id}/requestchanges`,
      { comment }
    );
  }
}
