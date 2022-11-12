import React, { useContext } from "react";
import { Drawer, DrawerContent, DrawerHeader } from "@rmwc/drawer";
import {
    List,
    ListItem,
    ListItemGraphic,
    ListItemText,
} from "@rmwc/list";
import { Link } from "react-router-dom";
import { IconButton } from "@rmwc/icon-button";
import DrawerContext from "./DrawerContext";
import MDIcon from "../MDIcon";
import Divider from "../Divider";
import { useTranslation } from "react-i18next";

const Navigation = () => {
    const { t } = useTranslation();
    const list = [
        {
            link: "/calendar",
            name: t("calendar"),
            icon: "calendar-check",
            route: "",
        },
        {
            link: "/booking",
            name: t("booking"),
            icon: "book-check",
            route: "",
        },
        {
            link: "/rental",
            name: t("rental"),
            icon: "alpha-r-box",
            route: "",
        },
        {
            link: "/contact-us",
            name: t("contact-us"),
            icon: "face-agent",
            route: "Contact Us",
        },
    ];

    const renderItems = () => {
        if (localStorage.getItem('token')) {
            return list.map((it, i) => {
                return (
                    <Link to={it.link}>
                        <ListItem>
                            <ListItemGraphic>
                                <MDIcon icon={it.icon} />
                            </ListItemGraphic>
                            <ListItemText>{it.name}</ListItemText>
                        </ListItem>
                    </Link>
                );
            });
        } else {
            list.shift()
            return list.map((it, i) => {
                return (
                    <Link to={it.link}>
                        <ListItem>
                            <ListItemGraphic>
                                <MDIcon icon={it.icon} />
                            </ListItemGraphic>
                            <ListItemText>{it.name}</ListItemText>
                        </ListItem>
                    </Link>
                );
            });
        }
    };

    return (<DrawerContent>
        <List avatarList vertical={"true"}>
            {renderItems()}
        </List>
    </DrawerContent>);;
};

const DrawerWrapper = () => {
    const { drawerOpen, setDrawerOpen } = useContext(DrawerContext);
    return (
        <Drawer modal open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <DrawerHeader style={{ paddingLeft: ".4rem" }}>
                <IconButton
                    onClick={() => setDrawerOpen(false)}
                    style={{ marginTop: ".8rem" }}
                >
                    <MDIcon icon={"close"} />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <DrawerContent>
                <Navigation />
            </DrawerContent>
        </Drawer>
    );
};

export default DrawerWrapper;
