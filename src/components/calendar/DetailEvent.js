import React, { useContext, useEffect } from "react";
import { Button } from "@rmwc/button";
import { Typography } from "@rmwc/typography";
import { Grid, GridCell, GridRow } from "@rmwc/grid";
import { Dialog, DialogContent, DialogTitle } from "@rmwc/dialog";
import { useTranslation } from "react-i18next";
import CalendarContext from "../../contexts/calendar-context";
import ServicesApi from "../../api/ServicesApi";

const DetailEvent = (props) => {
    const { t } = useTranslation();
    const { data } = props
    const { atrr, meth } = useContext(CalendarContext);
    const { openDetailEvent } = atrr
    const { setOpenDetailEvent } = meth

    useEffect(() => {
        if (data.event) {
            console.log('data ', data.event._def.publicId);
            ServicesApi.getReservationById(data.event._def.publicId)
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        }
    }, [data])

    return (
        <>
            <Dialog open={openDetailEvent} onClose={() => setOpenDetailEvent(false)} >
                <DialogTitle>
                    {t("confirmDetail")}
                </DialogTitle>
                <DialogContent>
                    <Grid>
                        <GridCell desktop={12} tablet={12} phone={12}>
                            <GridRow>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {t("service")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {t("price")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {t("state")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                        {t("description")}
                                    </Typography>
                                </GridCell>
                                <GridCell desktop={6} tablet={12} phone={12}>
                                    <Typography use={"headline6"}>
                                    </Typography>
                                </GridCell>
                            </GridRow>
                        </GridCell>
                        <GridCell desktop={12} tablet={12} phone={12}>
                            <GridRow>
                                <GridCell desktop={6}>
                                    <Button label={t("confirm")} raised className={"button-full"} />
                                </GridCell>
                            </GridRow>
                        </GridCell>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DetailEvent