/* eslint-disable */
import React from "react";
import { Grid, GridCell, GridRow } from "@rmwc/grid";
import { Typography } from "@rmwc/typography";
import { Card } from "@rmwc/card";
import { Elevation } from "@rmwc/elevation";
import MDIcon from "../mdc/MDIcon";
import { useTranslation } from "react-i18next";
import map from "../../res/images/maps.PNG"
import styles from "./contactus.module.css"

const ContactUs = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.contactus_container}>
            <Typography use={"headline3"} className={styles.contactus_title}>
                {t("contact-us")}
            </Typography>
            <Elevation z={"10"}>
                <Card style={{ maxWidth: '850px' }}>
                    <Grid style={{ margin: "0px" }}>
                        <GridRow>
                            <GridCell desktop={12} tablet={12} phone={12} className={styles.map_container}>
                                <img src={map} className={styles.map_img} alt={"Mapa"} />
                            </GridCell>
                        </GridRow>
                        <br />
                        <GridRow style={{ margin: "30px" }}>
                            <GridCell desktop={9} tablet={12} phone={12}>
                                <GridRow style={{ color: '#2EBEC6' }}>
                                    <GridCell desktop={3} tablet={12} phone={12}>
                                        <MDIcon icon={"map-marker-radius"} />&nbsp;Dirección
                                    </GridCell>
                                    <GridCell desktop={8} tablet={12} phone={12}>
                                        Km 55 Via Gachancipá - Chocontá
                                    </GridCell>
                                </GridRow>
                                <br />
                                <GridRow style={{ color: '#2EBEC6' }}>
                                    <GridCell desktop={3} tablet={12} phone={12}>
                                        <MDIcon icon={"phone"} />&nbsp;Teléfono
                                    </GridCell>
                                    <GridCell desktop={8} tablet={12} phone={12}>
                                        +57 310 773  3582
                                    </GridCell>
                                </GridRow>
                                <br />
                                <GridRow style={{ color: '#2EBEC6' }} >
                                    <GridCell desktop={3} tablet={12} phone={12}>
                                        <MDIcon icon={"gmail"} />&nbsp;Correo
                                    </GridCell>
                                    <GridCell desktop={8} tablet={12} phone={12}>
                                        villatatianarecreacional@gmail.com
                                    </GridCell>
                                </GridRow>
                            </GridCell>
                            <GridCell desktop={3} tablet={12} phone={12}>
                                <GridRow>
                                    <GridCell desktop={12} tablet={12} phone={12}>
                                        <a href={"https://www.facebook.com/VillaTatianaViota/"} target={"_blank"}
                                            className={styles.socialmedia_link}>
                                            <MDIcon icon={"facebook"} theme={['onSecondary']} />&nbsp;Facebook
                                        </a>
                                    </GridCell>
                                </GridRow>
                                <br />
                                <GridRow>
                                    <GridCell desktop={12} tablet={12} phone={12}>
                                        <a href={"https://www.instagram.com/villatatianarecreacional/"} target={"_blank"}
                                            className={styles.socialmedia_link}>
                                            <MDIcon icon={"instagram"} />&nbsp;Instagram
                                        </a>
                                    </GridCell>
                                </GridRow>
                                <br />
                                <GridRow>
                                    <GridCell desktop={12} tablet={12} phone={12}>
                                        <a href={"https://wa.link/gx7nls"} target={"_blank"}
                                            className={styles.socialmedia_link}>
                                            <MDIcon icon={"whatsapp"} />&nbsp;Whatsapp
                                        </a>
                                    </GridCell>
                                </GridRow>
                            </GridCell>
                        </GridRow>
                    </Grid>
                </Card>
            </Elevation>
        </div>
    )
}

export default ContactUs