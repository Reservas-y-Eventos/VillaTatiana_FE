import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MaterialWrapper from './components/mdc/MaterialWrapper';
import DrawerWrapper from './components/mdc/drawer/DrawerWrapper';
import Toolbar from './components/mdc/Toolbar';
import RoutesAdmin from './routes/routesAdmin';
import peaksBg from '../src/res/images/background.svg'

const App = () => {
  return (
    <div style={{
      backgroundImage: `url(${peaksBg})`,
      width: '100%',
      minHeight: '100vh',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}>
      <BrowserRouter>
        <MaterialWrapper>
          <DrawerWrapper />
          <Toolbar />
          <RoutesAdmin />
        </MaterialWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
