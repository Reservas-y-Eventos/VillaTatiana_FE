import React, { useState, useEffect } from "react";
import RentalApi from "../../api/RentalApi";
import { Card } from "@rmwc/card";
import { Elevation } from "@rmwc/elevation";
import { Typography } from "@rmwc/typography";
import { Grid, GridCell } from "@rmwc/grid";
import {
    GridList, GridTile, GridTilePrimary, GridTilePrimaryContent, GridTileSecondary,
    GridTileTitle
} from "@rmwc/grid-list";
import MDIcon from "../mdc/MDIcon";
import { useTranslation } from "react-i18next";
import NewRental from "./NewRental";
import logo from "../../res/images/logo192.png"
import styles from "./rental.module.css"

const Rental = () => {
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false)
    const [state, setState] = useState({
        tileAspect: '1x1'
    });
    const [itemsList, setItemsList] = useState([])
    const [itemSelected, setItemSelected] = useState([])

    useEffect(() => {
        RentalApi.getItems()
            .then((res) => {
                setItemsList(res.items)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <>
            <div className={styles.rental_container}>
                <Typography use={"headline3"} className={styles.rental_title}>
                    {t("rental")}
                </Typography>
                <Elevation z={"10"}>
                    <Card>
                        <Grid style={{ margin: "0px" }}>
                            <GridCell desktop={12} tablet={12} phone={12}>
                                <GridList tileAspect={state.tileAspect}>
                                    {itemsList.map((it, i) => (
                                        <GridTile key={i}>
                                            <GridTilePrimary
                                                onClick={() => {
                                                    setOpen(true);
                                                    setItemSelected(it)
                                                }}>
                                                <GridTilePrimaryContent className={styles.info_container}
                                                    src={logo}
                                                    alt="Item"
                                                />
                                            </GridTilePrimary>
                                            <GridTileSecondary className={styles.info_container}>
                                                <GridTileTitle>{it.name}</GridTileTitle>
                                                <GridTileTitle>{it.price}</GridTileTitle>
                                                <GridTileTitle>{it.stock}</GridTileTitle>
                                                <GridTileTitle>{it.type}</GridTileTitle>
                                            </GridTileSecondary>
                                        </GridTile>
                                    ))}
                                </GridList>
                            </GridCell>
                        </Grid>
                    </Card>
                </Elevation>
            </div>
            <NewRental open={open} data={itemSelected} />
        </>
    )
}

export default Rental