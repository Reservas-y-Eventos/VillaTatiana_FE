import React, { useContext, useState } from "react";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { Grid, GridCell, GridRow } from "@rmwc/grid";
import { Dialog, DialogContent } from "@rmwc/dialog";
import { useTranslation } from "react-i18next";
import AlertMessageContext from "../../contexts/alert-message-context";
import RentalContext from "../../contexts/rental-context";
import RentalApi from "../../api/RentalApi";

const NewItem = () => {
    const { t } = useTranslation();
    const { dispatchData: dispatchNotification } = useContext(AlertMessageContext);
    const { atrr, meth } = useContext(RentalContext)
    const { openNewItem } = atrr
    const { setOpenNewItem } = meth
    const [name, setName] = useState('')
    const [time, setTime] = useState(0)
    const [price, setPrice] = useState(0)
    const [type, setType] = useState('KITCHENWARE')
    const [stock, setStock] = useState(0)
    const [url, setUrl] = useState('')

    const cleanFields = () => {
        setName('')
        setTime('')
        setPrice('')
        setStock('')
        setUrl('')
    }

    const addItem = () => {
        const data = { name: name.toLowerCase(), time, price, type, stock, url }
        RentalApi.addItem(data)
            .then(() => {
                setOpenNewItem(false)
                cleanFields()
                dispatchNotification({ text: 'Successful item addition', type: 'success' })
            })
            .catch((err) => dispatchNotification({ text: err, type: 'error' }))
    }

    return (
        <Dialog open={openNewItem} onClose={() => setOpenNewItem(false)} >
            <DialogContent>
                <Grid>
                    <GridCell desktop={12} tablet={12} phone={12}>
                        <GridRow>
                            <GridCell desktop={12} tablet={12} phone={12}>
                                <TextField icon={"format-letter-case-upper"} outlined label={t("itemName")}
                                    value={name} onChange={(e) => setName(e.target.value)} />
                            </GridCell>
                            <GridCell desktop={12} tablet={12} phone={12}>
                                <TextField icon={"timer"} outlined label={t("time")} type={"number"}
                                    value={time} onChange={(e) => setTime(e.target.value)} />
                            </GridCell>
                            <GridCell desktop={12} tablet={12} phone={12}>
                                <TextField icon={"currency-usd"} outlined label={t("price")} type={"number"}
                                    value={price} onChange={(e) => setPrice(e.target.value)} />
                            </GridCell>
                            <GridCell desktop={12} tablet={12} phone={12}>
                                <TextField icon={"sticker"} outlined label={t("brand")} value={type}
                                    disabled onChange={(e) => setType(e.target.value)} />
                            </GridCell>
                            <GridCell desktop={12} tablet={12} phone={12}>
                                <TextField icon={"inbox"} outlined label={"Stock"} type={"number"}
                                    value={stock} onChange={(e) => setStock(e.target.value)} />
                            </GridCell>
                            <GridCell desktop={12} tablet={12} phone={12}>
                                <TextField icon={"web"} outlined label={"Url"}
                                    value={url} onChange={(e) => setUrl(e.target.value)} />
                            </GridCell>
                            <GridCell desktop={12} tablet={12} phone={12}>
                                <GridCell span={12}>
                                    <Button label={t("add")} icon={"plus"} raised className={"button-full"}
                                        onClick={() => addItem()} />
                                </GridCell>
                            </GridCell>
                        </GridRow>
                    </GridCell>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default NewItem