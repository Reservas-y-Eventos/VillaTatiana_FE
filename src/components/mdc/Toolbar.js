import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "@rmwc/button";
import { Typography } from "@rmwc/typography";
import { ThemeProvider } from "@rmwc/theme";
import {
    TopAppBar, TopAppBarActionItem, TopAppBarFixedAdjust, TopAppBarRow, TopAppBarSection, TopAppBarTitle
} from "@rmwc/top-app-bar";
import { Menu, MenuItem, MenuSurfaceAnchor } from "@rmwc/menu";
import { useTranslation } from "react-i18next";
import DrawerContext from "./drawer/DrawerContext";
import MDIcon from "./MDIcon";
import logo from "../../res/images/logo192.png"
import usa from "../../res/images/usa.png"
import spain from "../../res/images/spain.png"
import styles from "./toolbar.module.css"

const ToolbarTheme = {
    primary: "#2EBEC6",
    primaryBg: "#2EBEC6",
    secondary: "#39D7FE",
    secondaryBg: "#39D7FE",
    error: "#d43551",
    background: "#FAFAFA",
    onPrimary: "#FFF",
    onSecondary: "#2EBEC6",
};

const Toolbar = ({ useCustomTheme = true }) => {
    const { t, i18n } = useTranslation();
    const { setDrawerOpen } = useContext(DrawerContext);
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false)

    const changeLanguage = (code) => {
        console.log(code)
        if (i18n) i18n.changeLanguage(code);
    };

    const renderToolbar = (content) => {
        if (useCustomTheme) {
            return (
                <ThemeProvider options={ToolbarTheme}>
                    <TopAppBar style={{ background: "#FFF" }}>
                        {content}
                    </TopAppBar>
                </ThemeProvider>
            );
        }
        return (<TopAppBar>{content}</TopAppBar>);
    };

    const logOut = () => {
        try {
            localStorage.removeItem('user');
            localStorage.removeItem('rol');
            localStorage.removeItem('token');
            setShow(false)
            window.location.href = '/login';
        } catch (e) { // an error
        }
    };

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            setShow(false)
        } else {
            setShow(true)
        }
    }, [])

    return (
        <>
            {renderToolbar(
                <TopAppBarRow>
                    <TopAppBarSection alignStart>
                        <TopAppBarActionItem theme={['onSecondary']} onClick={() => setDrawerOpen(true)}>
                            <MDIcon icon={"menu"} />
                        </TopAppBarActionItem>
                        <Link to={"/"}>
                            <TopAppBarTitle>
                                <div className={styles.toolbar_container}>
                                    <img src={logo} className={styles.logo} />
                                    <Typography className={styles.banner}>
                                        &nbsp;Villa Tatiana
                                    </Typography>
                                </div>
                            </TopAppBarTitle>
                        </Link>
                    </TopAppBarSection>
                    <TopAppBarSection alignEnd>
                        <div className={styles.end_container}>
                            <Button onClick={() => changeLanguage("es")}>
                                <div className={styles.esp_container}>
                                    <img src={usa} />&nbsp;&nbsp;ESP
                                </div>
                            </Button>
                            <Typography use="subtitle2" className={styles.banner}>
                                |
                            </Typography>
                            <Button onClick={() => changeLanguage("en")} style={{'marginRight': '10px'}} >
                                <div className={styles.esp_container}>
                                    ENG&nbsp;<img src={spain} />
                                </div>
                            </Button>
                            {show
                                ? <>
                                    <MenuSurfaceAnchor>
                                        <Menu open={open} onClose={() => setOpen(false)}>
                                            <MenuItem onClick={() => logOut()}>
                                                <MDIcon icon={'logout'} className={'icon-bar'} />&nbsp;Logout
                                            </MenuItem>
                                        </Menu>
                                        <TopAppBarActionItem theme={['onSecondary']} className={'profile-tool'}>
                                            <div className={styles.profile_container}>
                                                <MDIcon icon={'account'} style={{ height: '100%' }} />
                                            </div>
                                        </TopAppBarActionItem>
                                        <TopAppBarActionItem theme={['onSecondary']} className={'profile-tool'} onClick={() => setOpen(!open)}>
                                            <div className={styles.user_container}>
                                                <Typography use="subtitle2" className={styles.banner}>
                                                    {localStorage.getItem('user')}
                                                </Typography>
                                                <Typography use="subtitle2" className={styles.banner}>
                                                    {localStorage.getItem('rol')}
                                                </Typography>
                                            </div>
                                        </TopAppBarActionItem>
                                    </MenuSurfaceAnchor>
                                </>
                                : <>
                                    <Link to={"/login"}>
                                        <Button label={t("login")} raised>
                                            <MDIcon icon={"login"} size={16}
                                                style={{ color: "white" }} />
                                        </Button>
                                    </Link>
                                </>
                            }
                        </div>
                    </TopAppBarSection>
                </TopAppBarRow>
            )}
            <TopAppBarFixedAdjust />
        </>
    );
};

Toolbar.propTypes = {
    useCustomTheme: PropTypes.bool,
};

export default Toolbar;
