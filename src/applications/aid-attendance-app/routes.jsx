import { createRoutesWithSaveInProgress } from 'platform/forms/save-in-progress/helpers';
import formConfig from './config/form';
import AidAttendanceApp from './containers/AidAttendanceApp';

const route = {
  childRoutes: createRoutesWithSaveInProgress(formConfig),
  component: AidAttendanceApp,
  indexRoute: { onEnter: (nextState, replace) => replace('/introduction') },
  path: '/',
};

export default route;
