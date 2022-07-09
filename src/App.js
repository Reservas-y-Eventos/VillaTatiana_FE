import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MaterialWrapper from './components/mdc/MaterialWrapper';
import DrawerWrapper from './components/mdc/drawer/DrawerWrapper';
import Toolbar from './components/mdc/Toolbar';
import LogIn from './components/sites/login/login';

const App = () => {
  return (
    <BrowserRouter>
      <MaterialWrapper>
        <DrawerWrapper />
        <Toolbar />
      </MaterialWrapper>
    </BrowserRouter>
  );
}

export default App;
