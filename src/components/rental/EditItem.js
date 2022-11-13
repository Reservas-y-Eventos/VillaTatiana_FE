import React, { useContext, useEffect, useState } from "react";
import { TextField } from "@rmwc/textfield";
import { Button } from "@rmwc/button";
import { Grid, GridCell, GridRow } from "@rmwc/grid";
import { Dialog, DialogContent } from "@rmwc/dialog";
import { useTranslation } from "react-i18next";
import AlertMessageContext from "../../contexts/alert-message-context";
import RentalContext from "../../contexts/rental-context";
import RentalApi from "../../api/RentalApi";

const EditItem = (props) => {
    const { data } = props
    const { t } = useTranslation();
    const { dispatchData: dispatchNotification } = useContext(AlertMessageContext);
    const { atrr, meth } = useContext(RentalContext)
    const { openEditItem } = atrr
    const { setOpenEditItem } = meth
    const [name, setName] = useState('')
    const [time, setTime] = useState(0)
    const [price, setPrice] = useState(0)
    const [type, setType] = useState('KITCHENWARE')
    const [stock, setStock] = useState(0)
    const [url, setUrl] = useState('')

    useEffect(() => {
        if (data) {
            setName(data.name)
            setTime(data.time)
            setPrice(data.price)
            setType(data.type)
            setStock(data.stock)
            setUrl(data.url)
        }
    }, [data])

    const updateItem = () => {
        const data = { name, time, price, type, stock, url }
        RentalApi.updateItem(data)
            .then(() => {
                setOpenEditItem(false)
                dispatchNotification({ text: "Successful update", type: 'success' })
            })
            .catch((err) => dispatchNotification({ text: err, type: 'error' }))
    }

    return (
        <Dialog open={openEditItem} onClose={() => setOpenEditItem(false)} >
            <DialogContent>
                <Grid>
                    <GridCell desktop={12} tablet={12} phone={12}>
                        <GridRow>
                            <GridCell desktop={12} tablet={12} phone={12}>
                                <TextField icon={"format-letter-case-upper"} outlined label={t("itemName")}
                                    disabled value={name} onChange={(e) => setName(e.target.value)} />
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
                                    <Button label={t("update")} icon={"update"} raised className={"button-full"}
                                        onClick={() => updateItem()} />
                                </GridCell>
                            </GridCell>
                        </GridRow>
                    </GridCell>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default EditItem