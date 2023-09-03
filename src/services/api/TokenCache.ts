import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';
const TOKEN_STORAGE_KEY = 'ct-token-30fingers';
export class TokenCacheHandler implements TokenCache {
  cache: TokenStore;
  constructor() {
    this.cache = {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    };

    this.get();
  }

  get(): TokenStore {
    const storedValue = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (storedValue) {
      this.cache = JSON.parse(storedValue) as TokenStore;
    }
    return this.cache;
  }
  set(cache: TokenStore) {
    this.cache = cache;
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(this.cache));
  }

  getAccessToken() {
    return this.cache.token;
  }
  getRefreshToken() {
    return this.cache.refreshToken;
  }

  clear() {
    this.cache = {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    };
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}

// export const tokenCache = new TokenCacheHandler();
