import { storeService } from '../StoreService/StoreService';

export type CategoryType = {
  id: string;
  name: string;
  parentID?: string;
  parentName?: string;
};

class CategoryCache {
  categories: CategoryType[] = [];
  constructor() {
    this.get();
  }

  async get() {
    const categories = await storeService.getCategories();
    if (categories) {
      this.categories = categories.map((category) => ({
        id: category.id,
        name: category.name['en-US'],
        parentID: category.parent?.obj?.id,
        parentName: category.parent?.obj?.name['en-US'],
      }));
    }
  }

  public getCategoryName(id: string): string | undefined {
    return this.categories.find((category) => category.id === id)?.name;
  }

  public getCategoryID(name: string, parentName?: string): string | undefined {
    return parentName
      ? this.categories.find((category) => category.name === name && category.parentName === parentName)?.id
      : this.categories.find((category) => category.name === name)?.id;
  }
}

export const categoryCache = new CategoryCache();
