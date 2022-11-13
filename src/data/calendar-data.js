import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CalendarContext from '../contexts/calendar-context';

const CalendarDataHolder = ({ children }) => {
    const [openAddEvent, setOpenAddEvent] = useState(false)

    const atrr = { openAddEvent }
    const meth = { setOpenAddEvent }
    return (
        <CalendarContext.Provider value={{ atrr, meth }}>
            {children}
        </CalendarContext.Provider>
    );
};

CalendarDataHolder.propTypes = { children: PropTypes.node };

export default CalendarDataHolder;