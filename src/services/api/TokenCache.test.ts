import { TokenCacheHandler, tokenCache } from './TokenCache';

describe('TokenCacheHandler', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  describe('get', () => {
    it('should return empty cache if no token is stored', () => {
      const cache = new TokenCacheHandler();
      expect(cache.get()).toEqual({
        token: '',
        expirationTime: 0,
        refreshToken: '',
      });
    });

    it('should return cached token if one is stored', () => {
      const cache = new TokenCacheHandler();
      const token = {
        token: 'testToken',
        expirationTime: Date.now() + 1000,
        refreshToken: 'testRefreshToken',
      };
      window.localStorage.setItem('ct-token-30fingers', JSON.stringify(token));
      expect(cache.get()).toEqual(token);
    });
  });

  describe('set', () => {
    it('should store token in localStorage', () => {
      const cache = new TokenCacheHandler();
      const token = {
        token: 'testToken',
        expirationTime: Date.now() + 1000,
        refreshToken: 'testRefreshToken',
      };
      cache.set(token);
      expect(window.localStorage.getItem('ct-token-30fingers')).toEqual(JSON.stringify(token));
    });
  });

  describe('getAccessToken', () => {
    it('should return cached access token', () => {
      const token = {
        token: 'testToken',
        expirationTime: Date.now() + 1000,
        refreshToken: 'testRefreshToken',
      };
      window.localStorage.setItem('ct-token-30fingers', JSON.stringify(token));
      const cache = new TokenCacheHandler();
      expect(cache.getAccessToken()).toEqual('testToken');
    });
  });

  describe('getRefreshToken', () => {
    it('should return cached refresh token', () => {
      const token = {
        token: 'testToken',
        expirationTime: Date.now() + 1000,
        refreshToken: 'testRefreshToken',
      };
      window.localStorage.setItem('ct-token-30fingers', JSON.stringify(token));
      const cache = new TokenCacheHandler();
      expect(cache.getRefreshToken()).toEqual('testRefreshToken');
    });
  });

  describe('checkToken', () => {
    it('should return true if token is valid', () => {
      const token = {
        token: 'testToken',
        expirationTime: Date.now() + 1000,
        refreshToken: 'testRefreshToken',
      };
      window.localStorage.setItem('ct-token-30fingers', JSON.stringify(token));
      const cache = new TokenCacheHandler();
      expect(cache.checkToken()).toEqual(true);
    });

    it('should return false if token is expired', () => {
      const token = {
        token: 'testToken',
        expirationTime: Date.now() - 1000,
        refreshToken: 'testRefreshToken',
      };
      window.localStorage.setItem('ct-token-30fingers', JSON.stringify(token));
      const cache = new TokenCacheHandler();
      expect(cache.checkToken()).toEqual(false);
    });

    it('should clear cache if token is expired', () => {
      const token = {
        token: 'testToken',
        expirationTime: Date.now() - 1000,
        refreshToken: 'testRefreshToken',
      };
      window.localStorage.setItem('ct-token-30fingers', JSON.stringify(token));
      const cache = new TokenCacheHandler();
      cache.checkToken();
      expect(window.localStorage.getItem('ct-token-30fingers')).toEqual(null);
    });
  });

  describe('clear', () => {
    it('should clear cache from localStorage', () => {
      const token = {
        token: 'testToken',
        expirationTime: Date.now() + 1000,
        refreshToken: 'testRefreshToken',
      };
      window.localStorage.setItem('ct-token-30fingers', JSON.stringify(token));
      const cache = new TokenCacheHandler();
      cache.clear();
      expect(window.localStorage.getItem('ct-token-30fingers')).toEqual(null);
    });
  });
});

describe('tokenCache', () => {
  it('should be an instance of TokenCacheHandler', () => {
    expect(tokenCache).toBeInstanceOf(TokenCacheHandler);
  });
});
