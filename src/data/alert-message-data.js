import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import AlertMessageContext from '../contexts/alert-message-context';

const reducer = (data, action) => {
    if (action && action.text && action.text.length > 0) {
        return {
            ...data, show: true, text: action.text, type: action.type,
        };
    }
    return { ...data, show: false };
};

const AlertMessageDataHolder = ({ children }) => {
    const [data, dispatchData] = useReducer(reducer, { show: false, text: '', type: '' });
    const [languageSelected, setLanguageSelected] = useState(false);

    return (
        <AlertMessageContext.Provider value={{ data, dispatchData, languageSelected, setLanguageSelected }}>
            {children}
        </AlertMessageContext.Provider>
    );
};

AlertMessageDataHolder.propTypes = { children: PropTypes.node };

export default AlertMessageDataHolder;