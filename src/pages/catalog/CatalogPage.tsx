import { productService } from '../../services/ProductService/ProductService';
import { useEffect, useState } from 'react';
import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { createStyles } from '@mantine/core';
import HeaderCatalog from '../../components/catalog/header/HeaderCatalog';
import NavbarCatalog from '../../components/catalog/navbar/NavbarCatalog';
import ProductCard from '../../components/catalog/product-card/ProductCard';

const useStyles = createStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    marginBottom: '20px',
    gap: '20px',
  },

  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  items: {
    flex: '1 1 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '40px',
  },
}));

const CatalogPage = () => {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const { classes } = useStyles();

  useEffect(() => {
    const getProducts = async () => {
      const response = await productService.getProducts();
      const result = response?.body.results as ProductProjection[];

      setProducts(result);
    };
    getProducts();
  }, []);

  const brands: string[] = [];
  const sizes: string[] = [];
  const colors: string[] = [];
  const prices: number[] = [];

  function fillAtributeArrays(array: ProductVariant) {
    array.attributes?.forEach((attribute) => {
      switch (attribute.name) {
        case 'brand':
          if (!brands.includes(attribute.value.label)) brands.push(attribute.value.label);
          break;
        case 'size':
          if (!sizes.includes(attribute.value.label)) sizes.push(attribute.value.label);
          break;
        case 'color':
          if (!colors.includes(attribute.value.label)) colors.push(attribute.value.label);
          break;
      }
    });
  }

  products.forEach((product) => {
    fillAtributeArrays(product.masterVariant);
    product.variants.forEach((product) => {
      fillAtributeArrays(product);
    });
  });

  products.forEach((product) => {
    product.masterVariant.prices?.forEach((price) => {
      if (!prices.includes(price.value.centAmount / 100)) prices.push(price.value.centAmount / 100);
    });
  });

  const minProductPrice = Math.min.apply(null, prices);
  const maxProductPrice = Math.max.apply(null, prices);

  return products.length ? (
    <div className={classes.container}>
      <HeaderCatalog className={classes.header} />
      <div className={classes.content}>
        <NavbarCatalog
          brands={brands}
          sizes={sizes}
          colors={colors}
          minProductPrice={minProductPrice}
          maxProductPrice={maxProductPrice}
        />
        <div className={classes.items}>
          {products.map((product) => {
            return <ProductCard key={product.id} product={product.masterVariant} title={product.name['en-US']} />;
          })}
        </div>
      </div>
    </div>
  ) : null;
};

export default CatalogPage;
