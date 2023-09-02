import { productService } from '../ProductService/ProductService';

export type CategoryType = {
  id: string;
  name: string;
  parentID?: string;
  parentName?: string;
};

export class CategoryCache {
  categories: CategoryType[] = [];
  constructor() {
    this.get();
  }

  async get() {
    const categories = await productService.getCategories();
    if (categories) {
      this.categories = categories.map((category) => ({
        id: category.id,
        name: category.name['en-US'],
        parentID: category.parent?.obj?.id,
        parentName: category.parent?.obj?.name['en-US'],
      }));
    }
  }
}