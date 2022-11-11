import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@rmwc/button";
import { Card } from "@rmwc/card";
import { Elevation } from "@rmwc/elevation";
import { Grid, GridCell, GridRow } from "@rmwc/grid";
import { TextField } from "@rmwc/textfield";
import { Typography } from "@rmwc/typography";
import { useTranslation } from "react-i18next";
import MDIcon from "../mdc/MDIcon";
import AlertMessageContext from "../../contexts/alert-message-context";
import LoginApi from "../../api/LoginApi";
import styles from "./login.module.css"

const LogIn = () => {
    const { t } = useTranslation();
    const { dispatchData: dispatchNotification } = useContext(AlertMessageContext);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const logIn = () => {
        const data = {
            email,
            password
        }
        LoginApi.signIn(data)
            .then((res) => {
                console.log(res);
                localStorage.setItem('user', res.validation.name);
                localStorage.setItem('dni', res.validation.dni);
                localStorage.setItem('rol', res.validation.role);
                localStorage.setItem('token', res.token);
                dispatchNotification({ text: t("success-login"), type: 'success' });
                window.location.href = '/';
            })
            .catch((err) => {
                dispatchNotification({ text: err, type: 'error' });
            })
    }

    return (
        <div className={styles.login_container}>
            <Grid>
                <GridCell desktop={4} tablet={12} phone={12} />
                <GridCell desktop={4} tablet={12} phone={12}>
                    <Elevation z={"10"}>
                        <Card>
                            <Grid style={{ margin: "0px" }} >
                                <GridRow>
                                    <GridCell desktop={12} tablet={12} phone={12}>
                                        <TextField icon={"email"} outlined label={t("email")}
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </GridCell>
                                    <GridCell desktop={12} tablet={12} phone={12}>
                                        <TextField icon={"form-textbox-password"} outlined label={t("password")}
                                            type={"password"} onChange={(e) => setPassword(e.target.value)} />
                                    </GridCell>
                                    <GridCell desktop={12} tablet={12} phone={12}>
                                        <GridCell span={12}>
                                            <Button label={t("login")} raised className={"button-full"}
                                                onClick={() => logIn()}>
                                                <MDIcon icon={"login"} size={16}
                                                    style={{ color: "white" }} />
                                            </Button>
                                        </GridCell>
                                    </GridCell>
                                    <GridCell desktop={12} tablet={12} phone={12}>
                                        <Typography use="caption" className={styles.register_caption}>
                                            {t("caption")}&nbsp;
                                            <Link to={"/sign-up"}>
                                                {t("register")}
                                            </Link>
                                        </Typography>
                                    </GridCell>
                                </GridRow>
                            </Grid>
                        </Card>
                    </Elevation>
                </GridCell>
                <GridCell desktop={4} tablet={12} phone={12} />
            </Grid>
        </div>
    )
}
export default LogIn