import CtpClient from '../api/BuildClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ErrorResponse, ProductProjection, ProductTypePagedQueryResponse } from '@commercetools/platform-sdk';
import { handleErrorResponse } from '../api/handleErrorResponse';
import { ClientResponse } from '@commercetools/sdk-client-v2';

class ProductService {
  private apiRoot: ByProjectKeyRequestBuilder;
  constructor() {
    this.apiRoot = new CtpClient().getApiRoot();
  }

  public async getProductTypes(): Promise<ProductTypePagedQueryResponse | undefined> {
    try {
      const productTypes = await this.apiRoot.productTypes().get().execute();
      return productTypes.body;
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }

  public async searchProducts(params: Record<string, string>) {
    try {
      const products = await this.apiRoot.productProjections().search().get({ queryArgs: params }).execute();
      return products.body.results;
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }

  public async getProduct(ID: string): Promise<ProductProjection | undefined> {
    try {
      const productData = await this.apiRoot.productProjections().withId({ ID }).get().execute();
      return productData.body;
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }

  public async getProduct(ID: string): Promise<ProductProjection | undefined> {
    const productData = await this.apiRoot.productProjections().withId({ ID }).get().execute();
    return productData.body;
  }
}

export const productService = new ProductService();
