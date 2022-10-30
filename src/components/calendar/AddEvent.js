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

const AddEvent = () => {
    const { t } = useTranslation();
    const { atrr, meth } = useContext(CalendarContext)
    const { open, dateSelected, serviceSelected } = atrr
    const { setOpen, setServiceSelected } = meth
    const { dispatchData: dispatchNotification } = useContext(AlertMessageContext);
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
        { label: 'Finca', value: 'finca' },
        { label: 'Habitaciones', value: 'habitacion' },
        { label: 'Salon de Eventos', value: 'salon' }
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

    const sendBooking = () => {
        const data = {
            "date": dateSelected,
            name,
            phone,
            email,
            "service": serviceSelected
        }
        ServicesApi.postBooking(data)
            .then(() => {
                setOpenConfirmation(false)
                setOpen(false)
                dispatchNotification({ text: t("success-booking"), type: 'success' });
            })
            .catch((err) => dispatchNotification({ text: err, type: 'error' }))
    }

    return (
        <>
            <Dialog open={open} onClose={() => setOpen(false)} >
                <DialogContent>
                    <Grid>
                        <GridCell desktop={12} tablet={12} phone={12}>
                            <GridRow>
                                <GridCell desktop={12} tablet={12} phone={12}>
                                    <TextField icon={"calendar-month"} outlined
                                        value={dateSelected} disabled />
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
    )
}

export default AddEvent