import { Button } from '@mantine/core';
import { userService } from '../../services/UserService/UserService';
const ProfilePage = () => {
  return (
    <div>
      <h2>
        <Button onClick={() => userService.getProfile()}>Get profile</Button>
      </h2>
    </div>
  );
};

export default ProfilePage;
