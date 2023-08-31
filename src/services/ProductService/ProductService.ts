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

  public async getProducts() {
    try {
      return await this.apiRoot.productProjections().get().execute();
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }
  public async searchProducts(params: Record<string, string>) {
    try {
      return await this.apiRoot.productProjections().search().get({ queryArgs: params }).execute();
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
  public async getCategories() {
    try {
      return await this.apiRoot
        .categories()
        .get({ queryArgs: { expand: 'parent' } })
        .execute();
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }
  public async getCategyName(categoryId: string) {
    try {
      const category = await this.apiRoot
        .categories()
        .get({ queryArgs: { where: `id="${categoryId}"` } })
        .execute();
      return category.body.results[0].name['en-US'];
    } catch (err) {
      handleErrorResponse(err as ClientResponse<ErrorResponse> | Error);
    }
  }
}

export const productService = new ProductService();
