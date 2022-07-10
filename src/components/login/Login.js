import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@rmwc/button";
import { Card } from "@rmwc/card";
import { Elevation } from "@rmwc/elevation";
import { Grid, GridCell, GridRow } from "@rmwc/grid";
import { TextField } from "@rmwc/textfield";
import { Typography } from "@rmwc/typography";
import { useTranslation } from 'react-i18next';
import MDIcon from "../mdc/MDIcon";
import LoginApi from "../../api/LoginApi";
import styles from './login.module.css'

const LogIn = () => {
    const { t } = useTranslation();

    const getUser = () => {
        LoginApi.getUserById('62c237de37829aa4b6a54092')
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        /* axios.get('http://da03-191-156-54-76.ngrok.io/user/62c237de37829aa4b6a54092')
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            }); */
    }

    return (
        <div className={styles.login_container}>
            <Grid>
                <GridCell desktop={4} tablet={12} phone={12} />
                <GridCell desktop={4} tablet={12} phone={12}>
                    <Elevation z={'10'}>
                        <Card>
                            <Grid style={{ margin: '0px' }} >
                                <GridRow>
                                    <GridCell desktop={12} tablet={12} phone={12}>
                                        <Typography use="subtitle1">
                                            {t('email')}
                                        </Typography>
                                    </GridCell>
                                    <GridCell desktop={12} tablet={12} phone={12}>
                                        <TextField icon={'email'} outlined label={t('email')} />
                                    </GridCell>
                                    <GridCell desktop={12} tablet={12} phone={12}>
                                        <Typography use="subtitle1">
                                            {t('password')}
                                        </Typography>
                                    </GridCell>
                                    <GridCell desktop={12} tablet={12} phone={12}>
                                        <TextField icon={'form-textbox-password'} outlined label={t('password')} />
                                    </GridCell>
                                    <GridCell desktop={12} tablet={12} phone={12}>
                                        <GridCell span={12}>
                                            <Button label={t('login')} raised
                                                className={'button-full'} onClick={() => getUser()}>
                                                <MDIcon icon={'login'} size={16}
                                                    style={{ color: 'white' }} />
                                            </Button>
                                        </GridCell>
                                    </GridCell>
                                    <GridCell desktop={12} tablet={12} phone={12}>
                                        <Typography use="caption" className={styles.register_caption}>
                                            {t('caption')}
                                            <Link to={'/sign-up'}>
                                                {t('register')}
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