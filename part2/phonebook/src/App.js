import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Filter from './components/Filter';
import Notification from './components/Notification';
import Number from './components/Number';
import PersonForm from './components/PersonForm';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterName, setFilterName] = useState('');
    const [isAdded, setisAdded] = useState(false);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('');

    const getDbData = () => {
        axios.get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }

    const setNotificationMessage = (message, type) => {
        setMessage(message);
        setMessageType(type);
        setTimeout(() => {
            setMessage(null);
            setMessageType('');
        }, 5000);

    }

    useEffect(() => {
        getDbData();
    }, []);

    useEffect(() => {
        if (isAdded === true) {
            getDbData();
            setisAdded(false);
        }
    }, [isAdded])

    const filteredPersons = persons.filter(person => (
        person.name.toLowerCase().includes(filterName)
    ))

    return (
        <>
            <Notification message={message} type={messageType} />
            <Filter
                filterName={filterName}
                setFilterName={setFilterName}
            />
            <PersonForm
                newName={newName}
                newNumber={newNumber}
                persons={persons}
                setNewName={setNewName}
                setNewNumber={setNewNumber}
                setisAdded={setisAdded}
                setNotificationMessage={setNotificationMessage}
            />
            <Number
                filteredPersons={filteredPersons}
                setisAdded={setisAdded}
                setNotificationMessage={setNotificationMessage}
            />
        </>
    )
}

export default App