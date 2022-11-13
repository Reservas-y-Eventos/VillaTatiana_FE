import React, { useState } from "react";
import { Elevation } from "@rmwc/elevation";
import { Typography } from "@rmwc/typography";
import { Grid, GridCell } from "@rmwc/grid";
import { GridList, GridTile } from "@rmwc/grid-list";
import {
    Card, CardActions, CardMedia, CardActionIcons, CardPrimaryAction, CardMediaContent,
    CardActionIcon
} from "@rmwc/card";
import MDIcon from "../mdc/MDIcon";
import { useTranslation } from "react-i18next";
import ServicesApi from "../../api/ServicesApi";
import logo from "../../res/rental/cuchara.png"
import styles from "./booking.module.css"

const Booking = () => {
    const { t, i18n } = useTranslation();
    const [serviceList, setServiceList] = useState([])
    const serviceOptions = [
        { label: 'Finca', value: 'Finca' },
        { label: 'Habitaciones', value: 'Habitacion' },
        { label: 'Salon de Eventos', value: 'Salon' }
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
                            <GridList tileAspect={'1x1'}>
                                {serviceOptions.map((it, i) => (
                                    <GridTile key={i}>
                                        <Card style={{ width: '12.5rem' }} onClick={() => getServices(it.value)}>
                                            <CardPrimaryAction>
                                                <CardMedia
                                                    square
                                                    style={{
                                                        backgroundImage: `url(${logo})`,
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
                                                            {it.label.toUpperCase()}
                                                        </Typography>
                                                    </CardMediaContent>
                                                </CardMedia>
                                            </CardPrimaryAction>
                                        </Card>
                                    </GridTile>
                                ))}
                            </GridList>
                            <GridList tileAspect={'1x1'}>
                                {serviceList?.length > 0
                                    ? serviceList.map((it, i) => (
                                        <GridTile key={i}>
                                            <Card style={{ width: '12.5rem' }} onClick={() => getServices(it.value)}>
                                                <CardPrimaryAction>
                                                    <CardMedia
                                                        square
                                                        style={{
                                                            backgroundImage: `url(${logo})`,
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
                                                                {it.type.toUpperCase()}<br />
                                                                {it.description}<br />
                                                                {it.price}<br />
                                                                {it.state ? "Disponible" : "No disponible"}
                                                            </Typography>
                                                        </CardMediaContent>
                                                    </CardMedia>
                                                </CardPrimaryAction>
                                                <CardActions>
                                                    <CardActionIcons>
                                                        <CardActionIcon>
                                                            <MDIcon theme={['onSecondary']} icon={"eye"} />
                                                        </CardActionIcon>
                                                    </CardActionIcons>
                                                </CardActions>
                                            </Card>
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