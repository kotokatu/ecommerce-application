import { ctpClient } from './BuildClient';
import {
  //ApiRoot,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { PROJECT_KEY } from '../../utils/constants/api';

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: PROJECT_KEY });

const getProject = () => {
  return apiRoot.get().execute();
};

getProject().then(console.log).catch(console.error);
