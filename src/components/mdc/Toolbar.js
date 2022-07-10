import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@rmwc/button';
import { Typography } from "@rmwc/typography";
import { ThemeProvider } from '@rmwc/theme';
import {
    TopAppBar, TopAppBarActionItem, TopAppBarFixedAdjust, TopAppBarRow, TopAppBarSection, TopAppBarTitle
} from '@rmwc/top-app-bar';
import { useTranslation } from 'react-i18next';
import DrawerContext from './drawer/DrawerContext';
import MDIcon from './MDIcon';
import styles from './toolbar.module.css'

const ToolbarTheme = {
    primary: '#2376d9',
    primaryBg: '#2376d9',
    secondary: '#c8e6f3',
    secondaryBg: '#c8e6f3',
    error: '#d43551',
    background: '#fafafa',
    onPrimary: '#2376d9',
    onSecondary: '#002a66',
};

const Toolbar = ({ useCustomTheme = true }) => {
    const { t, i18n } = useTranslation();
    const { setDrawerOpen } = useContext(DrawerContext);

    const changeLanguage = (code) => {
        if (i18n) i18n.changeLanguage(code);
    };

    const renderToolbar = (content) => {
        if (useCustomTheme) {
            return (
                <ThemeProvider options={ToolbarTheme}>
                    <TopAppBar style={{ background: '#fff' }}>
                        {content}
                    </TopAppBar>
                </ThemeProvider>
            );
        }
        return (<TopAppBar>{content}</TopAppBar>);
    };

    return (
        <>
            {renderToolbar(
                <TopAppBarRow>
                    <TopAppBarSection alignStart>
                        <TopAppBarActionItem onClick={() => setDrawerOpen(true)}>
                            <MDIcon icon={'menu'} />
                        </TopAppBarActionItem>
                        <Link to={'/'}>
                            <TopAppBarTitle>
                                <Typography className={styles.banner}>
                                    Villa Tatiana
                                </Typography>
                            </TopAppBarTitle>
                        </Link>
                    </TopAppBarSection>
                    <TopAppBarSection alignEnd>
                        <Button label={'ESP | ENG'} onClick={() => changeLanguage(i18n.language === 'es' ? 'en' : 'es')} />
                        <Link to={'/login'}>
                            <Button outlined label={t('login')} >
                                <MDIcon icon={'login'} size={16} />
                            </Button>
                        </Link>
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
