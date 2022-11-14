import React, { useContext, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@rmwc/dialog";
import { Grid, GridCell, GridRow } from "@rmwc/grid";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { Select } from "@rmwc/select";
import { Typography } from "@rmwc/typography";
import { useTranslation } from "react-i18next";
import CalendarContext from "../../contexts/calendar-context";
import AlertMessageContext from "../../contexts/alert-message-context";
import ServicesApi from "../../api/ServicesApi";
import styles from "./addEvent.module.css"

const AddEvent = (props) => {
    const { t } = useTranslation();
    const { dispatchData: dispatchNotification } = useContext(AlertMessageContext);
    const { atrr, meth } = useContext(CalendarContext);
    const { openAddEvent } = atrr;
    const { setOpenAddEvent } = meth;
    const [serviceSelected, setServiceSelected] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [secondSelect, setSecondSelect] = useState(false)
    const [secondList, setSecondList] = useState([])
    const [typeSelected, setTypeSelected] = useState('')
    const [typeName, setTypeName] = useState('')
    const [typePrice, setTypePrice] = useState('')
    const [typeState, setTypeState] = useState('')
    const [typeDescription, setTypeDescription] = useState('')
    const [serviceUrl, setServiceUrl] = useState('')
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const [loadSecond, setLoadSecond] = useState(true)

    const serviceOptions = [
        { label: 'Finca', value: 'Finca' },
        { label: 'Habitaciones', value: 'Habitacion' },
        { label: 'Salon de Eventos', value: 'Salon' }
    ];

    useEffect(() => {
        if (serviceSelected) {
            setLoadSecond(true)
            setSecondList([])
            ServicesApi.getServices(serviceSelected)
                .then((res) => {
                    setLoadSecond(false)
                    setSecondSelect(true);
                    res.reservation.forEach((it) => {
                        setSecondList((oldArray) => [...oldArray, { label: it.type, value: it.type }]);
                    })
                })
                .catch(() => {
                    setLoadSecond(false)
                    setSecondSelect(false);
                    dispatchNotification({ text: t("errorGetSite"), type: 'error' })
                })
        } else {
            setSecondSelect(false);
        }
        // eslint-disable-next-line
    }, [serviceSelected])

    useEffect(() => {
        if (typeSelected) {
            ServicesApi.getSite(typeSelected)
                .then((res) => {
                    setTypeName((res.reservation.name).concat(' ', res.reservation.type))
                    setTypePrice(res.reservation.price)
                    setTypeState(res.reservation.state)
                    setTypeDescription(res.reservation.description)
                    setServiceUrl(res.reservation.url[0])
                })
                .catch(() => dispatchNotification({ text: t("errorGetSite"), type: 'error' }))
        }
        // eslint-disable-next-line
    }, [typeSelected])

    const handleDateSelect = () => {
        let calendarApi = props.data.data.view.calendar;
        calendarApi.unselect();
        calendarApi.addEvent({
            id: Date.now(),
            title: typeName,
            description: typeName,
            start: props.data.data.startStr,
            end: props.data.data.endStr,
            allDay: props.data.data.allDay
        });
        props.data.check = false;
        setOpenAddEvent(false);
    };

    const cleanFields = () => {
        setTypeName('')
        setTypePrice('')
        setTypeState('')
        setTypeDescription('')
    }

    const sendBooking = () => {
        const data = {
            date: props.data.data.startStr,
            name,
            phone,
            email,
            service: serviceSelected
        }
        ServicesApi.postBooking(data)
            .then(() => {
                handleDateSelect()
                cleanFields()
                setOpenConfirmation(false)
                setOpenAddEvent(false)
                dispatchNotification({ text: t("success-booking"), type: 'success' });
            })
            .catch(() => dispatchNotification({ text: t("errorSendBooking"), type: 'error' }))
    }

    return (
        <>
            <Dialog open={openAddEvent} onClose={() => setOpenAddEvent(false)} >
                <DialogContent>
                    <Grid>
                        <GridCell desktop={12} tablet={12} phone={12}>
                            <GridRow>
                                <GridCell desktop={12} tablet={12} phone={12}>
                                    <TextField icon={"calendar-month"} outlined
                                        value={props.data.data.startStr} disabled />
                                </GridCell>
                                <GridCell desktop={12} tablet={12} phone={12}>
                                    <TextField icon={"format-letter-case-upper"} outlined label={t("fullName")}
                                        onChange={(e) => setName(e.target.value)} />
                                </GridCell>
                                <GridCell desktop={12} tablet={12} phone={12}>
                                    <TextField icon={"phone"} outlined label={t("phone")} type={"number"}
                                        onChange={(e) => setPhone(e.target.value)} />
                                </GridCell>
                                <GridCell desktop={12} tablet={12} phone={12}>
                                    <TextField icon={"email"} outlined label={t("email")} type={"email"}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </GridCell>
                                <GridCell desktop={12} tablet={12} phone={12}>
                                    <Select label={t("service")} outlined
                                        enhanced options={serviceOptions || []} value={serviceSelected}
                                        onChange={(e) => setServiceSelected(e.target.value)}
                                    />
                                </GridCell>
                                <GridCell desktop={12} tablet={12} phone={12}>
                                    <Select label={t("typeService")} outlined
                                        icon={secondSelect && loadSecond ? "email" : ""}
                                        enhanced options={secondList || []} value={typeSelected}
                                        onChange={(e) => setTypeSelected(e.target.value)}
                                    />
                                </GridCell>
                                <GridCell desktop={12} tablet={12} phone={12}>
                                    <GridCell span={12}>
                                        <Button label={t("book")} raised className={"button-full"}
                                            onClick={() => setOpenConfirmation(true)} />
                                    </GridCell>
                                </GridCell>
                            </GridRow>
                        </GridCell>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
                <DialogTitle>
                    {t("confirmBooking")}
                </DialogTitle>
                <DialogContent>
                    <Grid>
                        <GridCell desktop={12} tablet={12} phone={12}>
                            <div className={styles.images_container}>
                                <img src={serviceUrl} width={"350px"} alt={typeName}
                                    style={{ borderRadius: "5px" }} />
                            </div>
                        </GridCell>
                        <GridCell desktop={12} tablet={12} phone={12}>
                            <GridRow>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {t("service")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {typeName}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {t("price")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {typePrice}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {t("state")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {typeState ? 'Disponible' : 'No Disponible'}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {t("description")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {typeDescription}
                                    </Typography>
                                </GridCell>
                            </GridRow>
                        </GridCell>
                        <GridCell desktop={12} tablet={12} phone={12}>
                            <GridRow>
                                <GridCell desktop={6}>
                                    <Button label={t("confirm")} raised className={"button-full"}
                                        onClick={() => sendBooking()} />
                                </GridCell>
                                <GridCell desktop={6}>
                                    <Button label={t("cancel")} danger raised className={"button-full"}
                                        onClick={() => setOpenConfirmation(false)} />
                                </GridCell>
                            </GridRow>
                        </GridCell>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddEvent;
