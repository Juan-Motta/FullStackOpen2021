import axios from 'axios';
import React from 'react'

const Person = ({ name, number, id, setisAdded, setNotificationMessage }) => {

    const deletePerson = () => {
        const result = window.confirm(`Desea eliminar a ${name} - ${number}`);
        if (result) {
            axios
                .delete(`http://localhost:3001/persons/${id}`)
                .then(response => {
                    setNotificationMessage(`${name} has already been removed from server`, 'error')
                    setisAdded(true)
                });
        }
    }

    return (
        <p>{name} {number} <button onClick={deletePerson}>delete</button></p>
    )
}

export default Person;