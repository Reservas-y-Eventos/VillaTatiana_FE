import React, { useContext, useState } from "react";
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
import AlertMessageContext from "../../contexts/alert-message-context";
import BookingContext from "../../contexts/booking-context";
import ServicesApi from "../../api/ServicesApi";
import ServiceDetail from "./ServiceDetail";
import styles from "./booking.module.css"

const Booking = () => {
    const { t } = useTranslation();
    const { dispatchData: dispatchNotification } = useContext(AlertMessageContext);
    const { meth } = useContext(BookingContext)
    const { setOpenDetail } = meth
    const [serviceList, setServiceList] = useState([])
    const [urlList, setUrlList] = useState([])
    const serviceOptions = [
        { label: 'Finca', value: 'Finca', url: 'https://i.imgur.com/C9T0CUD.jpg' },
        { label: 'Habitaciones', value: 'Habitacion', url: 'https://i.imgur.com/Tb8nN6L.jpg' },
        { label: 'Salon de Eventos', value: 'Salon', url: 'https://i.imgur.com/wT4PEsj.jpg' }
    ];

    const getServices = (service) => {
        ServicesApi.getServices(service)
            .then((res) => {
                setServiceList(res.reservation)
            })
            .catch(() => {
                dispatchNotification({ text: t("errorGetServices"), type: 'error' })
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
                                    <div className={styles.items_booking_container}>
                                        <GridTile key={i}>
                                            <Card style={{ width: '12.5rem' }} onClick={() => getServices(it.value)}>
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
                                                                {it.label.toUpperCase()}
                                                            </Typography>
                                                        </CardMediaContent>
                                                    </CardMedia>
                                                </CardPrimaryAction>
                                            </Card>
                                        </GridTile>
                                    </div>
                                ))}
                            </GridList>
                            <div className={styles.list_booking_container}>
                                <GridList tileAspect={'1x1'}>
                                    {serviceList?.length > 0
                                        && serviceList.map((it, i) => (
                                            <div className={styles.items_booking_container}>
                                                <GridTile key={i}>
                                                    <Card style={{ width: '12.5rem' }} onClick={() => getServices(it.value)}>
                                                        <CardPrimaryAction>
                                                            <CardMedia
                                                                square
                                                                style={{
                                                                    backgroundImage: `url(${it.url[0]})`,
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
                                                                        {it.type.toUpperCase()}
                                                                    </Typography>
                                                                </CardMediaContent>
                                                            </CardMedia>
                                                        </CardPrimaryAction>
                                                        <CardActions>
                                                            <CardActionIcons onClick={() => {
                                                                setUrlList(it.url);
                                                                setOpenDetail(true);
                                                            }}>
                                                                <CardActionIcon>
                                                                    <MDIcon theme={['onSecondary']} icon={"eye"} />
                                                                </CardActionIcon>
                                                            </CardActionIcons>
                                                        </CardActions>
                                                    </Card>
                                                </GridTile>
                                            </div>
                                        ))
                                    }
                                </GridList>
                            </div>
                        </GridCell>
                    </Grid>
                </Card>
            </Elevation>
            <ServiceDetail data={urlList} />
        </div >
    )
}

export default Booking