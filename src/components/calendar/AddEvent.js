import React, { useContext, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@rmwc/dialog";
import { Grid, GridCell, GridRow } from "@rmwc/grid";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { Select } from "@rmwc/select";
import { Typography } from "@rmwc/typography";
import { useTranslation } from "react-i18next";
import AlertMessageContext from "../../contexts/alert-message-context";
import ServicesApi from "../../api/ServicesApi";
import styles from "./addEvent.module.css"

const AddEvent = (props) => {
    const { t } = useTranslation();
    const { dispatchData: dispatchNotification } = useContext(AlertMessageContext);
    const [serviceSelected, setServiceSelected] = useState('')
    const [modal, setModal] = useState(true)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [secondSelect, setSecondSelect] = useState(false)
    const [secondList, setSecondList] = useState([])
    const [typeSelected, setTypeSelected] = useState('')
    const [typeInfo, setTypeInfo] = useState([])
    const [typeName, setTypeName] = useState('')
    const [typePrice, setTypePrice] = useState('')
    const [typeState, setTypeState] = useState('')
    const [typeDescription, setTypeDescription] = useState('')
    const [openConfirmation, setOpenConfirmation] = useState(false)

    const serviceOptions = [
        { label: 'Finca', value: 'Finca' },
        { label: 'Habitaciones', value: 'Habitacion' },
        { label: 'Salon de Eventos', value: 'Salon' }
    ];

    useEffect(() => {
        if (serviceSelected) {
            setSecondList([])
            ServicesApi.getServices(serviceSelected)
                .then((res) => {
                    setSecondSelect(true);
                    res.reservation.forEach((it) => {
                        setSecondList((oldArray) => [...oldArray, { label: it.type, value: it.type }]);
                    })
                })
                .catch((err) => {
                    setSecondSelect(false);
                    dispatchNotification({ text: err, type: 'error' })
                })
        } else {
            setSecondSelect(false);
        }
    }, [serviceSelected])

    useEffect(() => {
        if (typeSelected) {
            ServicesApi.getSite(typeSelected)
                .then((res) => {
                    setTypeInfo(res.reservation)
                    setTypeName((res.reservation.name).concat(' ', res.reservation.type))
                    setTypePrice(res.reservation.price)
                    setTypeState(res.reservation.state)
                    setTypeDescription(res.reservation.description)
                })
                .catch((err) => dispatchNotification({ text: err, type: 'error' }))
        }
    }, [typeSelected])

    const toggle = () => {
        setModal(!modal);
        props.method();
    };

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
        setModal(!modal);
    };

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
                setOpenConfirmation(false)
                setModal(false)
                dispatchNotification({ text: t("success-booking"), type: 'success' });
            })
            .catch((err) => dispatchNotification({ text: err, type: 'error' }))
    }

    return (
        <>
            <Dialog open={modal} onClose={() => setModal(false)} >
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
                                {secondSelect
                                    ? <GridCell desktop={12} tablet={12} phone={12}>
                                        <Select label={t("typeService")} outlined
                                            enhanced options={secondList || []} value={typeSelected}
                                            onChange={(e) => setTypeSelected(e.target.value)}
                                        />
                                    </GridCell>
                                    : <></>
                                }
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
                            <GridRow>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {t("service")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {typeName}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {t("price")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {typePrice}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {t("state")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {typeState ? 'Disponible' : 'No Disponible'}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {t("description")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {typeDescription}
                                    </Typography>
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
                            </GridRow>
                        </GridCell>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddEvent;
