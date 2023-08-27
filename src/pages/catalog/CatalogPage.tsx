import { Button } from '@mantine/core';
import { userService } from '../../services/UserService/UserService';
const CatalogPage = () => {
  return (
    <div>
      <h2>
        <Button onClick={() => userService.getProducts()}>Get products</Button>
      </h2>
    </div>
  );
};

export default CatalogPage;
