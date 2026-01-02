import { describe, it, expect, beforeEach } from 'vitest';
import { AttachmentsResource, AttachmentLinksResource } from './attachments';
import {
  createMockClient,
  createPaginatedResponse,
  mockAttachment,
  mockAttachmentLink,
} from '../test-utils';

describe('AttachmentsResource', () => {
  let resource: AttachmentsResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new AttachmentsResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all attachments', async () => {
      const response = createPaginatedResponse([mockAttachment]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/attachments', undefined);
      expect(result).toEqual(response);
    });

    it('should pass pagination params', async () => {
      const response = createPaginatedResponse([mockAttachment]);
      mockClient.get.mockResolvedValue(response);

      await resource.getAll({ page: 2, pageSize: 20 });

      expect(mockClient.get).toHaveBeenCalledWith('/v2/attachments', {
        page: 2,
        pageSize: 20,
      });
    });
  });

  describe('get', () => {
    it('should fetch a single attachment by ID', async () => {
      mockClient.get.mockResolvedValue(mockAttachment);

      const result = await resource.get('att-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/attachments/att-123');
      expect(result).toEqual(mockAttachment);
    });
  });

  describe('download', () => {
    it('should download attachment content', async () => {
      const mockBlob = new Blob(['file content']);
      mockClient.get.mockResolvedValue(mockBlob);

      const result = await resource.download('att-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/attachments/att-123/content');
      expect(result).toEqual(mockBlob);
    });
  });

  describe('upload', () => {
    it('should upload a new attachment', async () => {
      const mockFile = new Blob(['test content']);
      const fileName = 'test.pdf';
      mockClient.post.mockResolvedValue(mockAttachment);

      const result = await resource.upload(mockFile, fileName);

      expect(mockClient.post).toHaveBeenCalledWith('/v2/attachments', expect.any(FormData));
      expect(result).toEqual(mockAttachment);
    });
  });

  describe('delete', () => {
    it('should delete an attachment', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('att-123');

      expect(mockClient.delete).toHaveBeenCalledWith('/v2/attachments/att-123');
    });
  });
});

describe('AttachmentLinksResource', () => {
  let resource: AttachmentLinksResource;
  let mockClient: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    mockClient = createMockClient();
    resource = new AttachmentLinksResource(mockClient);
  });

  describe('getAll', () => {
    it('should fetch all attachment links', async () => {
      const response = createPaginatedResponse([mockAttachmentLink]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getAll();

      expect(mockClient.get).toHaveBeenCalledWith('/v2/attachmentlinks', undefined);
      expect(result).toEqual(response);
    });
  });

  describe('getByEntity', () => {
    it('should fetch links for a specific entity', async () => {
      const response = createPaginatedResponse([mockAttachmentLink]);
      mockClient.get.mockResolvedValue(response);

      const result = await resource.getByEntity('CustomerInvoice', 'inv-123');

      expect(mockClient.get).toHaveBeenCalledWith('/v2/attachmentlinks', {
        entityType: 'CustomerInvoice',
        entityId: 'inv-123',
      });
      expect(result).toEqual(response);
    });
  });

  describe('create', () => {
    it('should create a new attachment link', async () => {
      const linkData = {
        attachmentId: 'att-456',
        entityType: 'SupplierInvoice',
        entityId: 'sinv-123',
      };
      mockClient.post.mockResolvedValue({ id: 'link-new', ...linkData });

      const result = await resource.create(linkData);

      expect(mockClient.post).toHaveBeenCalledWith('/v2/attachmentlinks', linkData);
      expect(result.entityType).toBe('SupplierInvoice');
    });
  });

  describe('delete', () => {
    it('should delete an attachment link', async () => {
      mockClient.delete.mockResolvedValue(undefined);

      await resource.delete('attlink-123');

      expect(mockClient.delete).toHaveBeenCalledWith('/v2/attachmentlinks/attlink-123');
    });
  });
});
