import { describe, it, expect, beforeEach } from 'vitest';
import { InvoicesResource, InvoiceDraftsResource } from './invoices';
import {
  createMockClient,
  createPaginatedResponse,
  mockInvoice,
  mockInvoiceDraft,
} from '../test-utils';

describe('InvoicesResource', () => {
  let resource: InvoicesResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new InvoicesResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all invoices', async () => {
      const response = createPaginatedResponse([mockInvoice]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith(
        '/v2/customerinvoices',
        undefined
      );
      expect(result).toEqual(response);
    });

    it('should pass pagination params', async () => {
      const response = createPaginatedResponse([mockInvoice]);
      mockClient.get.mockResolvedValue(response);

      await resource.getAll({ page: 2, pageSize: 20 });

      expect(mockClient.get).toHaveBeenCalledWith('/v2/customerinvoices', {
        page: 2,
        pageSize: 20,
      });
    });
  });

  describe('get', () => {
    it('should fetch a single invoice by ID', async () => {
      mockClient.get.mockResolvedValue(mockInvoice);

      const result = await resource.get('inv-123');

      expect(mockClient.get).toHaveBeenCalledWith(
        '/v2/customerinvoices/inv-123'
      );
      expect(result).toEqual(mockInvoice);
    });
  });

  describe('create', () => {
    it('should create a new invoice', async () => {
      const createData = {
        customerId: 'cust-123',
        invoiceDate: '2024-01-15',
        dueDate: '2024-02-15',
        invoiceRows: [
          {
            articleId: 'art-123',
            quantity: 2,
            unitPrice: 100,
          },
        ],
      };
      mockClient.post.mockResolvedValue({ id: 'new-123', ...createData });

      const result = await resource.create(createData);

      expect(mockClient.post).toHaveBeenCalledWith(
        '/v2/customerinvoices',
        createData
      );
      expect(result.id).toBe('new-123');
    });
  });

  describe('update', () => {
    it('should update an existing invoice', async () => {
      const updateData = { ourReference: 'Updated Ref' };
      mockClient.put.mockResolvedValue({ ...mockInvoice, ...updateData });

      const result = await resource.update('inv-123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith(
        '/v2/customerinvoices/inv-123',
        updateData
      );
      expect(result.ourReference).toBe('Updated Ref');
    });
  });

  describe('delete', () => {
    it('should delete an invoice', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('inv-123');

      expect(mockClient.delete).toHaveBeenCalledWith(
        '/v2/customerinvoices/inv-123'
      );
    });
  });

  describe('getPdf', () => {
    it('should fetch invoice PDF', async () => {
      const mockBlob = new Blob(['pdf content']);
      mockClient.get.mockResolvedValue(mockBlob);

      const result = await resource.getPdf('inv-123');

      expect(mockClient.get).toHaveBeenCalledWith(
        '/v2/customerinvoices/inv-123/pdf'
      );
      expect(result).toEqual(mockBlob);
    });
  });

  describe('sendEmail', () => {
    it('should send invoice via email', async () => {
      mockClient.post.mockResolvedValue(undefined);

      await resource.sendEmail('inv-123', 'customer@example.com');

      expect(mockClient.post).toHaveBeenCalledWith(
        '/v2/customerinvoices/inv-123/send',
        { emailAddress: 'customer@example.com' }
      );
    });

    it('should send email without specifying address', async () => {
      mockClient.post.mockResolvedValue(undefined);

      await resource.sendEmail('inv-123');

      expect(mockClient.post).toHaveBeenCalledWith(
        '/v2/customerinvoices/inv-123/send',
        { emailAddress: undefined }
      );
    });
  });

  describe('markAsPaid', () => {
    it('should mark invoice as paid', async () => {
      const paidInvoice = { ...mockInvoice, isPaid: true };
      mockClient.post.mockResolvedValue(paidInvoice);

      const result = await resource.markAsPaid('inv-123', '2024-02-10', 200);

      expect(mockClient.post).toHaveBeenCalledWith(
        '/v2/customerinvoices/inv-123/payment',
        { paymentDate: '2024-02-10', amount: 200 }
      );
      expect(result.isPaid).toBe(true);
    });
  });

  describe('createCredit', () => {
    it('should create credit invoice', async () => {
      const creditInvoice = { ...mockInvoice, isCreditInvoice: true };
      mockClient.post.mockResolvedValue(creditInvoice);

      const result = await resource.createCredit('inv-123');

      expect(mockClient.post).toHaveBeenCalledWith(
        '/v2/customerinvoices/inv-123/credit',
        {}
      );
      expect(result.isCreditInvoice).toBe(true);
    });
  });
});

describe('InvoiceDraftsResource', () => {
  let resource: InvoiceDraftsResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new InvoiceDraftsResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all invoice drafts', async () => {
      const response = createPaginatedResponse([mockInvoiceDraft]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith(
        '/v2/customerinvoicedrafts',
        undefined
      );
      expect(result).toEqual(response);
    });
  });

  describe('get', () => {
    it('should fetch a single draft by ID', async () => {
      mockClient.get.mockResolvedValue(mockInvoiceDraft);

      const result = await resource.get('draft-123');

      expect(mockClient.get).toHaveBeenCalledWith(
        '/v2/customerinvoicedrafts/draft-123'
      );
      expect(result).toEqual(mockInvoiceDraft);
    });
  });

  describe('create', () => {
    it('should create a new draft', async () => {
      const createData = {
        customerId: 'cust-123',
        invoiceDate: '2024-01-15',
        dueDate: '2024-02-15',
        invoiceRows: [],
      };
      mockClient.post.mockResolvedValue({
        id: 'new-draft',
        isDraft: true,
        ...createData,
      });

      const result = await resource.create(createData);

      expect(mockClient.post).toHaveBeenCalledWith(
        '/v2/customerinvoicedrafts',
        createData
      );
      expect(result.isDraft).toBe(true);
    });
  });

  describe('update', () => {
    it('should update an existing draft', async () => {
      const updateData = { ourReference: 'Draft Ref' };
      mockClient.put.mockResolvedValue({ ...mockInvoiceDraft, ...updateData });

      const result = await resource.update('draft-123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith(
        '/v2/customerinvoicedrafts/draft-123',
        updateData
      );
      expect(result.ourReference).toBe('Draft Ref');
    });
  });

  describe('delete', () => {
    it('should delete a draft', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('draft-123');

      expect(mockClient.delete).toHaveBeenCalledWith(
        '/v2/customerinvoicedrafts/draft-123'
      );
    });
  });

  describe('convertToInvoice', () => {
    it('should convert draft to invoice', async () => {
      mockClient.post.mockResolvedValue(mockInvoice);

      const result = await resource.convertToInvoice('draft-123');

      expect(mockClient.post).toHaveBeenCalledWith(
        '/v2/customerinvoicedrafts/draft-123/convert',
        {}
      );
      expect(result).toEqual(mockInvoice);
    });
  });
});
