import { describe, it, expect, beforeEach } from 'vitest';
import {
  CostCentersResource,
  CostCenterItemsResource,
  CustomerLabelsResource,
  ArticleLabelsResource,
  CustomerLedgerItemsResource,
  ArticleAccountCodingsResource,
} from './organization';
import {
  createMockClient,
  createPaginatedResponse,
  mockCostCenter,
} from '../test-utils';

describe('CostCentersResource', () => {
  let resource: CostCentersResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new CostCentersResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all cost centers', async () => {
      const response = createPaginatedResponse([mockCostCenter]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/costcenters', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('get', () => {
    it('should fetch a single cost center by ID', async () => {
      mockClient.get.mockResolvedValue(mockCostCenter);

      const result = await resource.get('cc-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/costcenters/cc-123');
      expect(result).toEqual(mockCostCenter);
    });
  });

  describe('create', () => {
    it('should create a new cost center', async () => {
      const createData = { code: 'HR', name: 'Human Resources' };
      mockClient.post.mockResolvedValue({ id: 'new-cc', ...createData });

      const result = await resource.create(createData);

      expect(mockClient.post).toHaveBeenCalledWith('/v2/costcenters', createData);
      expect(result.code).toBe('HR');
    });
  });

  describe('update', () => {
    it('should update an existing cost center', async () => {
      const updateData = { name: 'Updated Marketing' };
      mockClient.put.mockResolvedValue({ ...mockCostCenter, ...updateData });

      const result = await resource.update('cc-123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith('/v2/costcenters/cc-123', updateData);
      expect(result.name).toBe('Updated Marketing');
    });
  });

  describe('delete', () => {
    it('should delete a cost center', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('cc-123');

      expect(mockClient.delete).toHaveBeenCalledWith('/v2/costcenters/cc-123');
    });
  });
});

describe('CostCenterItemsResource', () => {
  let resource: CostCenterItemsResource;
  let mockClient: ReturnType<typeof createMockClient>;

  const mockCostCenterItem = {
    id: 'cci-123',
    costCenterId: 'cc-123',
    accountNumber: '4010',
    amount: 1000,
  };

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new CostCenterItemsResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all cost center items', async () => {
      const response = createPaginatedResponse([mockCostCenterItem]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/costcenteritems', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('getByCostCenter', () => {
    it('should fetch items for a specific cost center', async () => {
      const response = createPaginatedResponse([mockCostCenterItem]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getByCostCenter('cc-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/costcenteritems', {
        costCenterId: 'cc-123',
      });
      expect(result).toEqual(response);
    });
  });

  describe('get', () => {
    it('should fetch a single item by ID', async () => {
      mockClient.get.mockResolvedValue(mockCostCenterItem);

      const result = await resource.get('cci-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/costcenteritems/cci-123');
      expect(result).toEqual(mockCostCenterItem);
    });
  });

  describe('create', () => {
    it('should create a new cost center item', async () => {
      const createData = {
        costCenterId: 'cc-123',
        accountNumber: '5010',
        amount: 500,
      };
      mockClient.post.mockResolvedValue({ id: 'new-cci', ...createData });

      const result = await resource.create(createData);

      expect(mockClient.post).toHaveBeenCalledWith('/v2/costcenteritems', createData);
      expect(result.amount).toBe(500);
    });
  });

  describe('update', () => {
    it('should update an existing item', async () => {
      const updateData = { amount: 1500 };
      mockClient.put.mockResolvedValue({ ...mockCostCenterItem, ...updateData });

      const result = await resource.update('cci-123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith('/v2/costcenteritems/cci-123', updateData);
      expect(result.amount).toBe(1500);
    });
  });

  describe('delete', () => {
    it('should delete a cost center item', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('cci-123');

      expect(mockClient.delete).toHaveBeenCalledWith('/v2/costcenteritems/cci-123');
    });
  });
});

describe('CustomerLabelsResource', () => {
  let resource: CustomerLabelsResource;
  let mockClient: ReturnType<typeof createMockClient>;

  const mockLabel = { id: 'label-123', name: 'VIP', isActive: true };

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new CustomerLabelsResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all customer labels', async () => {
      const response = createPaginatedResponse([mockLabel]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/customerlabels', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('get', () => {
    it('should fetch a single label by ID', async () => {
      mockClient.get.mockResolvedValue(mockLabel);

      const result = await resource.get('label-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/customerlabels/label-123');
      expect(result).toEqual(mockLabel);
    });
  });

  describe('create', () => {
    it('should create a new label', async () => {
      const createData = { name: 'Premium' };
      mockClient.post.mockResolvedValue({ id: 'new-label', ...createData });

      const result = await resource.create(createData);

      expect(mockClient.post).toHaveBeenCalledWith('/v2/customerlabels', createData);
      expect(result.name).toBe('Premium');
    });
  });

  describe('update', () => {
    it('should update an existing label', async () => {
      const updateData = { name: 'Super VIP' };
      mockClient.put.mockResolvedValue({ ...mockLabel, ...updateData });

      const result = await resource.update('label-123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith('/v2/customerlabels/label-123', updateData);
      expect(result.name).toBe('Super VIP');
    });
  });

  describe('delete', () => {
    it('should delete a label', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('label-123');

      expect(mockClient.delete).toHaveBeenCalledWith('/v2/customerlabels/label-123');
    });
  });
});

describe('ArticleLabelsResource', () => {
  let resource: ArticleLabelsResource;
  let mockClient: ReturnType<typeof createMockClient>;

  const mockLabel = { id: 'artlabel-123', name: 'Featured', isActive: true };

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new ArticleLabelsResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all article labels', async () => {
      const response = createPaginatedResponse([mockLabel]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/articlelabels', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('create', () => {
    it('should create a new article label', async () => {
      const createData = { name: 'New Arrival' };
      mockClient.post.mockResolvedValue({ id: 'new-label', ...createData });

      const result = await resource.create(createData);

      expect(mockClient.post).toHaveBeenCalledWith('/v2/articlelabels', createData);
      expect(result.name).toBe('New Arrival');
    });
  });
});

describe('CustomerLedgerItemsResource', () => {
  let resource: CustomerLedgerItemsResource;
  let mockClient: ReturnType<typeof createMockClient>;

  const mockLedgerItem = {
    id: 'ledger-123',
    customerId: 'cust-123',
    amount: 5000,
    isPaid: false,
  };

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new CustomerLedgerItemsResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all customer ledger items', async () => {
      const response = createPaginatedResponse([mockLedgerItem]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/customerledgeritems', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('getByCustomer', () => {
    it('should fetch ledger items for a specific customer', async () => {
      const response = createPaginatedResponse([mockLedgerItem]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getByCustomer('cust-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/customerledgeritems', {
        customerId: 'cust-123',
      });
      expect(result).toEqual(response);
    });
  });

  describe('get', () => {
    it('should fetch a single ledger item by ID', async () => {
      mockClient.get.mockResolvedValue(mockLedgerItem);

      const result = await resource.get('ledger-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/customerledgeritems/ledger-123');
      expect(result).toEqual(mockLedgerItem);
    });
  });
});

describe('ArticleAccountCodingsResource', () => {
  let resource: ArticleAccountCodingsResource;
  let mockClient: ReturnType<typeof createMockClient>;

  const mockCoding = {
    id: 'coding-123',
    articleId: 'art-123',
    salesAccountNumber: '3010',
    purchaseAccountNumber: '4010',
  };

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new ArticleAccountCodingsResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all article account codings', async () => {
      const response = createPaginatedResponse([mockCoding]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/articleaccountcodings', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('getByArticle', () => {
    it('should fetch coding for a specific article', async () => {
      mockClient.get.mockResolvedValue(mockCoding);

      const result = await resource.getByArticle('art-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/articleaccountcodings/art-123');
      expect(result).toEqual(mockCoding);
    });
  });

  describe('upsert', () => {
    it('should create or update article account coding', async () => {
      const codingData = {
        articleId: 'art-456',
        salesAccountNumber: '3020',
      };
      mockClient.post.mockResolvedValue({ id: 'new-coding', ...codingData });

      const result = await resource.upsert(codingData);

      expect(mockClient.post).toHaveBeenCalledWith('/v2/articleaccountcodings', codingData);
      expect(result.salesAccountNumber).toBe('3020');
    });
  });

  describe('delete', () => {
    it('should delete article account coding', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('art-123');

      expect(mockClient.delete).toHaveBeenCalledWith('/v2/articleaccountcodings/art-123');
    });
  });
});
