import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CalendarContext from '../contexts/calendar-context';

const CalendarDataHolder = ({ children }) => {
    const [open, setOpen] = useState(false)
    const [dateSelected, setDateSelected] = useState('')
    const [serviceSelected, setServiceSelected] = useState('')

    const atrr = { open, dateSelected, serviceSelected }
    const meth = { setOpen, setDateSelected, setServiceSelected }
    return (
        <CalendarContext.Provider value={{ atrr, meth }}>
            {children}
        </CalendarContext.Provider>
    );
};

CalendarDataHolder.propTypes = { children: PropTypes.node };

export default CalendarDataHolder;