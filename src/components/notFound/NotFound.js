import React from "react";
import { Fab } from "@rmwc/fab";
import { Typography } from "@rmwc/typography";
import { useTranslation } from "react-i18next";
import notFoundBg from "../../res/images/notFoundBg.svg"
import styles from "./notFound.module.css"

const NotFound = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.notFound_container}>
            <img src={notFoundBg} className={styles.notFoundBg_picture}
                alt={"404"} />
            <Typography use={"headline4"}>{t("not-found")}</Typography>
            <Typography use={"headline5"}>{t("not-found-label")}</Typography>
            <br />
            <Fab icon={"arrow-left-bold"} mini
                style={{ backgroundColor: "#08C7C0" }}
                onClick={() => window.location.href = "/login"} />
        </div>
    )
}

export default NotFound
