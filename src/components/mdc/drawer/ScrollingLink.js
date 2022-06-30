import React, { useContext } from 'react';
import { HashLink } from 'react-router-hash-link';
import PropTypes from 'prop-types';
import DrawerContext from './DrawerContext';

const ScrollingLink = ({ to, children }) => {
    const { setDrawerOpen } = useContext(DrawerContext);

    const closeDrawer = () => setDrawerOpen(false);

    const scrollToPosition = (position) => {
        closeDrawer();
        window.scroll({
            top: position || 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    const scrollWithOffset = (el, offset) => {
        scrollToPosition(el.offsetTop - (offset || 0));
    };

    if (['/', '/#', '#'].includes(to)) {
        return (
            <div onClick={scrollToPosition}>
                {children}
            </div>
        );
    }

    return (
        <HashLink smooth to={to} scroll={(el) => scrollWithOffset(el)}>
            {children}
        </HashLink>
    );
};

ScrollingLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.oneOfType(
        [PropTypes.object, PropTypes.arrayOf(PropTypes.element)]).isRequired,
};

export default ScrollingLink;
