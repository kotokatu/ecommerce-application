import CtpClient from '../api/BuildClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ErrorResponse } from '@commercetools/platform-sdk';
import { handleErrorResponse } from '../api/handleErrorResponse';
import { ClientResponse } from '@commercetools/sdk-client-v2';

class ProductService {
  private apiRoot: ByProjectKeyRequestBuilder;
  constructor() {
    this.apiRoot = new CtpClient().getApiRoot();
  }

  public async getProductTypes() {
    try {
      return await this.apiRoot.productTypes().get().execute();
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }

  public async getProduct(key: string) {
    try {
      await this.apiRoot.productProjections().withKey({ key }).get().execute();
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }
  public async getProducts() {
    try {
      return await this.apiRoot.productProjections().get().execute();
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }
  public async searchProducts() {
    try {
      await this.apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { filter: 'variants.attributes.size.key: "large"' } })
        .execute();
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }
}

export const productService = new ProductService();
