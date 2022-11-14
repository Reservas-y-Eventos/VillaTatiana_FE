import React from "react";
import {
    Card, CardPrimaryAction,
} from "@rmwc/card";
import { Typography } from "@rmwc/typography";
import { useTranslation } from "react-i18next";
import Hero from "../../res/images/home.jpg"
import styles from "./home.module.css"

const Home = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.home_container}>
            <Card style={{ width: '50rem' }}>
                <CardPrimaryAction>
                    <img src={Hero} alt={"Hero"} />
                    <div style={{ padding: '0 1rem 1rem 1rem' }}>
                        <br />
                        <Typography use="headline6" tag="h2">
                            {t("who")}
                        </Typography>
                        <br />
                        <Typography
                            use="subtitle1"
                            tag="div"
                            theme="textSecondaryOnBackground"
                        >
                            {t("homeDescription")}
                        </Typography>
                    </div>
                </CardPrimaryAction>
            </Card>
        </div>
    )
}

export default Home