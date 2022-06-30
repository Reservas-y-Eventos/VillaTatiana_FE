import React from 'react';
import PropTypes from 'prop-types';
import { RMWCProvider } from '@rmwc/provider';
import { ThemeProvider } from '@rmwc/theme';
import DrawerProvider from './drawer/DrawerProvider';
import '@rmwc/theme/styles';
import '@rmwc/button/styles';
import '@rmwc/top-app-bar/styles';
import '@mdi/font/css/materialdesignicons.min.css';
import './mdc.css';
import './mdc-mobile.css';

const MaterialWrapper = ({ children }) => (
  <RMWCProvider
    icon={{
      strategy: 'className',
      basename: 'mdi',
      prefix: 'mdi-',
    }}>
    <ThemeProvider options={{
      primary: '#0069ff',
      primaryBg: '#0069ff',
      secondary: '#64dc17',
      secondaryBg: '#64dc17',
      error: '#d43551',
      background: '#fafafa',
      onSecondary: '#002a66',
    }}>
      <DrawerProvider>
        {children}
      </DrawerProvider>
    </ThemeProvider>
  </RMWCProvider>
);

MaterialWrapper.propTypes = {
  children: PropTypes.oneOfType(
    [PropTypes.object, PropTypes.arrayOf(PropTypes.element)]).isRequired,
};

export default MaterialWrapper;
