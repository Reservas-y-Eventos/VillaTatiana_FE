import "./App.css";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import MaterialWrapper from "./components/mdc/MaterialWrapper";
import DrawerWrapper from "./components/mdc/drawer/DrawerWrapper";
import Toolbar from "./components/mdc/Toolbar";
import AlertMessage from "./components/mdc/alertNotification/alert-message";
import RoutesAdmin from "./routes/routesAdmin";
import peaksBg from "../src/res/images/background.svg"
import AlertMessageDataHolder from "./data/alert-message-data";

const App = () => {
  return (
    <div style={{
      backgroundImage: `url(${peaksBg})`,
      width: "100%",
      minHeight: "100vh",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}>
      <BrowserRouter>
        <MaterialWrapper>
          <AlertMessageDataHolder>
            <DrawerWrapper />
            <Toolbar />
            <AlertMessage />
            <RoutesAdmin />
          </AlertMessageDataHolder>
        </MaterialWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
