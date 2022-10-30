import React from 'react';
import PropTypes from 'prop-types';

const MDIcon = ({ icon, size = 24, className = '', title = '', style = {} }) => (
    <span className={`mdi mdi-${size}px mdi-${icon} ${className}`} title={title} style={style} />);

MDIcon.propTypes = {
    icon: PropTypes.string.isRequired,
    size: PropTypes.number,
    className: PropTypes.string,
    title: PropTypes.string,
    style: PropTypes.object,
};

export default MDIcon;
