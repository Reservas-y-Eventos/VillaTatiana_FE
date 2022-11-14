import React, { useState, useContext, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ServicesApi from '../../../api/ServicesApi'
import CalendarContext from '../../../contexts/calendar-context'
import AlertMessageContext from '../../../contexts/alert-message-context'
import { useTranslation } from "react-i18next";

const FSBFullCalendar = (props) => {
    const { t } = useTranslation();
    const [eventsAdmin, setEventsAdmin] = useState([]);
    const [eventsUser, setEventsUser] = useState([]);
    const { atrr, meth } = useContext(CalendarContext)
    const { loaded, openDetailEvent } = atrr
    const { setLoaded } = meth
    const { dispatchData: dispatchNotification } = useContext(AlertMessageContext);

    useEffect(() => {
        ServicesApi.getAllDates()
            .then((res) => {
                // eslint-disable-next-line
                res.reservation.map((it, i) => {
                    setEventsAdmin((oldArray) => [...oldArray, {
                        id: it._id,
                        title: it.service,
                        start: it.date,
                        resourceId: it._id,
                        editable: true,
                    }])
                    setEventsUser((oldArray) => [...oldArray, {
                        id: it._id,
                        title: it.service,
                        start: it.date,
                        resourceId: it._id,
                        editable: true,
                        groupId: "zzTop",
                        backgroundColor: "#ff0000",
                        borderColor: "#ff0000"
                    }])
                })
                setLoaded(true)
            })
            .catch(() => dispatchNotification({ text: t("errorGetDates"), type: 'error' }))
        // eslint-disable-next-line
    }, [openDetailEvent])

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