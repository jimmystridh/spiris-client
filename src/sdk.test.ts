import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Spiris } from './sdk';

describe('Spiris SDK', () => {
  describe('constructor', () => {
    it('should initialize all resources', () => {
      const sdk = new Spiris({ accessToken: 'test-token' });

      expect(sdk.customers).toBeDefined();
      expect(sdk.articles).toBeDefined();
      expect(sdk.invoices).toBeDefined();
      expect(sdk.invoiceDrafts).toBeDefined();
      expect(sdk.suppliers).toBeDefined();
      expect(sdk.supplierInvoices).toBeDefined();
      expect(sdk.paymentTerms).toBeDefined();
      expect(sdk.vatRates).toBeDefined();
      expect(sdk.fiscalYears).toBeDefined();
      expect(sdk.accounts).toBeDefined();
      expect(sdk.vouchers).toBeDefined();
      expect(sdk.accountBalances).toBeDefined();
      expect(sdk.accountTypes).toBeDefined();
      expect(sdk.bankAccounts).toBeDefined();
      expect(sdk.bankTransactions).toBeDefined();
      expect(sdk.banks).toBeDefined();
      expect(sdk.companySettings).toBeDefined();
      expect(sdk.costCenters).toBeDefined();
      expect(sdk.costCenterItems).toBeDefined();
      expect(sdk.customerLabels).toBeDefined();
      expect(sdk.articleLabels).toBeDefined();
      expect(sdk.customerLedgerItems).toBeDefined();
      expect(sdk.articleAccountCodings).toBeDefined();
      expect(sdk.countries).toBeDefined();
      expect(sdk.currencies).toBeDefined();
      expect(sdk.allocationPeriods).toBeDefined();
      expect(sdk.attachments).toBeDefined();
      expect(sdk.attachmentLinks).toBeDefined();
      expect(sdk.vatReportApproval).toBeDefined();
      expect(sdk.supplierInvoiceApproval).toBeDefined();
    });
  });

  describe('setAccessToken', () => {
    it('should set the access token', () => {
      const sdk = new Spiris({});
      sdk.setAccessToken('new-token');
      expect(sdk.getAccessToken()).toBe('new-token');
    });
  });

  describe('getAccessToken', () => {
    it('should return the access token', () => {
      const sdk = new Spiris({ accessToken: 'initial-token' });
      expect(sdk.getAccessToken()).toBe('initial-token');
    });

    it('should return undefined if no token set', () => {
      const sdk = new Spiris({});
      expect(sdk.getAccessToken()).toBeUndefined();
    });
  });

  describe('static getAuthorizationUrl', () => {
    it('should generate authorization URL', () => {
      const url = Spiris.getAuthorizationUrl({
        clientId: 'test-client',
        redirectUri: 'http://localhost:3000/callback',
      });

      expect(url).toContain('https://identity.vismaonline.com/connect/authorize');
      expect(url).toContain('client_id=test-client');
      expect(url).toContain('redirect_uri=');
    });

    it('should include custom scope and state', () => {
      const url = Spiris.getAuthorizationUrl({
        clientId: 'test-client',
        redirectUri: 'http://localhost:3000/callback',
        scope: 'custom:scope',
        state: 'random-state',
      });

      expect(url).toContain('scope=custom%3Ascope');
      expect(url).toContain('state=random-state');
    });
  });
});
