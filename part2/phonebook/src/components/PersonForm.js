import axios from 'axios';
import React from 'react';

const PersonFilter = ({ newName, newNumber, persons, setNewName, setNewNumber, setisAdded, setNotificationMessage }) => {

    const addPerson = (e) => {
        e.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber,
        };

        const repeatedPerson = persons.filter(person =>
            person.name.toLowerCase().trim() === personObject.name.toLowerCase().trim()
        );

        isRepeated(personObject, repeatedPerson);
    }

    const isRepeated = (personObject, repeatedPerson) => {
        if (repeatedPerson.length === 0) {
            axios
                .post('http://localhost:3001/api/persons', personObject)
                .then(response => setNotificationMessage(`Added ${personObject.name}`, 'success'));
            setisAdded(true);
            setNewName('');
            setNewNumber('');
        } else {
            repeatedPerson[0] = { ...repeatedPerson[0], number: newNumber };
            axios
                .put(`http://localhost:3001/api/persons/${repeatedPerson[0].id}`, repeatedPerson[0])
                .then(response => setNotificationMessage(`Added ${repeatedPerson[0].name}`, 'success'));
            setisAdded(true);
            setNewName('');
            setNewNumber('');
        }
    }

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    }

    return (
        <div>
            <h2>add a new</h2>
            <form>
                <div>
                    <div>
                        name: <input value={newName} onChange={handleNameChange} />
                    </div>
                    <div>
                        number: <input value={newNumber} onChange={handleNumberChange} />
                    </div>
                </div>
                <div>
                    <button type="submit" onClick={addPerson} >add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonFilter;