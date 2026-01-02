import { describe, it, expect, beforeEach } from 'vitest';
import { VatReportApprovalResource, SupplierInvoiceApprovalResource } from './approval';
import {
  createMockClient,
  createPaginatedResponse,
  mockVatReportApproval,
  mockSupplierInvoiceApproval,
} from '../test-utils';

describe('VatReportApprovalResource', () => {
  let resource: VatReportApprovalResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new VatReportApprovalResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all VAT report approvals', async () => {
      const response = createPaginatedResponse([mockVatReportApproval]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/approval/vatreport', undefined);
      expect(result).toEqual(response);
    });

    it('should pass pagination params', async () => {
      const response = createPaginatedResponse([mockVatReportApproval]);
      mockClient.get.mockResolvedValue(response);

      await resource.getAll({ page: 2, pageSize: 10 });

      expect(mockClient.get).toHaveBeenCalledWith('/v2/approval/vatreport', {
        page: 2,
        pageSize: 10,
      });
    });
  });

  describe('get', () => {
    it('should fetch a single VAT report approval by ID', async () => {
      mockClient.get.mockResolvedValue(mockVatReportApproval);

      const result = await resource.get('vatapp-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/approval/vatreport/vatapp-123');
      expect(result).toEqual(mockVatReportApproval);
    });
  });

  describe('approve', () => {
    it('should approve a VAT report', async () => {
      const approvedReport = { ...mockVatReportApproval, status: 'approved' as const };
      mockClient.post.mockResolvedValue(approvedReport);

      const result = await resource.approve('vatapp-123');

      expect(mockClient.post).toHaveBeenCalledWith('/v2/approval/vatreport/vatapp-123/approve', {});
      expect(result.status).toBe('approved');
    });
  });

  describe('reject', () => {
    it('should reject a VAT report', async () => {
      const rejectedReport = { ...mockVatReportApproval, status: 'rejected' as const };
      mockClient.post.mockResolvedValue(rejectedReport);

      const result = await resource.reject('vatapp-123', 'Incorrect amounts');

      expect(mockClient.post).toHaveBeenCalledWith('/v2/approval/vatreport/vatapp-123/reject', {
        reason: 'Incorrect amounts',
      });
      expect(result.status).toBe('rejected');
    });

    it('should reject without a reason', async () => {
      const rejectedReport = { ...mockVatReportApproval, status: 'rejected' as const };
      mockClient.post.mockResolvedValue(rejectedReport);

      await resource.reject('vatapp-123');

      expect(mockClient.post).toHaveBeenCalledWith('/v2/approval/vatreport/vatapp-123/reject', {
        reason: undefined,
      });
    });
  });
});

describe('SupplierInvoiceApprovalResource', () => {
  let resource: SupplierInvoiceApprovalResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new SupplierInvoiceApprovalResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all supplier invoice approvals', async () => {
      const response = createPaginatedResponse([mockSupplierInvoiceApproval]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/approval/supplierinvoice', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('getPending', () => {
    it('should fetch pending approvals', async () => {
      const response = createPaginatedResponse([mockSupplierInvoiceApproval]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getPending();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/approval/supplierinvoice', {
        status: 'pending',
      });
      expect(result).toEqual(response);
    });

    it('should pass pagination params with pending filter', async () => {
      const response = createPaginatedResponse([mockSupplierInvoiceApproval]);
      mockClient.get.mockResolvedValue(response);

      await resource.getPending({ page: 2, pageSize: 5 });

      expect(mockClient.get).toHaveBeenCalledWith('/v2/approval/supplierinvoice', {
        page: 2,
        pageSize: 5,
        status: 'pending',
      });
    });
  });

  describe('get', () => {
    it('should fetch a single approval by ID', async () => {
      mockClient.get.mockResolvedValue(mockSupplierInvoiceApproval);

      const result = await resource.get('siapp-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/approval/supplierinvoice/siapp-123');
      expect(result).toEqual(mockSupplierInvoiceApproval);
    });
  });

  describe('approve', () => {
    it('should approve a supplier invoice', async () => {
      const approvedInvoice = { ...mockSupplierInvoiceApproval, status: 'approved' as const };
      mockClient.post.mockResolvedValue(approvedInvoice);

      const result = await resource.approve('siapp-123', 'Looks good');

      expect(mockClient.post).toHaveBeenCalledWith('/v2/approval/supplierinvoice/siapp-123/approve', {
        comment: 'Looks good',
      });
      expect(result.status).toBe('approved');
    });

    it('should approve without a comment', async () => {
      const approvedInvoice = { ...mockSupplierInvoiceApproval, status: 'approved' as const };
      mockClient.post.mockResolvedValue(approvedInvoice);

      await resource.approve('siapp-123');

      expect(mockClient.post).toHaveBeenCalledWith('/v2/approval/supplierinvoice/siapp-123/approve', {
        comment: undefined,
      });
    });
  });

  describe('reject', () => {
    it('should reject a supplier invoice', async () => {
      const rejectedInvoice = { ...mockSupplierInvoiceApproval, status: 'rejected' as const };
      mockClient.post.mockResolvedValue(rejectedInvoice);

      const result = await resource.reject('siapp-123', 'Missing documentation');

      expect(mockClient.post).toHaveBeenCalledWith('/v2/approval/supplierinvoice/siapp-123/reject', {
        comment: 'Missing documentation',
      });
      expect(result.status).toBe('rejected');
    });
  });

  describe('requestChanges', () => {
    it('should request changes on a supplier invoice', async () => {
      const pendingInvoice = { ...mockSupplierInvoiceApproval, status: 'pending' as const };
      mockClient.post.mockResolvedValue(pendingInvoice);

      const result = await resource.requestChanges('siapp-123', 'Please update amounts');

      expect(mockClient.post).toHaveBeenCalledWith('/v2/approval/supplierinvoice/siapp-123/requestchanges', {
        comment: 'Please update amounts',
      });
      expect(result).toEqual(pendingInvoice);
    });
  });
});
