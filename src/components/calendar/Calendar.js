import React, { useContext } from "react";
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { Grid, GridCell } from "@rmwc/grid";
import CalendarContext from "../../contexts/calendar-context";
import "./calendar.css"
import AddEvent from "./AddEvent";

const Calendar = () => {
    const { atrr, meth } = useContext(CalendarContext)
    const { setOpen, setDateSelected } = meth

    const handleDateSelect = (data) => {
        console.log(data);
        setDateSelected(data.startStr);
        setOpen(true)
    };

    const handleEventClick = (clickInfo) => {
    };

    const handleEvents = (events) => {
    };
    return (
        <Grid>
            <GridCell desktop={1} tablet={12} phone={12} />
            <GridCell desktop={10} tablet={12} phone={12}>
                <div className={"calendar_container"}>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay"
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handleDateSelect}
                        eventClick={handleEventClick}
                        eventsSet={handleEvents}
                    />
                </div>
            </GridCell>
            <GridCell desktop={1} tablet={12} phone={12} />
            <AddEvent />
        </Grid>
    )
}

export default Calendar