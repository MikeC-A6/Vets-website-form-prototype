import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import formConfig from './config/form';
import AidAttendanceApp from './containers/AidAttendanceApp';

const Routes = () => (
  <Switch>
    <Route
      exact
      path={formConfig.rootUrl}
      render={() => <Redirect to={`${formConfig.rootUrl}/introduction`} />}
    />
    <Route
      path={`${formConfig.rootUrl}/:page`}
      render={(props) => <AidAttendanceApp {...props} formConfig={formConfig} />}
    />
  </Switch>
);

export default Routes;