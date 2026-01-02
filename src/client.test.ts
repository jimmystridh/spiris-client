import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { VismaEAccountingClient } from './client';

vi.mock('axios');

describe('VismaEAccountingClient', () => {
  let mockAxiosInstance: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    interceptors: {
      request: { use: ReturnType<typeof vi.fn> };
      response: { use: ReturnType<typeof vi.fn> };
    };
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockAxiosInstance = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      patch: vi.fn(),
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    };

    vi.mocked(axios.create).mockReturnValue(mockAxiosInstance as any);
  });

  describe('constructor', () => {
    it('should create client with default API URL', () => {
      new VismaEAccountingClient({});

      expect(axios.create).toHaveBeenCalledWith({
        baseURL: 'https://eaccountingapi.vismaonline.com',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should create client with custom API URL', () => {
      new VismaEAccountingClient({ apiUrl: 'https://custom.api.com' });

      expect(axios.create).toHaveBeenCalledWith({
        baseURL: 'https://custom.api.com',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('should set up request and response interceptors', () => {
      new VismaEAccountingClient({});

      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
    });
  });

  describe('setAccessToken / getAccessToken', () => {
    it('should set and get access token', () => {
      const client = new VismaEAccountingClient({});

      expect(client.getAccessToken()).toBeUndefined();

      client.setAccessToken('test-token');

      expect(client.getAccessToken()).toBe('test-token');
    });

    it('should initialize with access token from config', () => {
      const client = new VismaEAccountingClient({
        accessToken: 'initial-token',
      });

      expect(client.getAccessToken()).toBe('initial-token');
    });
  });

  describe('HTTP methods', () => {
    let client: VismaEAccountingClient;

    beforeEach(() => {
      client = new VismaEAccountingClient({});
    });

    describe('get', () => {
      it('should make GET request and return data', async () => {
        const mockData = { id: '123', name: 'Test' };
        mockAxiosInstance.get.mockResolvedValue({ data: mockData });

        const result = await client.get('/v2/test');

        expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v2/test', {
          params: undefined,
        });
        expect(result).toEqual(mockData);
      });

      it('should pass query params', async () => {
        mockAxiosInstance.get.mockResolvedValue({ data: {} });

        await client.get('/v2/test', { page: 1, pageSize: 10 });

        expect(mockAxiosInstance.get).toHaveBeenCalledWith('/v2/test', {
          params: { page: 1, pageSize: 10 },
        });
      });
    });

    describe('post', () => {
      it('should make POST request and return data', async () => {
        const requestData = { name: 'Test' };
        const responseData = { id: '123', name: 'Test' };
        mockAxiosInstance.post.mockResolvedValue({ data: responseData });

        const result = await client.post('/v2/test', requestData);

        expect(mockAxiosInstance.post).toHaveBeenCalledWith(
          '/v2/test',
          requestData
        );
        expect(result).toEqual(responseData);
      });
    });

    describe('put', () => {
      it('should make PUT request and return data', async () => {
        const requestData = { id: '123', name: 'Updated' };
        mockAxiosInstance.put.mockResolvedValue({ data: requestData });

        const result = await client.put('/v2/test/123', requestData);

        expect(mockAxiosInstance.put).toHaveBeenCalledWith(
          '/v2/test/123',
          requestData
        );
        expect(result).toEqual(requestData);
      });
    });

    describe('delete', () => {
      it('should make DELETE request', async () => {
        mockAxiosInstance.delete.mockResolvedValue({ data: undefined });

        await client.delete('/v2/test/123');

        expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/v2/test/123');
      });
    });

    describe('patch', () => {
      it('should make PATCH request and return data', async () => {
        const requestData = { name: 'Patched' };
        const responseData = { id: '123', name: 'Patched' };
        mockAxiosInstance.patch.mockResolvedValue({ data: responseData });

        const result = await client.patch('/v2/test/123', requestData);

        expect(mockAxiosInstance.patch).toHaveBeenCalledWith(
          '/v2/test/123',
          requestData
        );
        expect(result).toEqual(responseData);
      });
    });
  });

  describe('getAuthorizationUrl', () => {
    it('should generate authorization URL with required params', () => {
      const url = VismaEAccountingClient.getAuthorizationUrl({
        clientId: 'test-client',
        redirectUri: 'http://localhost:3000/callback',
      });

      expect(url).toContain(
        'https://identity.vismaonline.com/connect/authorize'
      );
      expect(url).toContain('client_id=test-client');
      expect(url).toContain(
        'redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback'
      );
      expect(url).toContain('response_type=code');
      expect(url).toContain('scope=ea%3Aapi+ea%3Asales+offline_access');
    });

    it('should include custom scope', () => {
      const url = VismaEAccountingClient.getAuthorizationUrl({
        clientId: 'test-client',
        redirectUri: 'http://localhost:3000/callback',
        scope: 'custom:scope',
      });

      expect(url).toContain('scope=custom%3Ascope');
    });

    it('should include state parameter', () => {
      const url = VismaEAccountingClient.getAuthorizationUrl({
        clientId: 'test-client',
        redirectUri: 'http://localhost:3000/callback',
        state: 'random-state',
      });

      expect(url).toContain('state=random-state');
    });
  });

  describe('getAccessToken (static)', () => {
    beforeEach(() => {
      vi.mocked(axios.post).mockReset();
    });

    it('should exchange code for access token', async () => {
      const mockTokenResponse = {
        access_token: 'new-access-token',
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: 'new-refresh-token',
      };

      vi.mocked(axios.post).mockResolvedValue({ data: mockTokenResponse });

      const result = await VismaEAccountingClient.getAccessToken({
        clientId: 'test-client',
        clientSecret: 'test-secret',
        redirectUri: 'http://localhost:3000/callback',
        code: 'auth-code',
      });

      expect(axios.post).toHaveBeenCalledWith(
        'https://identity.vismaonline.com/connect/token',
        expect.any(URLSearchParams),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      expect(result).toEqual(mockTokenResponse);
    });

    it('should throw error on failure', async () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          data: {
            error_description: 'Invalid code',
          },
        },
        message: 'Request failed',
      };

      vi.mocked(axios.post).mockRejectedValue(axiosError);
      vi.mocked(axios.isAxiosError).mockReturnValue(true);

      await expect(
        VismaEAccountingClient.getAccessToken({
          clientId: 'test-client',
          clientSecret: 'test-secret',
          redirectUri: 'http://localhost:3000/callback',
          code: 'invalid-code',
        })
      ).rejects.toThrow('Failed to get access token: Invalid code');
    });
  });

  describe('refreshAccessToken', () => {
    beforeEach(() => {
      vi.mocked(axios.post).mockReset();
    });

    it('should refresh access token', async () => {
      const mockTokenResponse = {
        access_token: 'refreshed-access-token',
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: 'new-refresh-token',
      };

      vi.mocked(axios.post).mockResolvedValue({ data: mockTokenResponse });

      const result = await VismaEAccountingClient.refreshAccessToken({
        clientId: 'test-client',
        clientSecret: 'test-secret',
        refreshToken: 'old-refresh-token',
      });

      expect(axios.post).toHaveBeenCalledWith(
        'https://identity.vismaonline.com/connect/token',
        expect.any(URLSearchParams),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      expect(result).toEqual(mockTokenResponse);
    });

    it('should throw error on refresh failure', async () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          data: {
            error_description: 'Invalid refresh token',
          },
        },
        message: 'Request failed',
      };

      vi.mocked(axios.post).mockRejectedValue(axiosError);
      vi.mocked(axios.isAxiosError).mockReturnValue(true);

      await expect(
        VismaEAccountingClient.refreshAccessToken({
          clientId: 'test-client',
          clientSecret: 'test-secret',
          refreshToken: 'invalid-token',
        })
      ).rejects.toThrow('Failed to refresh token: Invalid refresh token');
    });
  });
});
