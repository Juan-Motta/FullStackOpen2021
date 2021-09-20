import React from 'react';
import '../index.css';

const Notification = ({ message, type }) => {

    if (message) {
        return (
            <div className={type}>{message}</div>
        )
    } else {
        return null;
    }

}

export default Notification;