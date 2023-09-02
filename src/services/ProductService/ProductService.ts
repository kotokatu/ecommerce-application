import CtpClient from '../api/BuildClient';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { ProductProjection, ProductType, TermFacetResult, FacetTerm } from '@commercetools/platform-sdk';
import { getErrorMessage } from '../../utils/helpers/error-handler';

export const FilterParams = {
  category: 'categories.id',
  brand: 'variants.attributes.brand.label',
  color: 'variants.attributes.color.label',
  size: 'variants.attributes.size.label',
  price: 'variants.price.centAmount',
};

export type QueryArgs = {
  filter?: string | string[] | undefined;
  ['text.en-US']?: string;
  facet?: string | string[];
  ['filter.facets']?: string | string[];
  fuzzy?: boolean;
};

export type GetProductsReturnType = {
  categories: FacetTerm[];
  brands: FacetTerm[];
  colors: FacetTerm[];
  sizes: FacetTerm[];
  prices: FacetTerm[];
  products: ProductProjection[];
};

class ProductService {
  private apiRoot: ByProjectKeyRequestBuilder;
  constructor() {
    this.apiRoot = new CtpClient().getApiRoot();
  }

  public async getProductTypes(): Promise<ProductType[] | undefined> {
    try {
      const productTypes = await this.apiRoot.productTypes().get().execute();
      return productTypes.body.results;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async getProduct(ID: string): Promise<ProductProjection> {
    const productData = await this.apiRoot.productProjections().withId({ ID }).get().execute();
    return productData.body;
  }

  public async getCategories() {
    try {
      const categories = await this.apiRoot
        .categories()
        .get({ queryArgs: { expand: 'parent' } })
        .execute();
      return categories.body.results;
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }

  public async getProducts(params: QueryArgs): Promise<GetProductsReturnType | undefined> {
    try {
      const response = await this.apiRoot
        .productProjections()
        .search()
        .get({
          queryArgs: {
            ...params,
            facet: Object.values(FilterParams),
          },
        })
        .execute();
      const { facets, results: products } = response.body;
      const [categories, brands, colors, sizes, prices] = Object.values(FilterParams).map((facet) =>
        (facets[facet] as TermFacetResult).terms.map((term) => term.term),
      );
      return { categories, brands, colors, sizes, prices, products };
    } catch (err) {
      throw new Error(getErrorMessage(err));
    }
  }
}

export const productService = new ProductService();
