import { storeService } from '../StoreService/StoreService';
import { notificationError } from '../../components/ui/notification';

export type CategoryType = {
  id: string;
  name: string;
  order: string;
  parentID?: string;
  parentName?: string;
};

export class CategoryCache {
  categories: CategoryType[] = [];

  public async get() {
    try {
      const categories = await storeService.getCategories();
      if (categories) {
        this.categories = categories.map((category) => ({
          id: category.id,
          name: category.name['en-US'],
          order: category.orderHint,
          parentID: category.parent?.obj?.id,
          parentName: category.parent?.obj?.name['en-US'],
        }));
      }
    } catch (err) {
      if (err instanceof Error) notificationError(err.message);
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
