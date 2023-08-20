import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export class TokenCacheHandler implements TokenCache {
  tokenCaсhe: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: undefined,
  };

  set(newCache: TokenStore) {
    this.tokenCaсhe = newCache;
  }

  get() {
    return this.tokenCaсhe;
  }
}
