import { CategoryCache, CategoryType } from './CategoryCache';
import { storeService } from '../StoreService/StoreService';
import { notificationError } from '../../components/ui/notification';
import { Category } from '@commercetools/platform-sdk';

jest.mock('../StoreService/StoreService', () => ({
  storeService: {
    getCategories: jest.fn(),
  },
}));

jest.mock('../../components/ui/notification', () => ({
  notificationError: jest.fn(),
}));

describe('CategoryCache', () => {
  let categoryCache: CategoryCache;

  beforeEach(() => {
    categoryCache = new CategoryCache();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should set the categories property with the correct values', async () => {
      const mockIncomingCategories: Category[] = [
        {
          id: '1',
          version: 1,
          createdAt: '',
          lastModifiedAt: '',
          slug: { 'en-US': '' },
          name: { 'en-US': 'Category 1' },
          orderHint: '1',
          ancestors: [],
          parent: {
            typeId: 'category',
            id: '',
            obj: {
              id: 'parent1',
              orderHint: '0.01',
              ancestors: [],
              name: { 'en-US': 'Parent 1' },
              version: 1,
              createdAt: '',
              lastModifiedAt: '',
              slug: { 'en-US': '' },
            },
          },
        },
      ];

      const mockCategories: CategoryType[] = [
        {
          id: '1',
          name: 'Category 1',
          order: '1',
          parentID: 'parent1',
          parentName: 'Parent 1',
        },
      ];

      (storeService.getCategories as jest.Mock).mockResolvedValueOnce(mockIncomingCategories);
      await categoryCache.get();
      expect(storeService.getCategories).toHaveBeenCalled();
      expect(categoryCache.categories).toEqual(mockCategories);
    });

    it('should handle the error and show a notification', async () => {
      const mockError = new Error('Failed to get categories');
      (storeService.getCategories as jest.Mock).mockRejectedValueOnce(mockError);

      await categoryCache.get();

      expect(notificationError).toHaveBeenCalledWith(mockError.message);
    });
  });

  describe('getCategoryName', () => {
    it('should return the category name for a given category ID', () => {
      categoryCache.categories = [
        {
          id: '1',
          name: 'Category 1',
          order: '1',
        },
        {
          id: '2',
          name: 'Category 2',
          order: '2',
        },
      ];

      const categoryName = categoryCache.getCategoryName('2');

      expect(categoryName).toEqual('Category 2');
    });

    it('should return undefined if the category ID is not found', () => {
      categoryCache.categories = [
        {
          id: '1',
          name: 'Category 1',
          order: '1',
        },
        {
          id: '2',
          name: 'Category 2',
          order: '2',
        },
      ];

      const categoryName = categoryCache.getCategoryName('3');

      expect(categoryName).toBeUndefined();
    });
  });

  describe('getCategoryID', () => {
    it('should return the category ID for a given category name', () => {
      categoryCache.categories = [
        {
          id: '1',
          name: 'Category 1',
          order: '1',
        },
        {
          id: '2',
          name: 'Category 2',
          order: '2',
        },
      ];

      const categoryID = categoryCache.getCategoryID('Category 2');

      expect(categoryID).toEqual('2');
    });

    it('should return the category ID for a given category name and parent name', () => {
      categoryCache.categories = [
        {
          id: '1',
          name: 'Category 1',
          order: '1',
          parentName: 'Parent 1',
        },
        {
          id: '2',
          name: 'Category 2',
          order: '2',
          parentName: 'Parent 2',
        },
      ];

      const categoryID = categoryCache.getCategoryID('Category 2', 'Parent 2');

      expect(categoryID).toEqual('2');
    });

    it('should return undefined if the category name or parent name is not found', () => {
      categoryCache.categories = [
        {
          id: '1',
          name: 'Category 1',
          order: '1',
        },
        {
          id: '2',
          name: 'Category 2',
          order: '2',
        },
      ];

      const categoryID = categoryCache.getCategoryID('Category 3');

      expect(categoryID).toBeUndefined();
    });
  });
});
