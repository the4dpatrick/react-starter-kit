import React from 'react';
import { 
  Route, 
  DefaultRoute, 
} from 'react-router';

import App from './App';
import Home from './pages/Home/Home';

let routes = (
  <Route handler={App}>
    <DefaultRoute handler={Home} />
  </Route>
);

export default routes;