// Main SDK export
export { Spiris } from './sdk';
// Backwards compatibility aliases
export { Spiris as VismaSpcs, Spiris as VismaEAccounting } from './sdk';

// Client export
export { VismaEAccountingClient } from './client';

// Resource exports - Core
export { CustomersResource } from './resources/customers';
export { ArticlesResource } from './resources/articles';
export { InvoicesResource, InvoiceDraftsResource } from './resources/invoices';
export { SuppliersResource, SupplierInvoicesResource } from './resources/suppliers';

// Resource exports - Accounting
export {
  PaymentTermsResource,
  VatRatesResource,
  FiscalYearsResource,
  AccountsResource,
  VouchersResource,
} from './resources/common';

// Resource exports - Banking
export {
  BankAccountsResource,
  BankTransactionsResource,
  BanksResource,
} from './resources/banking';

// Resource exports - Reference Data
export {
  AccountBalancesResource,
  AccountTypesResource,
  CompanySettingsResource,
  CountriesResource,
  CurrenciesResource,
  AllocationPeriodsResource,
} from './resources/reference';

// Resource exports - Organization
export {
  CostCentersResource,
  CostCenterItemsResource,
  CustomerLabelsResource,
  ArticleLabelsResource,
  CustomerLedgerItemsResource,
  ArticleAccountCodingsResource,
} from './resources/organization';

// Resource exports - Attachments
export {
  AttachmentsResource,
  AttachmentLinksResource,
} from './resources/attachments';

// Resource exports - Approval
export {
  VatReportApprovalResource,
  SupplierInvoiceApprovalResource,
} from './resources/approval';

// Type exports
export type {
  // Common types
  PaginationParams,
  PaginatedResponse,
  VismaClientConfig,
  VismaError,
  TokenResponse,
  AuthConfig,

  // Customer types
  Customer,
  CreateCustomerRequest,
  UpdateCustomerRequest,
  Address,

  // Article types
  Article,
  CreateArticleRequest,

  // Invoice types
  InvoiceRow,
  CustomerInvoice,
  CustomerInvoiceDraft,
  CreateInvoiceRequest,

  // Supplier types
  Supplier,
  CreateSupplierRequest,
  SupplierInvoice,

  // Accounting types
  PaymentTerm,
  VatRate,
  FiscalYear,
  Account,
  Voucher,
  VoucherRow,
  AccountBalance,
  AccountType,

  // Banking types
  BankAccount,
  BankTransaction,
  Bank,

  // Organization types
  CompanySettings,
  CostCenter,
  CostCenterItem,
  CustomerLabel,
  ArticleLabel,
  CustomerLedgerItem,
  ArticleAccountCoding,

  // Reference Data types
  Country,
  Currency,
  ExchangeRate,
  AllocationPeriod,

  // Attachment types
  Attachment,
  AttachmentLink,

  // Approval types
  VatReportApproval,
  SupplierInvoiceApproval,
} from './types';
