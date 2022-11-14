import React, { useContext, useEffect, useState } from "react";
import { Button } from "@rmwc/button";
import { Typography } from "@rmwc/typography";
import { Grid, GridCell, GridRow } from "@rmwc/grid";
import { Dialog, DialogContent, DialogTitle } from "@rmwc/dialog";
import { useTranslation } from "react-i18next";
import CalendarContext from "../../contexts/calendar-context";
import AlertMessageContext from '../../contexts/alert-message-context'
import ServicesApi from "../../api/ServicesApi";

const DetailEvent = (props) => {
    const { t } = useTranslation();
    const { data } = props
    const { dispatchData: dispatchNotification } = useContext(AlertMessageContext);
    const { atrr, meth } = useContext(CalendarContext);
    const { openDetailEvent } = atrr
    const { setOpenDetailEvent, setLoaded } = meth
    const [bookingEvent, setBookingEvent] = useState([])

    useEffect(() => {
        if (data.event) {
            console.log('data ', data.event._def.publicId);
            ServicesApi.getReservationById(data.event._def.publicId)
                .then((res) => setBookingEvent(res.reservation))
                .catch((err) => console.log(err))
        }
    }, [data])

    const deleteReservation = () => {
        ServicesApi.deleteReservationById(data.event._def.publicId)
            .then(() => {
                setOpenDetailEvent(false)
                dispatchNotification({ text: t("successDeleteReservation"), type: 'success' })
            })
            .catch(()=>dispatchNotification({ text: t("errorDeleteReservation"), type: 'error' }))
    }

    return (
        <>
            <Dialog open={openDetailEvent} onClose={() => setOpenDetailEvent(false)} >
                <DialogTitle>
                    {t("confirmDetail")}
                </DialogTitle>
                <DialogContent>
                    <Grid>
                        <GridCell desktop={12} tablet={12} phone={12}>
                            <GridRow>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {t("service")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {bookingEvent.service}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {t("date")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {bookingEvent.date}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {t("itemName")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {bookingEvent.name}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {t("email")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {bookingEvent.email}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {t("phone")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {bookingEvent.phone}
                                    </Typography>
                                </GridCell>
                            </GridRow>
                        </GridCell>
                        <GridCell desktop={12} tablet={12} phone={12}>
                            <GridRow>
                                <GridCell desktop={6}>
                                    <Button label={t("close")} raised className={"button-full"}
                                        onClick={() => setOpenDetailEvent(false)} />
                                </GridCell>
                                <GridCell desktop={6}>
                                    <Button label={t("delete")} raised className={"button-full"}
                                        danger onClick={() => deleteReservation()} />
                                </GridCell>
                            </GridRow>
                        </GridCell>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DetailEvent