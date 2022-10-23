import React, { useContext } from "react";
import { Drawer, DrawerContent, DrawerHeader } from "@rmwc/drawer";
import {
    List,
    ListItem,
    ListItemGraphic,
    ListItemText,
    CollapsibleList,
    SimpleListItem
} from "@rmwc/list";
import { Link } from "react-router-dom";
import { IconButton } from "@rmwc/icon-button";
import DrawerContext from "./DrawerContext";
import MDIcon from "../MDIcon";
import Divider from "../Divider";
import { useTranslation } from "react-i18next";

const Navigation = () => {
    const { t } = useTranslation();
    const domains = localStorage.getItem("route")
        ? localStorage.getItem("route").split(",")
        : [];
    const list = [
        {
            link: "/calendar",
            name: t("calendar"),
            icon: "calendar-check",
            route: "",
        },
        {
            text: t("booking"),
            icon: "book-check",
            collapsibleList: true,
            items: [
                {
                    link: "/property",
                    name: t("property"),
                    icon: "home",
                    route: "task",
                },
                {
                    link: "/salon",
                    name: t("salon"),
                    icon: "sofa",
                    route: "",
                },
            ],
        },
        {
            text: t("rental"),
            icon: "alpha-r-box",
            collapsibleList: true,
            items: [
                {
                    link: "/objects",
                    name: t("objects"),
                    icon: "soccer",
                    route: "",
                },
                {
                    link: "/spaces",
                    name: t("spaces"),
                    icon: "soccer-field",
                    route: "",
                },
            ],
        },
        {
            link: "/contact-us",
            name: t("contact-us"),
            icon: "face-agent",
            route: "Contact Us",
        },
    ];

    const searchRoutes = (props) =>
        domains.filter(
            (team) => team.toLowerCase() === props.toLowerCase()
        );

    const renderItems = (items = list) => {
        return items.map((it) => {
            if (it.collapsibleList) {
                const data = renderItems(it.items);
                if (data[0]) {
                    return (
                        <CollapsibleList
                            handle={
                                <SimpleListItem
                                    text={it.text}
                                    graphic={it.icon}
                                    metaIcon={"chevron-right"}
                                />
                            }
                        >
                            {data}
                        </CollapsibleList>
                    );
                }
                return "";
            } else {
                if (searchRoutes(it.route).length > 0 || domains[0] === "*") {
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
                }
                return (
                    <Link to={it.link}>
                        <ListItem>
                            <ListItemGraphic>
                                <MDIcon icon={it.icon} />
                            </ListItemGraphic>
                            <ListItemText>{it.name}</ListItemText>
                        </ListItem>
                    </Link>
                );;
            }
        });
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
