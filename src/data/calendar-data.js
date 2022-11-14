import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CalendarContext from '../contexts/calendar-context';

const CalendarDataHolder = ({ children }) => {
    const [loaded, setLoaded] = useState(false);
    const [openAddEvent, setOpenAddEvent] = useState(false)
    const [openDetailEvent, setOpenDetailEvent] = useState(false)

    const atrr = { loaded, openAddEvent, openDetailEvent }
    const meth = { setLoaded, setOpenAddEvent, setOpenDetailEvent }
    return (
        <CalendarContext.Provider value={{ atrr, meth }}>
            {children}
        </CalendarContext.Provider>
    );
};

CalendarDataHolder.propTypes = { children: PropTypes.node };

export default CalendarDataHolder;