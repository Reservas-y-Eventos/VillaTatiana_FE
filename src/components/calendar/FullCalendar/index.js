import React, { useState, useContext, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ServicesApi from '../../../api/ServicesApi'
import AlertMessageContext from '../../../contexts/alert-message-context'

const FSBFullCalendar = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [eventsAdmin, setEventsAdmin] = useState([]);
    const [eventsUser, setEventsUser] = useState([]);
    const { dispatchData: dispatchNotification } = useContext(AlertMessageContext);

    useEffect(() => {
        ServicesApi.getAllDates()
            .then((res) => {
                res.reservation.map((it, i) => {
                    setEventsAdmin((oldArray) => [...oldArray, {
                        id: i,
                        title: it.service,
                        start: it.date,
                        resourceId: i,
                        editable: true,
                    }])
                    setEventsUser((oldArray) => [...oldArray, {
                        id: i,
                        title: it.service,
                        start: it.date,
                        resourceId: i,
                        editable: true,
                        groupId: "zzTop",
                        backgroundColor: "#ff0000",
                        borderColor: "#ff0000"
                    }])
                })
                setLoaded(true)
            })
            .catch((err) => dispatchNotification({ text: err, type: 'error' }))
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {loaded
                ? <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView='dayGridMonth'
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    initialEvents={localStorage.getItem('rol') === 'ADMIN' ? eventsAdmin : eventsUser}
                    {...props}
                />
                : <></>
            }
        </>
    )
}

export default FSBFullCalendar;