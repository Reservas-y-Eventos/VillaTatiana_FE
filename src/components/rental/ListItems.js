import React, { useContext, useEffect, useState } from "react";
import { Grid, GridCell, GridRow } from "@rmwc/grid";
import { Select } from "@rmwc/select";
import { Button } from "@rmwc/button";
import { Dialog, DialogContent } from "@rmwc/dialog";
import {
    DataTable, DataTableBody, DataTableContent, DataTableHeadCell, DataTableHead, DataTableRow, DataTableCell
} from "@rmwc/data-table";
import RentalContext from "../../contexts/rental-context";
import AlertMessageContext from "../../contexts/alert-message-context";
import Utils from "../../utils/Utils";
import RentalApi from "../../api/RentalApi";
import { useTranslation } from "react-i18next";

const ListItems = () => {
    const { t } = useTranslation();
    const { dispatchData: dispatchNotification } = useContext(AlertMessageContext);
    const { atrr, meth } = useContext(RentalContext)
    const { openListItem } = atrr
    const { setOpenListItem } = meth
    const [itemsList, setItemsList] = useState([])
    const [rentList, setRentList] = useState([])

    useEffect(() => {
        if (openListItem) {
            setItemsList([])
            RentalApi.getItems()
                .then((res) => {
                    // eslint-disable-next-line
                    (Utils.orderArray(res.items, 'name', 1) || []).map((it) => {
                        setItemsList((oldArray) => [...oldArray, it.name]);
                    });
                })
                .catch(() => dispatchNotification({ text: t("errorGetItem"), type: 'error' }))
        }
        // eslint-disable-next-line
    }, [openListItem])

    const listItemRent = (value) => {
        const data = { name: value }
        RentalApi.getRentItem(data)
            .then((res) => {
                setRentList(res.rents)
            })
            .catch(() => dispatchNotification({ text: t("errorGetRentItem"), type: 'error' }))
    }

    const deleteItemRent = (value) => {
        RentalApi.deleteRentItem(value._id)
            .then((res) => {
                listItemRent(value.name)
                dispatchNotification({ text: t("successDeleteRentItem"), type: 'success' })
            })
            .catch(() => dispatchNotification({ text: t("errorDeleteRentItem"), type: 'error' }))
    }

    return (
        <Dialog open={openListItem} onClose={() => setOpenListItem(false)}>
            <DialogContent style={{ width: '100%', height: 'fit-content' }}>
                <Grid>
                    <GridRow>
                        <GridCell desktop={6} tablet={12} phone={12} />
                        <GridCell desktop={6} tablet={12} phone={12}>
                            <Select outlined enhanced options={itemsList || []}
                                onChange={(e) => listItemRent(e.target.value)} />
                        </GridCell>
                    </GridRow>
                    <br />
                    <GridRow>
                        <GridCell desktop={12} tablet={12} phone={12}>
                            <DataTable style={{ width: '100%' }}>
                                <DataTableContent>
                                    <DataTableHead>
                                        <DataTableRow>
                                            <DataTableHeadCell>Item</DataTableHeadCell>
                                            <DataTableHeadCell>Cantidad</DataTableHeadCell>
                                            <DataTableHeadCell>Usuario</DataTableHeadCell>
                                            <DataTableHeadCell>Fecha</DataTableHeadCell>
                                            <DataTableHeadCell>Acciones</DataTableHeadCell>
                                        </DataTableRow>
                                    </DataTableHead>
                                    <DataTableBody>
                                        {(rentList && rentList.length > 0)
                                            && rentList.map((it) => (
                                                <DataTableRow key={it._id}>
                                                    <DataTableCell>{it.name}</DataTableCell>
                                                    <DataTableCell>{it.amount || 'bot'}</DataTableCell>
                                                    <DataTableCell>{it.name}</DataTableCell>
                                                    <DataTableCell>{it.createdAt}</DataTableCell>
                                                    <DataTableCell>
                                                        <Button icon={"trash-can"} className={"button-medium"} danger
                                                            onClick={() => deleteItemRent(it)} />
                                                    </DataTableCell>
                                                </DataTableRow>
                                            ))}
                                    </DataTableBody>
                                </DataTableContent>
                            </DataTable>
                        </GridCell>
                    </GridRow>
                </Grid>
            </DialogContent>
        </Dialog >
    )
}

export default ListItems