import { describe, it, expect, beforeEach } from 'vitest';
import { SuppliersResource, SupplierInvoicesResource } from './suppliers';
import {
  createMockClient,
  createPaginatedResponse,
  mockSupplier,
  mockSupplierInvoice,
} from '../test-utils';

describe('SuppliersResource', () => {
  let resource: SuppliersResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new SuppliersResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all suppliers', async () => {
      const response = createPaginatedResponse([mockSupplier]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/suppliers', undefined);
      expect(result).toEqual(response);
    });

    it('should pass pagination params', async () => {
      const response = createPaginatedResponse([mockSupplier]);
      mockClient.get.mockResolvedValue(response);

      await resource.getAll({ page: 2, pageSize: 20 });

      expect(mockClient.get).toHaveBeenCalledWith('/v2/suppliers', {
        page: 2,
        pageSize: 20,
      });
    });
  });

  describe('get', () => {
    it('should fetch a single supplier by ID', async () => {
      mockClient.get.mockResolvedValue(mockSupplier);

      const result = await resource.get('sup-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/suppliers/sup-123');
      expect(result).toEqual(mockSupplier);
    });
  });

  describe('create', () => {
    it('should create a new supplier', async () => {
      const createData = {
        name: 'New Supplier',
        emailAddress: 'supplier@example.com',
        city: 'Malmö',
        countryCode: 'SE',
      };
      mockClient.post.mockResolvedValue({ id: 'new-123', ...createData });

      const result = await resource.create(createData);

      expect(mockClient.post).toHaveBeenCalledWith('/v2/suppliers', createData);
      expect(result.id).toBe('new-123');
      expect(result.name).toBe('New Supplier');
    });
  });

  describe('update', () => {
    it('should update an existing supplier', async () => {
      const updateData = { name: 'Updated Supplier' };
      mockClient.put.mockResolvedValue({ ...mockSupplier, ...updateData });

      const result = await resource.update('sup-123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith(
        '/v2/suppliers/sup-123',
        updateData
      );
      expect(result.name).toBe('Updated Supplier');
    });
  });

  describe('delete', () => {
    it('should delete a supplier', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('sup-123');

      expect(mockClient.delete).toHaveBeenCalledWith('/v2/suppliers/sup-123');
    });
  });

  describe('search', () => {
    it('should search suppliers by query', async () => {
      const response = createPaginatedResponse([mockSupplier]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.search('Test');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/suppliers', {
        name: 'Test',
      });
      expect(result).toEqual(response);
    });
  });
});

describe('SupplierInvoicesResource', () => {
  let resource: SupplierInvoicesResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new SupplierInvoicesResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all supplier invoices', async () => {
      const response = createPaginatedResponse([mockSupplierInvoice]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith(
        '/v2/supplierinvoices',
        undefined
      );
      expect(result).toEqual(response);
    });
  });

  describe('get', () => {
    it('should fetch a single supplier invoice by ID', async () => {
      mockClient.get.mockResolvedValue(mockSupplierInvoice);

      const result = await resource.get('sinv-123');

      expect(mockClient.get).toHaveBeenCalledWith(
        '/v2/supplierinvoices/sinv-123'
      );
      expect(result).toEqual(mockSupplierInvoice);
    });
  });

  describe('create', () => {
    it('should create a new supplier invoice', async () => {
      const createData = {
        supplierId: 'sup-123',
        invoiceNumber: 'INV-002',
        invoiceDate: '2024-01-20',
        dueDate: '2024-02-20',
        totalAmount: 3000,
      };
      mockClient.post.mockResolvedValue({ id: 'new-sinv', ...createData });

      const result = await resource.create(createData);

      expect(mockClient.post).toHaveBeenCalledWith(
        '/v2/supplierinvoices',
        createData
      );
      expect(result.id).toBe('new-sinv');
    });
  });

  describe('update', () => {
    it('should update an existing supplier invoice', async () => {
      const updateData = { totalAmount: 6000 };
      mockClient.put.mockResolvedValue({
        ...mockSupplierInvoice,
        ...updateData,
      });

      const result = await resource.update('sinv-123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith(
        '/v2/supplierinvoices/sinv-123',
        updateData
      );
      expect(result.totalAmount).toBe(6000);
    });
  });

  describe('delete', () => {
    it('should delete a supplier invoice', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('sinv-123');

      expect(mockClient.delete).toHaveBeenCalledWith(
        '/v2/supplierinvoices/sinv-123'
      );
    });
  });

  describe('markAsPaid', () => {
    it('should mark supplier invoice as paid', async () => {
      const paidInvoice = { ...mockSupplierInvoice, isPaid: true };
      mockClient.post.mockResolvedValue(paidInvoice);

      const result = await resource.markAsPaid('sinv-123', '2024-02-15', 5000);

      expect(mockClient.post).toHaveBeenCalledWith(
        '/v2/supplierinvoices/sinv-123/payment',
        { paymentDate: '2024-02-15', amount: 5000 }
      );
      expect(result.isPaid).toBe(true);
    });
  });
});
