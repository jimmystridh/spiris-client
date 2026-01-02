# Changelog

All notable changes to the Spiris Bokföring API Client will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-15

### Added

#### Core Resources
- **Customers** - Full CRUD operations with search functionality
- **Articles** - Product/service management with search
- **Customer Invoices** - Create, send, mark as paid, create credit invoices
- **Invoice Drafts** - Draft management with convert-to-invoice workflow
- **Suppliers** - Supplier management with search
- **Supplier Invoices** - Supplier invoice tracking with payment status

#### Accounting Resources
- **Payment Terms** - Payment term configuration
- **VAT Rates** - VAT rate reference data
- **Fiscal Years** - Fiscal year management with current year detection
- **Accounts** - Chart of accounts management
- **Vouchers** - Journal entry/voucher management
- **Account Balances** - Account balance queries with period filtering
- **Account Types** - Account type reference data

#### Banking Resources
- **Bank Accounts** - Bank account management
- **Bank Transactions** - Transaction recording with reconciliation
- **Banks** - Bank reference data

#### Organization Resources
- **Company Settings** - Company configuration
- **Cost Centers** - Cost center management
- **Cost Center Items** - Cost center line items
- **Customer Labels** - Customer categorization
- **Article Labels** - Article categorization
- **Customer Ledger Items** - Customer ledger entries
- **Article Account Codings** - Article-to-account mappings

#### Reference Data Resources
- **Countries** - Country reference data
- **Currencies** - Currency definitions with exchange rates
- **Allocation Periods** - Period allocation management

#### Attachment Resources
- **Attachments** - File attachment upload/download
- **Attachment Links** - Link attachments to entities

#### Approval Workflows
- **VAT Report Approval** - VAT report approval workflow
- **Supplier Invoice Approval** - Supplier invoice approval workflow

#### Authentication
- OAuth2 authorization flow
- Token exchange and refresh
- Automatic Bearer token injection

#### Developer Experience
- Full TypeScript support with complete type definitions
- Pagination support for all list endpoints
- Consistent error handling with typed errors
- ESM and CommonJS module support
