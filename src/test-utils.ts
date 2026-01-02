import { vi } from 'vitest';
import { VismaEAccountingClient } from './client';
import type { PaginatedResponse } from './types';

export function createMockClient(): VismaEAccountingClient & {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
  patch: ReturnType<typeof vi.fn>;
} {
  const mockClient = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
    setAccessToken: vi.fn(),
    getAccessToken: vi.fn(),
  };

  return mockClient as unknown as VismaEAccountingClient & typeof mockClient;
}

export function createPaginatedResponse<T>(
  data: T[],
  options: { page?: number; pageSize?: number; totalCount?: number } = {}
): PaginatedResponse<T> {
  const { page = 1, pageSize = 10, totalCount = data.length } = options;
  return {
    meta: {
      currentPage: page,
      pageSize,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    },
    data,
  };
}

export const mockCustomer = {
  id: 'cust-123',
  name: 'Test Customer AB',
  emailAddress: 'test@example.com',
  invoiceCity: 'Stockholm',
  invoiceCountryCode: 'SE',
  isActive: true,
  createdUtc: '2024-01-01T00:00:00Z',
  modifiedUtc: '2024-01-01T00:00:00Z',
};

export const mockArticle = {
  id: 'art-123',
  name: 'Test Article',
  articleNumber: 'ART-001',
  unitPrice: 100,
  unit: 'st',
  isActive: true,
  createdUtc: '2024-01-01T00:00:00Z',
  modifiedUtc: '2024-01-01T00:00:00Z',
};

export const mockInvoice = {
  id: 'inv-123',
  invoiceNumber: 1001,
  customerId: 'cust-123',
  customerName: 'Test Customer AB',
  invoiceDate: '2024-01-15',
  dueDate: '2024-02-15',
  invoiceRows: [
    {
      articleId: 'art-123',
      description: 'Test Article',
      quantity: 2,
      unitPrice: 100,
      totalAmount: 200,
    },
  ],
  totalAmount: 200,
  totalVatAmount: 50,
  totalAmountExcludingVat: 150,
  isPaid: false,
  createdUtc: '2024-01-01T00:00:00Z',
  modifiedUtc: '2024-01-01T00:00:00Z',
};

export const mockInvoiceDraft = {
  ...mockInvoice,
  id: 'draft-123',
  isDraft: true as const,
};

export const mockSupplier = {
  id: 'sup-123',
  name: 'Test Supplier AB',
  emailAddress: 'supplier@example.com',
  city: 'Gothenburg',
  countryCode: 'SE',
  isActive: true,
  createdUtc: '2024-01-01T00:00:00Z',
  modifiedUtc: '2024-01-01T00:00:00Z',
};

export const mockSupplierInvoice = {
  id: 'sinv-123',
  supplierId: 'sup-123',
  supplierName: 'Test Supplier AB',
  invoiceNumber: 'INV-001',
  invoiceDate: '2024-01-15',
  dueDate: '2024-02-15',
  totalAmount: 5000,
  isPaid: false,
  createdUtc: '2024-01-01T00:00:00Z',
  modifiedUtc: '2024-01-01T00:00:00Z',
};

export const mockPaymentTerm = {
  id: 'pt-123',
  name: 'Net 30',
  numberOfDays: 30,
  isActive: true,
};

export const mockVatRate = {
  id: 'vat-123',
  name: '25%',
  ratePercentage: 25,
  isActive: true,
};

export const mockFiscalYear = {
  id: 'fy-123',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  isLocked: false,
};

export const mockAccount = {
  id: 'acc-123',
  number: '1910',
  name: 'Kassa',
  isActive: true,
};

export const mockVoucher = {
  id: 'vouch-123',
  voucherNumber: 1,
  voucherDate: '2024-01-15',
  voucherText: 'Test voucher',
  voucherRows: [
    { accountNumber: '5010', debitAmount: 1000 },
    { accountNumber: '1910', creditAmount: 1000 },
  ],
};

export const mockBankAccount = {
  id: 'bank-123',
  name: 'Company Account',
  bankAccountNumber: '1234567890',
  bankName: 'Nordea',
  isActive: true,
};

export const mockBankTransaction = {
  id: 'btx-123',
  bankAccountId: 'bank-123',
  transactionDate: '2024-01-15',
  amount: 1000,
  description: 'Test transaction',
  isReconciled: false,
};

export const mockCompanySettings = {
  id: 'company-123',
  companyName: 'Test Company AB',
  corporateIdentityNumber: '556123-4567',
  city: 'Stockholm',
  countryCode: 'SE',
  currencyCode: 'SEK',
};

export const mockCostCenter = {
  id: 'cc-123',
  code: 'MKT',
  name: 'Marketing',
  isActive: true,
};

export const mockCountry = {
  code: 'SE',
  name: 'Sverige',
  nameEnglish: 'Sweden',
};

export const mockCurrency = {
  code: 'SEK',
  name: 'Svensk krona',
  nameEnglish: 'Swedish Krona',
  isActive: true,
};

export const mockAttachment = {
  id: 'att-123',
  fileName: 'invoice.pdf',
  contentType: 'application/pdf',
  fileSize: 12345,
};

export const mockAttachmentLink = {
  id: 'attlink-123',
  attachmentId: 'att-123',
  entityType: 'CustomerInvoice',
  entityId: 'inv-123',
};

export const mockVatReportApproval = {
  id: 'vatapp-123',
  periodStart: '2024-01-01',
  periodEnd: '2024-03-31',
  status: 'pending' as const,
};

export const mockSupplierInvoiceApproval = {
  id: 'siapp-123',
  supplierInvoiceId: 'sinv-123',
  status: 'pending' as const,
};
