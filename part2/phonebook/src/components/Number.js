import React from 'react';

import Person from './Person';

const Number = ({ filteredPersons, setisAdded, setNotificationMessage }) => {
    return (
        <div>
            <h2>Numbers</h2>
            {filteredPersons.map(person => (
                <Person key={person.number} id={person.id} name={person.name} number={person.number} setisAdded={setisAdded} setNotificationMessage={setNotificationMessage} />
            ))}
        </div>
    )
}

export default Number;