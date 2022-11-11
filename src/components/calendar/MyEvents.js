import React, { useState, useContext, useEffect } from "react";
import { Grid, GridCell } from "@rmwc/grid";
import FullCalendar from "./FullCalendar";
import AddEvent from "./AddEvent";
import ServicesApi from "../../api/ServicesApi";
import "./calendar.css";

const MyEvents = () => {
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


    const events = [
        {
            id: '1',
            title: '90 Minute Massage',
            start: '2022-11-04',
            resourceId: '1',
            editable: true,
            groupId: 'zzTop',
            backgroundColor: '#ff0000',
            borderColor: '#ff0000',
        },
        {
            id: '2',
            title: 'Haircut',
            start: '2022-11-05',
            resourceId: '2',
            editable: true,
        },
        {
            id: '3',
            title: 'Pedicure',
            start: '2022-11-06',
            resourceId: '3',
            editable: true,
            groupId: 'zzTop',
            backgroundColor: '#ff0000',
            borderColor: '#ff0000',
        },
    ];

    const method = () => {
        setOpenModel({ check: false });
        setRemoveEvents({ check: false, data: "" });
    };

    const handleWeekendsToggle = () => {
        setWeekendsVisible(!weekendsVisible);
    };

    const handleDateSelect = (selectInfo) => {
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
        <Grid>
            <GridCell desktop={1} tablet={12} phone={12} />
            <GridCell desktop={10} tablet={12} phone={12}>
                <div className={"calendar_container"}>
                    <FullCalendar
                        weekends={weekendsVisible}
                        select={handleDateSelect}
                        eventClick={handleEventClick}
                        eventsSet={handleEvents}
                        // events={events}
                    />
                </div>
            </GridCell>
            <GridCell desktop={1} tablet={12} phone={12} />
            {openmodel.check ? <AddEvent data={openmodel} method={method} /> : null}
        </Grid>
    );
};

export default MyEvents;
