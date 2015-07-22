import React from 'react';
import { RouteHandler } from 'react-router';
import './assets/scss/app.scss';

class App extends React.Component{
  render() {
    return (
      <RouteHandler {...this.props}/>
    )
  }
};

export default App;