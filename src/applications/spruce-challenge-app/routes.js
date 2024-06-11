import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import ErrorBoundary from './components/ErrorBoundary';

// const ErrorBoundaryWrapper = props => (
//   <ErrorBoundary>
//     <Avs {...props} />
//   </ErrorBoundary>
// );

import LandingPage from './pages/LandingPage';

const routes = (
  <Switch>
    <Route path="/" component={LandingPage} />
  </Switch>
);

export default routes;
