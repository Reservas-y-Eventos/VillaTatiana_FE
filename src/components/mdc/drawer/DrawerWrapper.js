import React, { useContext, useEffect } from 'react';
import { Drawer, DrawerContent, DrawerHeader } from '@rmwc/drawer';
import {
    List,
    ListItem,
    ListItemGraphic,
    ListItemText,
    CollapsibleList,
    SimpleListItem
} from '@rmwc/list';
import { Link } from 'react-router-dom';
import { IconButton } from '@rmwc/icon-button';
import DrawerContext from './DrawerContext';
import MDIcon from '../MDIcon';
import Divider from '../Divider';
import { Button } from '@rmwc/button';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
    const domains = localStorage.getItem('route')
        ? localStorage.getItem('route').split(',')
        : [];
    const list = [
        {
            link: '/',
            name: 'Calendar',
            icon: 'calendar-check',
            route: '',
        },
        {
            text: 'Booking',
            icon: 'book-check',
            collapsibleList: true,
            items: [
                {
                    link: '',
                    name: 'Property',
                    icon: 'home',
                    route: 'task',
                },
                {
                    link: '',
                    name: 'Salon',
                    icon: 'sofa',
                    route: '',
                },
            ],
        },
        {
            text: 'Rental',
            icon: 'alpha-r-box',
            collapsibleList: true,
            items: [
                {
                    link: '',
                    name: 'Objects',
                    icon: 'soccer',
                    route: '',
                },
                {
                    link: '',
                    name: 'Spaces',
                    icon: 'soccer-field',
                    route: '',
                },
            ],
        },
        {
            link: '/bot',
            name: 'Contact Us',
            icon: 'face-agent',
            route: 'Contact Us',
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
                                    metaIcon={'chevron-right'}
                                />
                            }
                        >
                            {data}
                        </CollapsibleList>
                    );
                }
                return '';
            } else {
                if (searchRoutes(it.route).length > 0 || domains[0] === '*') {
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
        <List avatarList vertical={'true'}>
            {renderItems()}
        </List>
    </DrawerContent>);;
};

const DrawerWrapper = () => {
    const { drawerOpen, setDrawerOpen } = useContext(DrawerContext);
    return (
        <Drawer modal open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            <DrawerHeader style={{ paddingLeft: '.4rem' }}>
                <IconButton
                    onClick={() => setDrawerOpen(false)}
                    style={{ marginTop: '.8rem' }}
                >
                    <MDIcon icon={'close'} />
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
