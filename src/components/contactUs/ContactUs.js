import React from "react";
import { Grid, GridCell, GridRow } from "@rmwc/grid";
import { Typography } from "@rmwc/typography";
import MDIcon from "../mdc/MDIcon";
import { useTranslation } from "react-i18next";
import { Card } from "@rmwc/card";
import { Elevation } from "@rmwc/elevation";
import styles from "./contactus.module.css"

const ContactUs = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className={styles.contactus_container}>
            <Typography use={"headline3"} className={styles.contactus_title}>
                {t("contact-us")}
            </Typography>
            <Elevation z={"10"}>
                <Card>
                    <Grid style={{ margin: "0px" }}>
                        <GridRow>
                            <GridCell desktop={12} tablet={12} phone={12}>
                                <iframe loading="lazy" allowfullscreen
                                    src="https://www.google.com/maps/embed/v1/place?q=place_id:EkFHYWNoYW5jaXDDoSAtIENob2NvbnTDoSAjNS01LCBHYWNoYW5jaXDDoSwgQ3VuZGluYW1hcmNhLCBDb2xvbWJpYSIwEi4KFAoSCQU4yDjvckCOEUottNVNo9t7EAUqFAoSCS2IknUHF0COETA81GnTw0V4&key=..."></iframe>
                            </GridCell>
                            <GridCell desktop={8} tablet={12} phone={12}>
                                <GridRow>
                                    <GridCell desktop={3} tablet={12} phone={12}>
                                        <MDIcon icon={"map-marker-radius"} />&nbsp;Dirección
                                    </GridCell>
                                    <GridCell desktop={8} tablet={12} phone={12}>
                                        Km 55 Via Gachancipá - Chocontá
                                    </GridCell>
                                </GridRow>
                                <br />
                                <GridRow>
                                    <GridCell desktop={3} tablet={12} phone={12}>
                                        <MDIcon icon={"phone"} />&nbsp;Teléfono
                                    </GridCell>
                                    <GridCell desktop={8} tablet={12} phone={12}>
                                        +57 310 773  3582
                                    </GridCell>
                                </GridRow>
                                <br />
                                <GridRow>
                                    <GridCell desktop={3} tablet={12} phone={12}>
                                        <MDIcon icon={"gmail"} />&nbsp;Correo
                                    </GridCell>
                                    <GridCell desktop={8} tablet={12} phone={12}>
                                        villatatianarecreacional@gmail.com
                                    </GridCell>
                                </GridRow>
                            </GridCell>
                            <GridCell desktop={4} tablet={12} phone={12}>
                                <GridRow>
                                    <GridCell desktop={12} tablet={12} phone={12}>
                                        <a href={"https://www.facebook.com/VillaTatianaViota/"} target={"_blank"}
                                            className={styles.socialmedia_link}>
                                            <MDIcon icon={"facebook"} />&nbsp;Facebook
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