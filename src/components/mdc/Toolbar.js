import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@rmwc/theme';
import {
    TopAppBar, TopAppBarActionItem, TopAppBarFixedAdjust, TopAppBarRow, TopAppBarSection, TopAppBarTitle
} from '@rmwc/top-app-bar';
import { useTranslation } from 'react-i18next';
import DrawerContext from './drawer/DrawerContext';
import MDIcon from './MDIcon';

const ToolbarTheme = {
    primary: '#4d4d4d',
    primaryBg: '#fff',
    error: '#d43551',
    background: '#fff',
    onPrimary: '#4d4d4d',
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
                        <TopAppBarActionItem icon={''} onClick={() => setDrawerOpen(true)}>
                            <MDIcon icon={'menu'} />
                        </TopAppBarActionItem>
                        <Link to={'/'}>
                            <TopAppBarTitle>Villa Tatiana</TopAppBarTitle>
                        </Link>
                    </TopAppBarSection>
                    <TopAppBarSection alignEnd>
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
