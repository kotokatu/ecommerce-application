import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export class CastomTokenCache implements TokenCache {
  castomCaсhe: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: undefined,
  };

  set(newCache: TokenStore) {
    this.castomCaсhe = newCache;
  }

  get() {
    return this.castomCaсhe;
  }
}
