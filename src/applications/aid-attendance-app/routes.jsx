import { createRoutesWithSaveInProgress } from 'platform/forms/save-in-progress/helpers';
import formConfig from './config/form';
import AidAttendanceApp from './containers/AidAttendanceApp';

const routes = {
  path: formConfig.rootUrl,
  component: AidAttendanceApp,
  indexRoute: {
    onEnter: (nextState, replace) =>
      replace(`${formConfig.rootUrl}/introduction`),
  },
  childRoutes: createRoutesWithSaveInProgress(formConfig),
};

export default routes;
