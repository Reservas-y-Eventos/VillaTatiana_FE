import React, { useContext, useEffect, useState } from "react";
import { GridCell, GridRow } from "@rmwc/grid";
import { Select } from "@rmwc/select";
import { Dialog, DialogContent } from "@rmwc/dialog";
import {
    DataTable, DataTableBody, DataTableContent, DataTableHeadCell, DataTableHead, DataTableRow, DataTableCell
} from "@rmwc/data-table";
import RentalContext from "../../contexts/rental-context";
import AlertMessageContext from "../../contexts/alert-message-context";
import Utils from "../../utils/Utils";
import RentalApi from "../../api/RentalApi";

const ListItems = (props) => {
    const { dispatchData: dispatchNotification } = useContext(AlertMessageContext);
    const { atrr, meth } = useContext(RentalContext)
    const { openListItem } = atrr
    const { setOpenListItem } = meth
    const [itemsList, setItemsList] = useState([])

    useEffect(() => {
        RentalApi.getItems()
            .then((res) => {
                (Utils.orderArray(res.items, 'name', 1) || []).map((it) => {
                    setItemsList((oldArray) => [...oldArray, it.name]);
                });
            })
            .catch((err) => console.log(err))
    }, [openListItem])

    const listItemRent = (value) => {
        const data = {
            name: value
        }
        RentalApi.getRentItem(data)
            .then((res) => {
                console.log(res);
                dispatchNotification({ text: 'Successful item addition', type: 'success' })
            })
            .catch((err) => dispatchNotification({ text: err, type: 'error' }))
    }

    return (
        <Dialog open={openListItem} onClose={() => setOpenListItem(false)}>
            <DialogContent>
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
                                    </DataTableRow>
                                </DataTableHead>
                                <DataTableBody>
                                    <DataTableRow>
                                        <DataTableCell>Item</DataTableCell>
                                        <DataTableCell>Cantidad</DataTableCell>
                                        <DataTableCell>Usuario</DataTableCell>
                                        <DataTableCell>Fecha</DataTableCell>
                                    </DataTableRow>
                                </DataTableBody>
                            </DataTableContent>
                        </DataTable>
                    </GridCell>
                </GridRow>
            </DialogContent>
        </Dialog>
    )
}

export default ListItems