import React, { useReducer } from "react";
import PropTypes from "prop-types";
import DrawerContext from "./DrawerContext";

const openDrawerReducer = (data, action) => {
    return action;
};

const DrawerProvider = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useReducer(openDrawerReducer, false);

    const data = { drawerOpen, setDrawerOpen };

    return (
        <DrawerContext.Provider value={data}>
            {children}
        </DrawerContext.Provider>
    );
};

DrawerProvider.propTypes = {
    children: PropTypes.oneOfType(
        [PropTypes.object, PropTypes.arrayOf(PropTypes.element)]).isRequired,
};

export default DrawerProvider;
