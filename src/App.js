import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Homepage from './pages/Homepage.js';
import Marketpage from './pages/Marketpage.js';


function App() {
  <Router>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/items" component={Marketpage} />
    </Switch>
</Router>
}

export default App;
