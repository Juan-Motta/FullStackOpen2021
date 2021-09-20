import React from 'react'

const Filter = ({ label, setFilter }) => {

    const handleCountryChange = (e) => {
        setFilter(e.target.value);
    }

    return (
        <div>
            <label htmlFor="countries">{label}</label>
            <input
                type="text"
                id="country"
                name="country"
                onChange={handleCountryChange}
            />
        </div>
    )
}

export default Filter;