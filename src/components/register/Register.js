import React, { useState, useContext } from "react";
import { Button } from "@rmwc/button";
import { Card } from "@rmwc/card";
import { Elevation } from "@rmwc/elevation";
import { Grid, GridCell, GridRow } from "@rmwc/grid";
import { TextField } from "@rmwc/textfield";
import { Typography } from "@rmwc/typography";
import { useTranslation } from "react-i18next";
import LoginApi from "../../api/LoginApi";
import AlertMessageContext from "../../contexts/alert-message-context";
import MDIcon from "../mdc/MDIcon";
import styles from "./register.module.css"

const Register = () => {
    const { t } = useTranslation();
    const { dispatchData: dispatchNotification } = useContext(AlertMessageContext);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const register = () => {
        const data = {
            firstName,
            lastName,
            phoneNumber,
            email,
            username,
            password
        }
        LoginApi.signUp(data)
            .then((res) => {
                dispatchNotification({ text: res, type: 'success' });
                window.location.href = '/login';
            })
            .catch((err) => {
                dispatchNotification({ text: err, type: 'error' });
            })
    }

    return (
        <div className={styles.register_container}>
            <Grid>
                <GridCell desktop={2} tablet={12} phone={12} />
                <GridCell desktop={8} tablet={12} phone={12}>
                    <Elevation z={"10"}>
                        <Card>
                            <Grid style={{ margin: "0px" }} >
                                <GridRow>
                                    <GridCell desktop={12} tablet={12} phone={12}>
                                        <GridRow>
                                            <GridCell desktop={6} tablet={12} phone={12}>
                                                <TextField icon={"format-letter-case-upper"} outlined label={t("name")}
                                                    onChange={(e) => setFirstName(e.target.value)} />
                                            </GridCell>
                                            <GridCell desktop={6} tablet={12} phone={12}>
                                                <TextField icon={"format-letter-case-lower"} outlined label={t("last-name")}
                                                    onChange={(e) => setLastName(e.target.value)} />
                                            </GridCell>
                                        </GridRow>
                                        <br />
                                        <GridRow>
                                            <GridCell desktop={6} tablet={12} phone={12}>
                                                <TextField icon={"phone"} outlined label={t("phone")} type={"number"}
                                                    onChange={(e) => setPhoneNumber(e.target.value)} />
                                            </GridCell>
                                            <GridCell desktop={6} tablet={12} phone={12}>
                                                <TextField icon={"email"} outlined label={t("email")} type={"email"}
                                                    onChange={(e) => setEmail(e.target.value)} />
                                            </GridCell>
                                        </GridRow>
                                        <br />
                                        <GridRow>
                                            <GridCell desktop={6} tablet={12} phone={12}>
                                                <TextField icon={"account-outline"} outlined label={t("user")}
                                                    onChange={(e) => setUsername(e.target.value)} />
                                            </GridCell>
                                            <GridCell desktop={6} tablet={12} phone={12}>
                                                <TextField icon={"form-textbox-password"} outlined label={t("password")}
                                                    type={"password"} onChange={(e) => setPassword(e.target.value)} />
                                            </GridCell>
                                        </GridRow>
                                    </GridCell>
                                    <GridCell desktop={12} tablet={12} phone={12}>
                                        <GridCell span={12}>
                                            <Button label={t("register")} raised
                                                className={"button-full"} onClick={() => register()}>
                                                <MDIcon icon={"account-outline"} size={16}
                                                    style={{ color: "white" }} />
                                            </Button>
                                        </GridCell>
                                    </GridCell>
                                </GridRow>
                            </Grid>
                        </Card>
                    </Elevation>
                </GridCell>
                <GridCell desktop={2} tablet={12} phone={12} />
            </Grid>
        </div>
    )
};

export default Register;