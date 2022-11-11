import React, { useState } from "react";
import { Card } from "@rmwc/card";
import { Elevation } from "@rmwc/elevation";
import { Typography } from "@rmwc/typography";
import { Grid, GridCell } from "@rmwc/grid";
import {
    GridList, GridTile, GridTilePrimary, GridTilePrimaryContent,
    GridTileSecondary, GridTileIcon, GridTileTitle
} from "@rmwc/grid-list";
import { useTranslation } from "react-i18next";
import ServicesApi from "../../api/ServicesApi";
import logo from "../../res/images/logo192.png"
import styles from "./booking.module.css"

const Booking = () => {
    const { t, i18n } = useTranslation();
    const [serviceList, setServiceList] = useState([])
    const [state, setState] = useState({
        tileAspect: '1x1'
    });
    const serviceOptions = [
        { label: 'Finca', value: 'finca' },
        { label: 'Habitaciones', value: 'habitacion' },
        { label: 'Salon de Eventos', value: 'salon' }
    ];

    const getServices = (service) => {
        ServicesApi.getServices(service)
            .then((res) => {
                setServiceList(res.reservation)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className={styles.booking_container}>
            <Typography use={"headline3"} className={styles.booking_title}>
                {t("booking")}
            </Typography>
            <Elevation z={"10"}>
                <Card>
                    <Grid>
                        <GridCell desktop={12} tablet={12} phone={12}>
                            <GridList
                                tileAspect={state.tileAspect}
                            >
                                {serviceOptions.map((it, i) => (
                                    <GridTile key={i}
                                        onClick={() => getServices(it.value)}>
                                        <GridTilePrimary>
                                            <GridTilePrimaryContent className={styles.info_container}
                                                src={logo}
                                                alt="Item"
                                            />
                                        </GridTilePrimary>
                                        <GridTileSecondary className={styles.info_container}>
                                            <GridTileTitle>{it.label}</GridTileTitle>
                                        </GridTileSecondary>
                                    </GridTile>
                                ))}
                            </GridList>
                            <br />
                            <GridList
                                tileAspect={state.tileAspect}
                            >
                                {serviceList?.length > 0
                                    ? serviceList.map((it, i) => (
                                        <GridTile key={i}
                                            onClick={() => getServices(it.value)}>
                                            <GridTilePrimary>
                                                <GridTilePrimaryContent className={styles.info_container}
                                                    src={logo}
                                                    alt="Item"
                                                />
                                            </GridTilePrimary>
                                            <GridTileSecondary className={styles.info_container}>
                                                <GridTileTitle>{it.type}</GridTileTitle>
                                                <GridTileTitle>{it.description}</GridTileTitle>
                                                <GridTileTitle>{it.price}</GridTileTitle>
                                                <GridTileTitle>{it.state ? "Disponible" : "No disponible"}</GridTileTitle>
                                            </GridTileSecondary>
                                        </GridTile>
                                    ))
                                    : <></>
                                }
                            </GridList>
                        </GridCell>
                    </Grid>
                </Card>
            </Elevation>
        </div >
    )
}

export default Booking