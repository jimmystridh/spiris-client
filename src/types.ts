// Common Types
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  meta: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
  data: T[];
}

// Authentication Types
export interface AuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope?: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope?: string;
}

export interface VismaClientConfig {
  apiUrl?: string;
  accessToken?: string;
  onTokenRefresh?: (newToken: TokenResponse) => void | Promise<void>;
}

// Customer Types
export interface Address {
  address1?: string;
  address2?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}

export interface Customer {
  id?: string;
  customerNumber?: string;
  corporateIdentityNumber?: string;
  contactPersonEmail?: string;
  contactPersonName?: string;
  contactPersonPhone?: string;
  currencyCode?: string;
  emailAddress?: string;
  emailAddressInvoice?: string;
  invoiceCity?: string;
  invoiceCountryCode?: string;
  invoicePostalCode?: string;
  invoiceStreetAddress1?: string;
  invoiceStreetAddress2?: string;
  isPrivatePerson?: boolean;
  name: string;
  isActive?: boolean;
  accountNumber?: string;
  bankAccountNumber?: string;
  bankName?: string;
  bic?: string;
  iban?: string;
  ourReference?: string;
  paymentTermsId?: string;
  phoneNumber?: string;
  yourReference?: string;
  deliveryCustomerName?: string;
  deliveryAddress1?: string;
  deliveryAddress2?: string;
  deliveryCity?: string;
  deliveryCountryCode?: string;
  deliveryPostalCode?: string;
  terms?: string;
  note?: string;
  isBlocked?: boolean;
  creditLimit?: number;
  createdUtc?: string;
  modifiedUtc?: string;
}

export interface CreateCustomerRequest {
  name: string;
  customerNumber?: string;
  corporateIdentityNumber?: string;
  emailAddress?: string;
  invoiceCity?: string;
  invoiceCountryCode?: string;
  invoicePostalCode?: string;
  invoiceStreetAddress1?: string;
  invoiceStreetAddress2?: string;
  isPrivatePerson?: boolean;
  phoneNumber?: string;
  isActive?: boolean;
}

export interface UpdateCustomerRequest extends CreateCustomerRequest {
  id: string;
}

// Article (Product) Types
export interface Article {
  id?: string;
  articleNumber?: string;
  description?: string;
  name: string;
  unitPrice?: number;
  unitAbbreviation?: string;
  unit?: string;
  isActive?: boolean;
  vatRateId?: string;
  accountNumber?: string;
  createdUtc?: string;
  modifiedUtc?: string;
  isStockItem?: boolean;
  stockBalance?: number;
  stockAccountNumber?: string;
  costPrice?: number;
}

export interface CreateArticleRequest {
  name: string;
  articleNumber?: string;
  description?: string;
  unitPrice?: number;
  unit?: string;
  vatRateId?: string;
  accountNumber?: string;
  isStockItem?: boolean;
  costPrice?: number;
}

// Invoice Types
export interface InvoiceRow {
  articleId?: string;
  articleNumber?: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  discountPercentage?: number;
  vatRateId?: string;
  accountNumber?: string;
  totalAmountExcludingVat?: number;
  totalVatAmount?: number;
  totalAmount?: number;
  unit?: string;
  lineNumber?: number;
}

export interface CustomerInvoice {
  id?: string;
  invoiceNumber?: number;
  customerId: string;
  customerName?: string;
  invoiceDate: string;
  dueDate: string;
  deliveryDate?: string;
  currencyCode?: string;
  ourReference?: string;
  yourReference?: string;
  invoiceRows: InvoiceRow[];
  totalAmount?: number;
  totalVatAmount?: number;
  totalAmountExcludingVat?: number;
  totalRoundingAmount?: number;
  isPaid?: boolean;
  isCreditInvoice?: boolean;
  isRotRutInvoice?: boolean;
  rotRutType?: string;
  rotRutAmount?: number;
  terms?: string;
  note?: string;
  invoiceText?: string;
  status?: string;
  createdUtc?: string;
  modifiedUtc?: string;
  salesDocumentAttachments?: string[];
  voucherNumber?: number;
}

export interface CustomerInvoiceDraft extends CustomerInvoice {
  isDraft: true;
}

export interface CreateInvoiceRequest {
  customerId: string;
  invoiceDate: string;
  dueDate: string;
  deliveryDate?: string;
  currencyCode?: string;
  ourReference?: string;
  yourReference?: string;
  invoiceRows: InvoiceRow[];
  terms?: string;
  note?: string;
  invoiceText?: string;
  rotRutType?: string;
}

// Supplier Types
export interface Supplier {
  id?: string;
  supplierNumber?: string;
  name: string;
  corporateIdentityNumber?: string;
  contactPersonName?: string;
  contactPersonEmail?: string;
  contactPersonPhone?: string;
  emailAddress?: string;
  phoneNumber?: string;
  address1?: string;
  address2?: string;
  city?: string;
  postalCode?: string;
  countryCode?: string;
  currencyCode?: string;
  bankAccountNumber?: string;
  bic?: string;
  iban?: string;
  ourReference?: string;
  yourReference?: string;
  paymentTermsId?: string;
  isActive?: boolean;
  createdUtc?: string;
  modifiedUtc?: string;
}

export interface CreateSupplierRequest {
  name: string;
  supplierNumber?: string;
  corporateIdentityNumber?: string;
  emailAddress?: string;
  phoneNumber?: string;
  address1?: string;
  city?: string;
  postalCode?: string;
  countryCode?: string;
  isActive?: boolean;
}

// Supplier Invoice Types
export interface SupplierInvoice {
  id?: string;
  supplierNumber?: string;
  supplierId: string;
  supplierName?: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  paymentDate?: string;
  currencyCode?: string;
  totalAmount: number;
  totalVatAmount?: number;
  rotRutAmount?: number;
  isPaid?: boolean;
  createdUtc?: string;
  modifiedUtc?: string;
}

// Payment Terms Types
export interface PaymentTerm {
  id?: string;
  name: string;
  nameEnglish?: string;
  numberOfDays: number;
  isActive?: boolean;
  createdUtc?: string;
  modifiedUtc?: string;
}

// VAT Rate Types
export interface VatRate {
  id?: string;
  name: string;
  ratePercentage: number;
  isActive?: boolean;
  createdUtc?: string;
  modifiedUtc?: string;
}

// Fiscal Year Types
export interface FiscalYear {
  id?: string;
  startDate: string;
  endDate: string;
  isLocked?: boolean;
  createdUtc?: string;
  modifiedUtc?: string;
}

// Account Types
export interface Account {
  id?: string;
  number: string;
  name: string;
  isActive?: boolean;
  isSummaryAccount?: boolean;
  vatRateId?: string;
  createdUtc?: string;
  modifiedUtc?: string;
}

// Voucher Types
export interface VoucherRow {
  accountNumber: string;
  debitAmount?: number;
  creditAmount?: number;
  transactionText?: string;
}

export interface Voucher {
  id?: string;
  voucherNumber?: number;
  voucherDate: string;
  voucherText?: string;
  voucherRows: VoucherRow[];
  createdUtc?: string;
  modifiedUtc?: string;
}

// Account Balance Types
export interface AccountBalance {
  accountNumber: string;
  accountName?: string;
  balance: number;
  budgetBalance?: number;
  openingBalance?: number;
  closingBalance?: number;
  periodBalance?: number;
}

// Account Type Types
export interface AccountType {
  id?: string;
  name: string;
  nameEnglish?: string;
  isActive?: boolean;
}

// Bank Account Types
export interface BankAccount {
  id?: string;
  name: string;
  accountNumber?: string;
  bankAccountNumber?: string;
  iban?: string;
  bic?: string;
  bankName?: string;
  currencyCode?: string;
  isActive?: boolean;
  createdUtc?: string;
  modifiedUtc?: string;
}

// Bank Transaction Types
export interface BankTransaction {
  id?: string;
  bankAccountId: string;
  transactionDate: string;
  amount: number;
  description?: string;
  reference?: string;
  isReconciled?: boolean;
  createdUtc?: string;
  modifiedUtc?: string;
}

// Company Settings Types
export interface CompanySettings {
  id?: string;
  companyName: string;
  corporateIdentityNumber?: string;
  address1?: string;
  address2?: string;
  city?: string;
  postalCode?: string;
  countryCode?: string;
  phoneNumber?: string;
  emailAddress?: string;
  website?: string;
  currencyCode?: string;
  fiscalYearStartMonth?: number;
  vatNumber?: string;
  bankAccountNumber?: string;
  bankName?: string;
  iban?: string;
  bic?: string;
}

// Cost Center Types
export interface CostCenter {
  id?: string;
  code: string;
  name: string;
  isActive?: boolean;
  createdUtc?: string;
  modifiedUtc?: string;
}

export interface CostCenterItem {
  id?: string;
  costCenterId: string;
  accountNumber: string;
  amount: number;
  transactionDate?: string;
  description?: string;
}

// Label Types
export interface CustomerLabel {
  id?: string;
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface ArticleLabel {
  id?: string;
  name: string;
  description?: string;
  isActive?: boolean;
}

// Customer Ledger Types
export interface CustomerLedgerItem {
  id?: string;
  customerId: string;
  customerName?: string;
  invoiceNumber?: string;
  invoiceDate?: string;
  dueDate?: string;
  amount: number;
  remainingAmount?: number;
  currencyCode?: string;
  isPaid?: boolean;
}

// Article Account Coding Types
export interface ArticleAccountCoding {
  id?: string;
  articleId: string;
  salesAccountNumber?: string;
  purchaseAccountNumber?: string;
  vatRateId?: string;
}

// Reference Data Types
export interface Country {
  code: string;
  name: string;
  nameEnglish?: string;
}

export interface Currency {
  code: string;
  name: string;
  nameEnglish?: string;
  isActive?: boolean;
}

export interface ExchangeRate {
  currencyCode: string;
  rate: number;
  date: string;
}

export interface Bank {
  id?: string;
  name: string;
  bic?: string;
  countryCode?: string;
}

// Allocation Period Types
export interface AllocationPeriod {
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive?: boolean;
}

// Attachment Types
export interface Attachment {
  id?: string;
  fileName: string;
  contentType?: string;
  fileSize?: number;
  createdUtc?: string;
}

export interface AttachmentLink {
  id?: string;
  attachmentId: string;
  entityType: string;
  entityId: string;
}

// Approval Types
export interface VatReportApproval {
  id?: string;
  periodStart: string;
  periodEnd: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedByUserId?: string;
  approvedUtc?: string;
}

export interface SupplierInvoiceApproval {
  id?: string;
  supplierInvoiceId: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedByUserId?: string;
  approvedUtc?: string;
  comment?: string;
}

// Error Types
export interface VismaError {
  message: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}
