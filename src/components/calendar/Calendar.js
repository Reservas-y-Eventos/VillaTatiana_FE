import React from "react";
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { Grid, GridCell } from "@rmwc/grid";
import "./calendar.css"

const Calendar = () => {
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
                    />
                </div>
            </GridCell>
            <GridCell desktop={1} tablet={12} phone={12} />
        </Grid>
    )
}

export default Calendar