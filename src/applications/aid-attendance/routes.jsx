import { createRoutesWithSaveInProgress } from 'platform/forms/save-in-progress/helpers';
import formConfig from './config/form';
import AidAttendanceApp from './containers/AidAttendanceApp';

const route = {
  path: '/',
  component: AidAttendanceApp,
  indexRoute: { onEnter: (nextState, replace) => replace('/introduction') },

  childRoutes: createRoutesWithSaveInProgress(formConfig),
};

export default route;
