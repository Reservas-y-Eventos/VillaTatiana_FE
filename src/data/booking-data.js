import React, { useState } from "react";
import PropTypes from 'prop-types';
import BookingContext from "../contexts/booking-context";

const BookingDataHolder = ({ children }) => {
    const [openDetail, setOpenDetail] = useState(false)

    const atrr = { openDetail }
    const meth = { setOpenDetail }
    return (
        <BookingContext.Provider value={{ atrr, meth }}>
            {children}
        </BookingContext.Provider>
    );
};

BookingDataHolder.propTypes = { children: PropTypes.node };

export default BookingDataHolder;