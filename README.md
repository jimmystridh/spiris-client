# spiris-client

TypeScript client for the Visma eAccounting API.

## Features

- Complete API coverage (25+ resources)
- Full TypeScript support with type definitions
- OAuth2 authentication with token refresh
- ESM and CommonJS support
- Pagination support for all list endpoints
- Consistent error handling

## Installation

```bash
npm install spiris-client
```

## Quick Start

### Authentication

```typescript
import { Spiris } from 'spiris-client';

// Step 1: Get authorization URL
const authUrl = Spiris.getAuthorizationUrl({
  clientId: 'YOUR_CLIENT_ID',
  redirectUri: 'http://localhost:3000/callback',
  scope: 'ea:api ea:sales offline_access',
  state: 'random-state-string'
});

// Redirect user to authUrl...

// Step 2: Exchange code for token (in your callback handler)
const tokenResponse = await Spiris.getAccessToken({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'http://localhost:3000/callback',
  code: 'AUTHORIZATION_CODE_FROM_CALLBACK'
});

// Step 3: Initialize client with access token
const spiris = new Spiris({
  accessToken: tokenResponse.access_token
});
```

### Token Refresh

```typescript
const newToken = await Spiris.refreshAccessToken({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  refreshToken: 'YOUR_REFRESH_TOKEN'
});

spiris.setAccessToken(newToken.access_token);
```

## API Reference

### Core Resources

#### Customers

```typescript
// List customers with pagination
const customers = await spiris.customers.getAll({ page: 1, pageSize: 50 });

// Get single customer
const customer = await spiris.customers.get('customer-id');

// Create customer
const newCustomer = await spiris.customers.create({
  name: 'Acme Corporation',
  emailAddress: 'contact@acme.com',
  invoiceCity: 'Stockholm',
  invoiceCountryCode: 'SE'
});

// Update customer
await spiris.customers.update('customer-id', { name: 'New Name' });

// Delete customer
await spiris.customers.delete('customer-id');

// Search customers
const results = await spiris.customers.search('Acme');
```

#### Articles (Products/Services)

```typescript
const articles = await spiris.articles.getAll();

const article = await spiris.articles.create({
  name: 'Consulting Service',
  articleNumber: 'SVC-001',
  unitPrice: 1500,
  unit: 'hour'
});
```

#### Customer Invoices

```typescript
// Create invoice
const invoice = await spiris.invoices.create({
  customerId: 'customer-id',
  invoiceDate: '2024-01-15',
  dueDate: '2024-02-15',
  invoiceRows: [{
    articleId: 'article-id',
    quantity: 10,
    unitPrice: 1500
  }]
});

// Send via email
await spiris.invoices.sendEmail('invoice-id', 'customer@email.com');

// Mark as paid
await spiris.invoices.markAsPaid('invoice-id', '2024-02-10', 15000);

// Create credit invoice
await spiris.invoices.createCredit('invoice-id');

// Get PDF
const pdf = await spiris.invoices.getPdf('invoice-id');
```

#### Invoice Drafts

```typescript
const draft = await spiris.invoiceDrafts.create({ /* ... */ });
const invoice = await spiris.invoiceDrafts.convertToInvoice('draft-id');
```

#### Suppliers

```typescript
const suppliers = await spiris.suppliers.getAll();
const supplier = await spiris.suppliers.create({
  name: 'Office Supplies AB',
  city: 'Gothenburg',
  countryCode: 'SE'
});
```

#### Supplier Invoices

```typescript
const supplierInvoice = await spiris.supplierInvoices.create({
  supplierId: 'supplier-id',
  invoiceNumber: 'INV-001',
  invoiceDate: '2024-01-15',
  dueDate: '2024-02-15',
  totalAmount: 5000
});

await spiris.supplierInvoices.markAsPaid('invoice-id', '2024-02-01', 5000);
```

### Accounting Resources

#### Payment Terms

```typescript
const terms = await spiris.paymentTerms.getAll();
await spiris.paymentTerms.create({ name: 'Net 30', numberOfDays: 30 });
```

#### VAT Rates

```typescript
const vatRates = await spiris.vatRates.getAll();
const rate = await spiris.vatRates.get('rate-id');
```

#### Fiscal Years

```typescript
const years = await spiris.fiscalYears.getAll();
const current = await spiris.fiscalYears.getCurrent();
```

#### Accounts (Chart of Accounts)

```typescript
const accounts = await spiris.accounts.getAll();
await spiris.accounts.create({ number: '1910', name: 'Kassa' });
```

#### Vouchers (Verifikationer)

```typescript
const voucher = await spiris.vouchers.create({
  voucherDate: '2024-01-15',
  voucherText: 'Månadshyra',
  voucherRows: [
    { accountNumber: '5010', debitAmount: 10000 },
    { accountNumber: '1910', creditAmount: 10000 }
  ]
});
```

#### Account Balances

```typescript
const balances = await spiris.accountBalances.getAll({
  fiscalYearId: 'year-id',
  periodStart: '2024-01-01',
  periodEnd: '2024-12-31'
});
```

### Banking Resources

#### Bank Accounts

```typescript
const bankAccounts = await spiris.bankAccounts.getAll();
await spiris.bankAccounts.create({
  name: 'Företagskonto',
  accountNumber: '1234567890',
  bankName: 'Nordea'
});
```

#### Bank Transactions

```typescript
const transactions = await spiris.bankTransactions.getAll();
const byAccount = await spiris.bankTransactions.getByBankAccount('account-id');
await spiris.bankTransactions.markAsReconciled('transaction-id');
```

### Organization Resources

#### Company Settings

```typescript
const settings = await spiris.companySettings.get();
await spiris.companySettings.update({ companyName: 'Nytt Företagsnamn AB' });
```

#### Cost Centers (Kostnadsställen)

```typescript
const costCenters = await spiris.costCenters.getAll();
await spiris.costCenters.create({ name: 'Marknadsföring', code: 'MKT' });
```

#### Labels

```typescript
// Customer labels
const customerLabels = await spiris.customerLabels.getAll();
await spiris.customerLabels.create({ name: 'VIP' });

// Article labels
const articleLabels = await spiris.articleLabels.getAll();
await spiris.articleLabels.create({ name: 'Utvald' });
```

#### Customer Ledger

```typescript
const ledgerItems = await spiris.customerLedgerItems.getAll();
const byCustomer = await spiris.customerLedgerItems.getByCustomer('customer-id');
```

### Reference Data

#### Countries & Currencies

```typescript
const countries = await spiris.countries.getAll();
const currencies = await spiris.currencies.getAll();
const rate = await spiris.currencies.getExchangeRate('USD', 'SEK', '2024-01-15');
```

### Attachments

```typescript
// Upload attachment
const attachment = await spiris.attachments.upload(file, 'faktura.pdf');

// Download
const blob = await spiris.attachments.download('attachment-id');

// Link to entity
await spiris.attachmentLinks.create({
  attachmentId: 'attachment-id',
  entityType: 'CustomerInvoice',
  entityId: 'invoice-id'
});
```

### Approval Workflows

```typescript
// VAT report approval
const vatReports = await spiris.vatReportApproval.getAll();
await spiris.vatReportApproval.approve('report-id');

// Supplier invoice approval
const pending = await spiris.supplierInvoiceApproval.getAll();
await spiris.supplierInvoiceApproval.approve('invoice-id');
await spiris.supplierInvoiceApproval.reject('invoice-id', 'Saknar dokumentation');
```

## TypeScript Types

All types are exported for use in your application:

```typescript
import type {
  Customer,
  Article,
  CustomerInvoice,
  Supplier,
  Account,
  Voucher,
  BankAccount,
  PaginatedResponse,
  VismaError
} from 'spiris-client';
```

## Error Handling

```typescript
try {
  const customer = await spiris.customers.get('invalid-id');
} catch (error) {
  if (error instanceof Error) {
    console.error('Message:', error.message);
  }
  // Typed error with status code and validation errors
  const vismaError = error as VismaError;
  console.error('Status:', vismaError.statusCode);
  console.error('Validation:', vismaError.errors);
}
```

## Rate Limits

The API has a rate limit of **600 requests per minute** per client and per endpoint.

## Requirements

- Node.js 18.0.0 or higher
- Visma eAccounting account with API access
- OAuth2 client credentials from [Visma Developer Portal](https://developer.visma.com)

## Resources

- [Visma Developer Portal](https://developer.visma.com)
- [Visma eAccounting API Documentation](https://developer.visma.com/api/eaccounting)
- [API Swagger/OpenAPI](https://eaccountingapi.vismaonline.com/swagger/ui/index)

## License

MIT
