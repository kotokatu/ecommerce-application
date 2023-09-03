import { Button } from '@mantine/core';
import { storeService } from '../../services/StoreService/StoreService';
const ProfilePage = () => {
  return (
    <div>
      <h2>
        <Button onClick={() => storeService.getUserProfile()}>Get profile</Button>
      </h2>
    </div>
  );
};

export default ProfilePage;
