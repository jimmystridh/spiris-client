import { describe, it, expect, beforeEach } from 'vitest';
import { ArticlesResource } from './articles';
import {
  createMockClient,
  createPaginatedResponse,
  mockArticle,
} from '../test-utils';

describe('ArticlesResource', () => {
  let resource: ArticlesResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new ArticlesResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all articles', async () => {
      const response = createPaginatedResponse([mockArticle]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/articles', undefined);
      expect(result).toEqual(response);
    });

    it('should pass pagination params', async () => {
      const response = createPaginatedResponse([mockArticle]);
      mockClient.get.mockResolvedValue(response);

      await resource.getAll({ page: 2, pageSize: 20 });

      expect(mockClient.get).toHaveBeenCalledWith('/v2/articles', {
        page: 2,
        pageSize: 20,
      });
    });
  });

  describe('get', () => {
    it('should fetch a single article by ID', async () => {
      mockClient.get.mockResolvedValue(mockArticle);

      const result = await resource.get('art-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/articles/art-123');
      expect(result).toEqual(mockArticle);
    });
  });

  describe('create', () => {
    it('should create a new article', async () => {
      const createData = {
        name: 'New Article',
        articleNumber: 'NEW-001',
        unitPrice: 250,
        unit: 'st',
      };
      mockClient.post.mockResolvedValue({ id: 'new-123', ...createData });

      const result = await resource.create(createData);

      expect(mockClient.post).toHaveBeenCalledWith('/v2/articles', createData);
      expect(result.id).toBe('new-123');
      expect(result.name).toBe('New Article');
    });
  });

  describe('update', () => {
    it('should update an existing article', async () => {
      const updateData = { unitPrice: 300 };
      mockClient.put.mockResolvedValue({ ...mockArticle, ...updateData });

      const result = await resource.update('art-123', updateData);

      expect(mockClient.put).toHaveBeenCalledWith(
        '/v2/articles/art-123',
        updateData
      );
      expect(result.unitPrice).toBe(300);
    });
  });

  describe('delete', () => {
    it('should delete an article', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('art-123');

      expect(mockClient.delete).toHaveBeenCalledWith('/v2/articles/art-123');
    });
  });

  describe('search', () => {
    it('should search articles by query', async () => {
      const response = createPaginatedResponse([mockArticle]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.search('Test');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/articles', {
        name: 'Test',
      });
      expect(result).toEqual(response);
    });
  });
});
