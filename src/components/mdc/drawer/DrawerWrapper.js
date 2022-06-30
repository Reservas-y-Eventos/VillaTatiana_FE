import React, { useContext } from 'react';
import { Drawer, DrawerContent, DrawerHeader } from '@rmwc/drawer';
import { List, ListItem } from '@rmwc/list';
import { IconButton } from '@rmwc/icon-button';
import DrawerContext from './DrawerContext';
import MDIcon from '../MDIcon';
import Divider from '../Divider';
import { Button } from '@rmwc/button';
import ScrollingLink from './ScrollingLink';
import { useTranslation } from 'react-i18next';

const DrawerWrapper = () => {
    const { t, i18n } = useTranslation();
    const { drawerOpen, setDrawerOpen } = useContext(DrawerContext);
    const closeDrawer = () => setDrawerOpen(false);

    const changeLanguage = (code) => {
        if (i18n) i18n.changeLanguage(code);
    };

    return (
        <Drawer modal open={drawerOpen} onClose={closeDrawer}>
            <DrawerHeader style={{ paddingLeft: '.4rem' }}>
                <IconButton onClick={closeDrawer} style={{ marginTop: '.4rem' }}>
                    <MDIcon icon={'close'} />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <DrawerContent>
                <List>
                    <ScrollingLink to={'/#'}>
                        <ListItem>{t('main')}</ListItem>
                    </ScrollingLink>
                    <ScrollingLink to={'#solutions'}>
                        <ListItem>{t('solutions')}</ListItem>
                    </ScrollingLink>
                    <ScrollingLink to={'#benefits'}>
                        <ListItem>{t('benefits')}</ListItem>
                    </ScrollingLink>
                    <ScrollingLink to={'#model'}>
                        <ListItem>{t('model')}</ListItem>
                    </ScrollingLink>
                    <ScrollingLink to={'#about'}>
                        <ListItem>{t('about')}</ListItem>
                    </ScrollingLink>
                    <ListItem className={'drawer-item-no-ripple'} style={{ marginTop: '.8rem' }}>
                        <Button label={t('contact')} className={'primary rounded'} raised
                            style={{ margin: '.2rem 0rem' }}
                            tag={'a'} href={'/#contact'} />
                    </ListItem>
                    <ListItem className={'drawer-item-no-ripple'}>
                        <Button label={t('clients-access')} className={'secondary rounded'} raised
                            style={{ margin: '.2rem 0rem' }} />
                    </ListItem>
                    <ListItem>
                        <Button label={'ESP | ENG'}
                            onClick={() => changeLanguage(i18n.language === 'es' ? 'en' : 'es')} />
                    </ListItem>
                </List>
            </DrawerContent>
        </Drawer>
    );
};

export default DrawerWrapper;
