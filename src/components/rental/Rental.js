import React, { useState, useEffect, useContext } from "react";
import { Button } from "@rmwc/button";
import { Elevation } from "@rmwc/elevation";
import { Typography } from "@rmwc/typography";
import { Grid, GridCell, GridRow } from "@rmwc/grid";
import { GridList, GridTile } from "@rmwc/grid-list";
import {
    Card, CardActions, CardMedia, CardActionIcons, CardPrimaryAction, CardMediaContent,
    CardActionIcon
} from "@rmwc/card";
import MDIcon from "../mdc/MDIcon";
import { useTranslation } from "react-i18next";
import NewRental from "./NewRental";
import NewItem from "./NewItem";
import ListItems from "./ListItems";
import EditItem from "./EditItem";
import RentalContext from "../../contexts/rental-context";
import AlertMessageContext from "../../contexts/alert-message-context";
import RentalApi from "../../api/RentalApi";
import Utils from "../../utils/Utils";
import styles from "./rental.module.css"

const Rental = () => {
    const { t } = useTranslation();
    const { dispatchData: dispatchNotification } = useContext(AlertMessageContext);
    const { atrr, meth } = useContext(RentalContext)
    const { openAddRental, openNewItem, openEditItem } = atrr
    const { setOpenAddRental, setOpenNewItem, setOpenListItem, setOpenEditItem } = meth
    const [itemsList, setItemsList] = useState([])
    const [itemSelected, setItemSelected] = useState([])

    useEffect(() => {
        RentalApi.getItems()
            .then((res) => {
                setItemsList(res.items)
            })
            .catch((err) => console.log(err))
        // eslint-disable-next-line
    }, [openNewItem, openAddRental, openEditItem])

    const deleteItem = (name) => {
        console.log(name);
        const data = { name: name.toLowerCase() }
        RentalApi.deleteItem(data)
            .then(() => dispatchNotification({ text: 'Successful item addition', type: 'success' }))
            .catch((err) => dispatchNotification({ text: err, type: 'error' }))
    }

    return (
        <>
            <div className={styles.rental_container}>
                <Typography use={"headline3"} className={styles.rental_title}>
                    {t("rental")}
                </Typography>
                <Elevation z={"10"}>
                    <Card style={{ maxWidth: '930px' }}>
                        <Grid style={{ margin: "0px" }}>
                            <GridCell desktop={12} tablet={12} phone={12}>
                                <GridRow>
                                    <GridCell desktop={6} tablet={12} phone={12} />
                                    <GridCell desktop={3} tablet={12} phone={12}>
                                        <Button label={t("viewRents")} raised className={"button-full"} icon={"file-search"}
                                            onClick={() => setOpenListItem(true)}
                                            style={localStorage.getItem('rol') === 'USER' ? { display: 'none' } : { display: '' }} />
                                    </GridCell>
                                    <GridCell desktop={3} tablet={12} phone={12}>
                                        <Button label={t("addItem")} raised className={"button-full"} icon={"plus"}
                                            onClick={() => setOpenNewItem(true)}
                                            style={localStorage.getItem('rol') === 'USER' ? { display: 'none' } : { display: '' }} />
                                    </GridCell>
                                </GridRow>
                                <GridList tileAspect={'1x1'}>
                                    {(Utils.orderArray(itemsList, 'name', 1) || []).map((it, i) => (
                                        <div className={styles.items_container}>
                                            <GridTile key={i}>
                                                <Card style={{ width: '12.5rem' }}>
                                                    <CardPrimaryAction>
                                                        <CardMedia
                                                            square
                                                            style={{
                                                                backgroundImage: `url(${it.url})`,
                                                            }}
                                                        >
                                                            <CardMediaContent>
                                                                <Typography
                                                                    use="subtitle2"
                                                                    tag="div"
                                                                    theme="textPrimaryOnDark"
                                                                    style={{
                                                                        padding: '0.5rem 1rem',
                                                                        backgroundImage:
                                                                            'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
                                                                        bottom: '0',
                                                                        left: '0',
                                                                        right: '0',
                                                                        position: 'absolute',
                                                                        fontWeight: 'bolder'
                                                                    }}
                                                                >
                                                                    {it.name.toUpperCase()}
                                                                </Typography>
                                                                <br />
                                                                <Typography
                                                                    use="subtitle2"
                                                                    tag="div"
                                                                    theme="textPrimaryOnDark"
                                                                    style={{
                                                                        padding: '0.5rem 0.5rem',
                                                                        backgroundImage:
                                                                            'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 100%)',
                                                                        top: '0',
                                                                        right: '0',
                                                                        position: 'absolute',
                                                                        fontWeight: 'bolder'
                                                                    }}
                                                                >
                                                                    {`Stock: ${it.stock}`}
                                                                </Typography>
                                                            </CardMediaContent>
                                                        </CardMedia>
                                                    </CardPrimaryAction>
                                                    {localStorage.getItem('token')
                                                        ? <CardActions>
                                                            <CardActionIcons
                                                                style={localStorage.getItem('rol') === 'USER' ? { display: 'none' } : { display: '' }} >
                                                                <CardActionIcon onClick={() => {
                                                                    deleteItem(it.name)
                                                                }}>
                                                                    <MDIcon theme={['onSecondary']} icon={"trash-can"} />
                                                                </CardActionIcon>
                                                            </CardActionIcons>
                                                            <CardActionIcons
                                                                style={localStorage.getItem('rol') === 'USER' ? { display: 'none' } : { display: '' }} >
                                                                <CardActionIcon onClick={() => {
                                                                    setItemSelected(it)
                                                                    setOpenEditItem(true)
                                                                }}>
                                                                    <MDIcon theme={['onSecondary']} icon={"grease-pencil"} />
                                                                </CardActionIcon>
                                                            </CardActionIcons>
                                                            <CardActionIcons>
                                                                <CardActionIcon onClick={() => {
                                                                    setOpenAddRental(true);
                                                                    setItemSelected(it)
                                                                }}>
                                                                    <MDIcon theme={['onSecondary']} icon={"room-service"} />
                                                                </CardActionIcon>
                                                            </CardActionIcons>
                                                        </CardActions>
                                                        : <>
                                                        </>}
                                                </Card>
                                            </GridTile>
                                        </div>
                                    ))}
                                </GridList>
                            </GridCell>
                        </Grid>
                    </Card>
                </Elevation>
            </div>
            <ListItems data={itemsList} />
            <NewItem />
            <EditItem data={itemSelected} />
            <NewRental open={openAddRental} data={itemSelected} />
        </>
    )
}

export default Rental