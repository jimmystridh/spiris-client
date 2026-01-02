import { VismaEAccountingClient } from '../client';
import {
  Attachment,
  AttachmentLink,
  PaginationParams,
  PaginatedResponse,
} from '../types';

export class AttachmentsResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get all attachments with optional pagination
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Attachment>> {
    return this.client.get<PaginatedResponse<Attachment>>('/v2/attachments', params);
  }

  /**
   * Get a single attachment by ID
   */
  async get(id: string): Promise<Attachment> {
    return this.client.get<Attachment>(`/v2/attachments/${id}`);
  }

  /**
   * Download attachment content
   */
  async download(id: string): Promise<Blob> {
    return this.client.get<Blob>(`/v2/attachments/${id}/content`);
  }

  /**
   * Upload a new attachment
   */
  async upload(file: File | Blob, fileName: string): Promise<Attachment> {
    const formData = new FormData();
    formData.append('file', file, fileName);
    return this.client.post<Attachment>('/v2/attachments', formData);
  }

  /**
   * Delete an attachment
   */
  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`/v2/attachments/${id}`);
  }
}

export class AttachmentLinksResource {
  constructor(private client: VismaEAccountingClient) {}

  /**
   * Get all attachment links
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<AttachmentLink>> {
    return this.client.get<PaginatedResponse<AttachmentLink>>('/v2/attachmentlinks', params);
  }

  /**
   * Get attachment links for a specific entity
   */
  async getByEntity(
    entityType: string,
    entityId: string
  ): Promise<PaginatedResponse<AttachmentLink>> {
    return this.client.get<PaginatedResponse<AttachmentLink>>('/v2/attachmentlinks', {
      entityType,
      entityId,
    });
  }

  /**
   * Create a new attachment link
   */
  async create(data: AttachmentLink): Promise<AttachmentLink> {
    return this.client.post<AttachmentLink>('/v2/attachmentlinks', data);
  }

  /**
   * Delete an attachment link
   */
  async delete(id: string): Promise<void> {
    return this.client.delete<void>(`/v2/attachmentlinks/${id}`);
  }
}
