import { describe, it, expect, beforeEach } from 'vitest';
import { CustomersResource } from './customers';
import {
  createMockClient,
  createPaginatedResponse,
  mockCustomer,
} from '../test-utils';

describe('CustomersResource', () => {
  let resource: CustomersResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new CustomersResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all customers', async () => {
      const response = createPaginatedResponse([mockCustomer]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/customers', undefined);
      expect(result).toEqual(response);
    });

    it('should pass pagination params', async () => {
      const response = createPaginatedResponse([mockCustomer]);
      mockClient.get.mockResolvedValue(response);

      await resource.getAll({ page: 2, pageSize: 20 });

      expect(mockClient.get).toHaveBeenCalledWith('/v2/customers', {
        page: 2,
        pageSize: 20,
      });
    });
  });

  describe('get', () => {
    it('should fetch a single customer by ID', async () => {
      mockClient.get.mockResolvedValue(mockCustomer);

      const result = await resource.get('cust-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/customers/cust-123');
      expect(result).toEqual(mockCustomer);
    });
  });

  describe('create', () => {
    it('should create a new customer', async () => {
      const createData = {
        name: 'New Customer',
        emailAddress: 'new@example.com',
        invoiceCity: 'Stockholm',
        invoiceCountryCode: 'SE',
      };
      mockClient.post.mockResolvedValue({ id: 'new-123', ...createData });

      const result = await resource.create(createData);

      expect(mockClient.post).toHaveBeenCalledWith('/v2/customers', createData);
      expect(result.id).toBe('new-123');
      expect(result.name).toBe('New Customer');
    });
  });

  describe('update', () => {
    it('should update an existing customer', async () => {
      const updateData = { name: 'Updated Name' };
      mockClient.put.mockResolvedValue({ ...mockCustomer, ...updateData });

      const result = await resource.update('cust-123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith(
        '/v2/customers/cust-123',
        updateData
      );
      expect(result.name).toBe('Updated Name');
    });
  });

  describe('delete', () => {
    it('should delete a customer', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('cust-123');

      expect(mockClient.delete).toHaveBeenCalledWith('/v2/customers/cust-123');
    });
  });

  describe('search', () => {
    it('should search customers by query', async () => {
      const response = createPaginatedResponse([mockCustomer]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.search('Test');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/customers', {
        name: 'Test',
      });
      expect(result).toEqual(response);
    });

    it('should pass pagination params with search', async () => {
      const response = createPaginatedResponse([mockCustomer]);
      mockClient.get.mockResolvedValue(response);

      await resource.search('Test', { page: 2, pageSize: 10 });

      expect(mockClient.get).toHaveBeenCalledWith('/v2/customers', {
        name: 'Test',
        page: 2,
        pageSize: 10,
      });
    });
  });
});
