import React from "react";
import { Button } from "@rmwc/button";
import { Card } from "@rmwc/card";
import { Elevation } from "@rmwc/elevation";
import { Grid, GridCell, GridRow } from "@rmwc/grid";
import { TextField } from "@rmwc/textfield";
import { Typography } from "@rmwc/typography";
import { useTranslation } from 'react-i18next';
import MDIcon from "../mdc/MDIcon";
import styles from './register.module.css'

const Register = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.register_container}>
            <Grid>
                <GridCell desktop={2} tablet={12} phone={12} />
                <GridCell desktop={8} tablet={12} phone={12}>
                    <Elevation z={'10'}>
                        <Card>
                            <Grid style={{ margin: '0px' }} >
                                <GridRow>
                                    <GridCell desktop={6} tablet={12} phone={12}>
                                        <GridCell desktop={12} tablet={12} phone={12}>
                                            <Typography use="subtitle1">
                                                {t('name')}
                                            </Typography>
                                        </GridCell>
                                        <GridCell desktop={12} tablet={12} phone={12}>
                                            <TextField icon={'format-letter-case-upper'} outlined label={t('name')} />
                                        </GridCell>
                                        <GridCell desktop={12} tablet={12} phone={12}>
                                            <Typography use="subtitle1">
                                                {t('phone')}
                                            </Typography>
                                        </GridCell>
                                        <GridCell desktop={12} tablet={12} phone={12}>
                                            <TextField icon={'phone'} outlined label={t('phone')} />
                                        </GridCell>
                                        <GridCell desktop={12} tablet={12} phone={12}>
                                            <Typography use="subtitle1">
                                                {t('user')}
                                            </Typography>
                                        </GridCell>
                                        <GridCell desktop={12} tablet={12} phone={12}>
                                            <TextField icon={'account-outline'} outlined label={t('user')} />
                                        </GridCell>
                                    </GridCell>
                                    <GridCell desktop={6} tablet={12} phone={12}>
                                        <GridCell desktop={12} tablet={12} phone={12}>
                                            <Typography use="subtitle1">
                                                {t('last-name')}
                                            </Typography>
                                        </GridCell>
                                        <GridCell desktop={12} tablet={12} phone={12}>
                                            <TextField icon={'format-letter-case-lower'} outlined label={t('last-name')} />
                                        </GridCell>
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
                                    </GridCell>
                                    <GridCell desktop={12} tablet={12} phone={12}>
                                        <GridCell span={12}>
                                            <Button label={t('register')} raised
                                                className={'button-full'}>
                                                <MDIcon icon={'account-outline'} size={16}
                                                    style={{ color: 'white' }} />
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