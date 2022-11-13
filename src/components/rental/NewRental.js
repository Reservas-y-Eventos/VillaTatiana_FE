import React, { useEffect, useState, useContext } from "react";
import { Dialog, DialogContent, DialogTitle } from "@rmwc/dialog";
import { Grid, GridCell, GridRow } from "@rmwc/grid";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { Typography } from "@rmwc/typography";
import { useTranslation } from "react-i18next";
import RentalContext from "../../contexts/rental-context";
import AlertMessageContext from "../../contexts/alert-message-context";
import RentalApi from "../../api/RentalApi";
import styles from "./newRental.module.css"

const NewRental = (props) => {
    const { open, data } = props
    const { t } = useTranslation();
    const { dispatchData: dispatchNotification } = useContext(AlertMessageContext);
    const { atrr, meth } = useContext(RentalContext)
    const { openAddRental } = atrr
    const { setOpenAddRental } = meth
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const [quantity, setQuantity] = useState()

    const rentItem = () => {
        const itemData = {
            name: data.name,
            dni: localStorage.getItem('dni'),
            amount: quantity,
        }
        RentalApi.rentItem(itemData)
            .then((res) => {
                setOpenConfirmation(false)
                setOpenAddRental(false)
                dispatchNotification({ text: "Successful rent", type: 'success' })
            })
            .catch((err) => dispatchNotification({ text: err, type: 'error' }))
    }

    const deleteItem = () => {

    }

    return (
        <>
            <Dialog open={openAddRental} onClose={() => setOpenAddRental(false)} >
                <DialogContent>
                    <Grid>
                        <GridCell desktop={12} tablet={12} phone={12}>
                            <GridRow>
                                <GridCell desktop={12} tablet={12} phone={12}>
                                    <TextField icon={"alpha-r-box"} outlined value={data.name}
                                        disabled />
                                </GridCell>
                                <GridCell desktop={12} tablet={12} phone={12}>
                                    <TextField icon={"counter"} outlined min={0} value={quantity}
                                        type={"number"} onChange={(e) => setQuantity(e.target.value)} />
                                </GridCell>
                                <GridCell desktop={12} tablet={12} phone={12}>
                                    <GridCell span={12}>
                                        <Button label={t("rental")} raised className={"button-full"}
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
                    {t("confirmRental")}
                </DialogTitle>
                <DialogContent>
                    <Grid>
                        <GridCell desktop={12} tablet={12} phone={12}>
                            <GridRow>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {t("object")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {data.name}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {t("typeObject")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {data.type}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {t("price")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {data.price}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {t("quantity")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {quantity}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {t("state")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"} className={styles.contactus_title}>
                                        {data.time}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={12} tablet={12} phone={12}>
                                    <GridRow>
                                        <GridCell desktop={6}>
                                            <Button label={t("confirm")} raised className={"button-full"}
                                                onClick={() => rentItem()} />
                                        </GridCell>
                                        <GridCell desktop={6}>
                                            <Button label={t("cancel")} danger raised className={"button-full"}
                                                onClick={() => setOpenConfirmation(false)} />
                                        </GridCell>
                                        {localStorage.getItem('rol') === 'ADMIN'
                                            ? <GridCell desktop={6}>
                                                <Button label={t("delete")} raised className={"button-full"}
                                                    danger onClick={() => deleteItem()} />
                                            </GridCell>
                                            : <></>
                                        }
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

export default NewRental
