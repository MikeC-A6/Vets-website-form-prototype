import { createRoutesWithSaveInProgress } from 'platform/forms/save-in-progress/helpers';
import formConfig from './config/form';
import SpruceApp from './containers/SpruceApp';

const route = {
  childRoutes: createRoutesWithSaveInProgress(formConfig),
  component: SpruceApp,
  indexRoute: { onEnter: (nextState, replace) => replace('/introduction') },
  path: '/',
};

export default route;
