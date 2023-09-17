import CtpClient from './BuildClient';
import { tokenCache } from './TokenCache';

describe('CtpClient', () => {
  describe('getClient', () => {
    it('should return a client with password flow when userAuthOptions is provided', () => {
      const userAuthOptions = {
        username: 'testuser',
        password: 'testpassword',
      };

      const ctpClient = new CtpClient(userAuthOptions);
      const client = ctpClient['getClient']();

      expect(client).toBeDefined();
    });

    it('should return a client with refresh token flow when a valid refresh token is available', () => {
      jest.spyOn(tokenCache, 'getRefreshToken').mockReturnValue('valid_refresh_token');
      jest.spyOn(tokenCache, 'checkToken').mockReturnValue(true);

      const ctpClient = new CtpClient();
      const client = ctpClient['getClient']();

      expect(client).toBeDefined();
    });

    it('should return a client with anonymous session flow when no userAuthOptions or refresh token is available', () => {
      const ctpClient = new CtpClient();
      const client = ctpClient['getClient']();

      expect(client).toBeDefined();
    });
  });

  describe('getApiRoot', () => {
    it('should return an apiRoot', () => {
      const ctpClient = new CtpClient();
      const apiRoot = ctpClient.getApiRoot();

      expect(apiRoot).toBeDefined();
    });
  });
});
