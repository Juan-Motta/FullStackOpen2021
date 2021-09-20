import React from 'react'

const Filter = ({ filterName, setFilterName }) => {

    const handleFilterName = (e) => {
        setFilterName(e.target.value);
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                <div>
                    filter shown with <input value={filterName} onChange={handleFilterName} />
                </div>
            </div>
        </div>
    )
}

export default Filter;