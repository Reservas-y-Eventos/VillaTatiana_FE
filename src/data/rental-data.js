import React, { useState } from "react";
import PropTypes from 'prop-types';
import RentalContext from "../contexts/rental-context";

const RentalDataHolder = ({ children }) => {
    const [openAddRental, setOpenAddRental] = useState(false)
    const [openEditItem, setOpenEditItem] = useState(false)
    const [openNewItem, setOpenNewItem] = useState(false)
    const [openListItem, setOpenListItem] = useState(false)

    const atrr = { openAddRental, openNewItem, openListItem, openEditItem }
    const meth = { setOpenAddRental, setOpenNewItem, setOpenListItem, setOpenEditItem }
    return (
        <RentalContext.Provider value={{ atrr, meth }}>
            {children}
        </RentalContext.Provider>
    );
};

RentalDataHolder.propTypes = { children: PropTypes.node };

export default RentalDataHolder;
