import { VismaEAccountingClient } from './client';
import { CustomersResource } from './resources/customers';
import { ArticlesResource } from './resources/articles';
import { InvoicesResource, InvoiceDraftsResource } from './resources/invoices';
import { SuppliersResource, SupplierInvoicesResource } from './resources/suppliers';
import {
  PaymentTermsResource,
  VatRatesResource,
  FiscalYearsResource,
  AccountsResource,
  VouchersResource,
} from './resources/common';
import {
  BankAccountsResource,
  BankTransactionsResource,
  BanksResource,
} from './resources/banking';
import {
  AccountBalancesResource,
  AccountTypesResource,
  CompanySettingsResource,
  CountriesResource,
  CurrenciesResource,
  AllocationPeriodsResource,
} from './resources/reference';
import {
  CostCentersResource,
  CostCenterItemsResource,
  CustomerLabelsResource,
  ArticleLabelsResource,
  CustomerLedgerItemsResource,
  ArticleAccountCodingsResource,
} from './resources/organization';
import {
  AttachmentsResource,
  AttachmentLinksResource,
} from './resources/attachments';
import {
  VatReportApprovalResource,
  SupplierInvoiceApprovalResource,
} from './resources/approval';
import { VismaClientConfig } from './types';

/**
 * Main SDK class for Spiris Bokföring API
 */
export class Spiris {
  private client: VismaEAccountingClient;

  // Core Resources
  public customers: CustomersResource;
  public articles: ArticlesResource;
  public invoices: InvoicesResource;
  public invoiceDrafts: InvoiceDraftsResource;
  public suppliers: SuppliersResource;
  public supplierInvoices: SupplierInvoicesResource;

  // Accounting Resources
  public paymentTerms: PaymentTermsResource;
  public vatRates: VatRatesResource;
  public fiscalYears: FiscalYearsResource;
  public accounts: AccountsResource;
  public vouchers: VouchersResource;
  public accountBalances: AccountBalancesResource;
  public accountTypes: AccountTypesResource;

  // Banking Resources
  public bankAccounts: BankAccountsResource;
  public bankTransactions: BankTransactionsResource;
  public banks: BanksResource;

  // Organization Resources
  public companySettings: CompanySettingsResource;
  public costCenters: CostCentersResource;
  public costCenterItems: CostCenterItemsResource;
  public customerLabels: CustomerLabelsResource;
  public articleLabels: ArticleLabelsResource;
  public customerLedgerItems: CustomerLedgerItemsResource;
  public articleAccountCodings: ArticleAccountCodingsResource;

  // Reference Data Resources
  public countries: CountriesResource;
  public currencies: CurrenciesResource;
  public allocationPeriods: AllocationPeriodsResource;

  // Attachment Resources
  public attachments: AttachmentsResource;
  public attachmentLinks: AttachmentLinksResource;

  // Approval Workflow Resources
  public vatReportApproval: VatReportApprovalResource;
  public supplierInvoiceApproval: SupplierInvoiceApprovalResource;

  constructor(config: VismaClientConfig) {
    this.client = new VismaEAccountingClient(config);

    // Initialize Core Resources
    this.customers = new CustomersResource(this.client);
    this.articles = new ArticlesResource(this.client);
    this.invoices = new InvoicesResource(this.client);
    this.invoiceDrafts = new InvoiceDraftsResource(this.client);
    this.suppliers = new SuppliersResource(this.client);
    this.supplierInvoices = new SupplierInvoicesResource(this.client);

    // Initialize Accounting Resources
    this.paymentTerms = new PaymentTermsResource(this.client);
    this.vatRates = new VatRatesResource(this.client);
    this.fiscalYears = new FiscalYearsResource(this.client);
    this.accounts = new AccountsResource(this.client);
    this.vouchers = new VouchersResource(this.client);
    this.accountBalances = new AccountBalancesResource(this.client);
    this.accountTypes = new AccountTypesResource(this.client);

    // Initialize Banking Resources
    this.bankAccounts = new BankAccountsResource(this.client);
    this.bankTransactions = new BankTransactionsResource(this.client);
    this.banks = new BanksResource(this.client);

    // Initialize Organization Resources
    this.companySettings = new CompanySettingsResource(this.client);
    this.costCenters = new CostCentersResource(this.client);
    this.costCenterItems = new CostCenterItemsResource(this.client);
    this.customerLabels = new CustomerLabelsResource(this.client);
    this.articleLabels = new ArticleLabelsResource(this.client);
    this.customerLedgerItems = new CustomerLedgerItemsResource(this.client);
    this.articleAccountCodings = new ArticleAccountCodingsResource(this.client);

    // Initialize Reference Data Resources
    this.countries = new CountriesResource(this.client);
    this.currencies = new CurrenciesResource(this.client);
    this.allocationPeriods = new AllocationPeriodsResource(this.client);

    // Initialize Attachment Resources
    this.attachments = new AttachmentsResource(this.client);
    this.attachmentLinks = new AttachmentLinksResource(this.client);

    // Initialize Approval Workflow Resources
    this.vatReportApproval = new VatReportApprovalResource(this.client);
    this.supplierInvoiceApproval = new SupplierInvoiceApprovalResource(this.client);
  }

  /**
   * Set or update the access token
   */
  setAccessToken(token: string): void {
    this.client.setAccessToken(token);
  }

  /**
   * Get the current access token
   */
  getAccessToken(): string | undefined {
    return this.client.getAccessToken();
  }

  /**
   * Get OAuth2 authorization URL
   */
  static getAuthorizationUrl(params: {
    clientId: string;
    redirectUri: string;
    scope?: string;
    state?: string;
  }): string {
    return VismaEAccountingClient.getAuthorizationUrl(params);
  }

  /**
   * Exchange authorization code for access token
   */
  static async getAccessToken(params: {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    code: string;
  }) {
    return VismaEAccountingClient.getAccessToken(params);
  }

  /**
   * Refresh access token using refresh token
   */
  static async refreshAccessToken(params: {
    clientId: string;
    clientSecret: string;
    refreshToken: string;
  }) {
    return VismaEAccountingClient.refreshAccessToken(params);
  }
}
