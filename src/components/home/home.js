import React from "react";
import {
    Card, CardPrimaryAction,
} from "@rmwc/card";
import { Typography } from "@rmwc/typography";
import { useTranslation } from "react-i18next";
import Hero from "../../res/images/home.jpg"
import styles from "./home.module.css"

const Home = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className={styles.home_container}>
            <Card style={{ width: '50rem' }}>
                <CardPrimaryAction>
                    <img src={Hero} />
                    <div style={{ padding: '0 1rem 1rem 1rem' }}>
                        <br />
                        <Typography use="headline6" tag="h2">
                            {t("who")}
                        </Typography>
                        <br />
                        <Typography
                            use="body1"
                            tag="div"
                            theme="textSecondaryOnBackground"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
                    </div>
                </CardPrimaryAction>
            </Card>
        </div>
    )
}

export default Home