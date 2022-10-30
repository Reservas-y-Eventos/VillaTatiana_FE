import React, { useState } from "react";
import Calendar from "./Calendar";
import AddEvent from "./AddEvent";
import RemoveEvent from "./RemoveEvent.js";

const CalendarEvent = () => {
    const [weekendsVisible, setWeekendsVisible] = useState(true);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [openmodel, setOpenModel] = useState({
        check: false,
        data: ""
    });
    const [removeEvents, setRemoveEvents] = useState({
        check: false,
        data: ""
    });

    const method = () => {
        setOpenModel({ check: false });
        setRemoveEvents({ check: false, data: "" });
    };

    const handleWeekendsToggle = () => {
        setWeekendsVisible(!weekendsVisible);
    };

    const handleDateSelect = (selectInfo) => { 
        console.log('Click');
        setOpenModel({
            check: true,
            data: selectInfo
        });
    };

    const handleEventClick = (clickInfo) => {
        setRemoveEvents({
            check: true,
            data: clickInfo
        });
    };

    const handleEvents = (events) => {
        setCurrentEvents(events);
    };

    return (
        <Calendar
            weekends={weekendsVisible}
            select={handleDateSelect}
            eventClick={handleEventClick}
            eventsSet={handleEvents}
        />
    );
};

export default CalendarEvent;