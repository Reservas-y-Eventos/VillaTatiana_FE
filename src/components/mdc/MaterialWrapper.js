import React from "react";
import PropTypes from "prop-types";
import { RMWCProvider } from "@rmwc/provider";
import { ThemeProvider } from "@rmwc/theme";
import DrawerProvider from "./drawer/DrawerProvider";
import "@rmwc/icon/styles";
import "@rmwc/theme/styles";
import "@rmwc/button/styles";
import "@rmwc/avatar/styles";
import "@rmwc/menu/styles";
import "@rmwc/top-app-bar/styles";
import "@rmwc/snackbar/styles";
import "@rmwc/drawer/styles";
import "@rmwc/list/styles";
import "@rmwc/icon-button/styles";
import "@rmwc/textfield/styles";
import "@rmwc/fab/styles";
import "@rmwc/data-table/styles";
import "@mdi/font/css/materialdesignicons.min.css";
import "@rmwc/select/styles";
import "@rmwc/formfield/styles";
import "@rmwc/grid/styles";
import "@rmwc/checkbox/styles";
import "@rmwc/circular-progress/styles";
import "@rmwc/radio/styles";
import "@rmwc/switch/styles";
import "@rmwc/slider/styles";
import "@rmwc/dialog/styles";
import "@rmwc/badge/styles";
import "@rmwc/tooltip/styles";
import "@rmwc/elevation/styles";
import "@rmwc/typography/styles";
import "@rmwc/card/styles";
import "@rmwc/linear-progress/styles";
import "@rmwc/chip/styles";
import "@rmwc/tabs/styles";
import "./mdc.css";
import "./mdc-mobile.css";

const MaterialWrapper = ({ children }) => (
  <RMWCProvider
    icon={{
      strategy: "className",
      basename: "mdi",
      prefix: "mdi-",
    }}>
    <ThemeProvider options={{
      primary: "#2EBEC6",
      primaryBg: "#2EBEC6",
      secondary: "#39D7FE",
      secondaryBg: "#39D7FE",
      error: "#d43551",
      background: "#FAFAFA",
      onPrimary: "#FFF",
      onSecondary: "#39D7FE",
      onSurface: "#000",
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
