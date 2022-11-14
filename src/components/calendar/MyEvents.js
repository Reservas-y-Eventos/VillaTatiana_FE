/* eslint-disable */
import React, { useContext, useState } from "react";
import { Grid, GridCell } from "@rmwc/grid";
import CalendarContext from "../../contexts/calendar-context";
import FullCalendar from "./FullCalendar";
import AddEvent from "./AddEvent";
import "./calendar.css";
import DetailEvent from "./DetailEvent";

const MyEvents = () => {
    const { meth } = useContext(CalendarContext);
    const { setOpenAddEvent, setOpenDetailEvent } = meth;
    const [eventData, setEventData] = useState([])
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

    const handleDateSelect = (selectInfo) => {
        setOpenAddEvent(true)
        setOpenModel({
            check: true,
            data: selectInfo
        });
    };

    const handleEventClick = (clickInfo) => {
        setOpenDetailEvent(true)
        setEventData(clickInfo)
        setRemoveEvents({
            check: true,
            data: clickInfo
        });
    };

    const handleEvents = (events) => {
        setCurrentEvents(events);
    };

    return (
        <Grid>
            <GridCell desktop={1} tablet={12} phone={12} />
            <GridCell desktop={10} tablet={12} phone={12}>
                <div className={"calendar_container"}>
                    <FullCalendar
                        weekends={weekendsVisible}
                        select={handleDateSelect}
                        eventClick={handleEventClick}
                        eventsSet={handleEvents}
                    />
                </div>
            </GridCell>
            <GridCell desktop={1} tablet={12} phone={12} />
            {openmodel.check ? <AddEvent data={openmodel} method={method} /> : null}
            <DetailEvent data={eventData} />
        </Grid>
    );
};

export default MyEvents;
