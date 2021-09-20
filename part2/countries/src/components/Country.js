import React from 'react'

const Country = ({ countries, setCountries }) => {

    const handleShowClick = (country) => {
        setCountries([country])
    }

    if (countries.length === 0) {
        return (
            <p>To many matches, specify another filter</p>
        )
    } else if (countries.length === 1) {
        const country = countries[0];
        return (
            <div>
                <h2>{country.name}</h2>

                <p>capital {country.capital}</p>
                <p>population {country.population}</p>

                <h2>languages</h2>
                <ul>
                    {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
                </ul>

                <img src={country.flag} alt={country.name} width="200" />
            </div>
        )
    } else {
        return (
            <div>
                {countries.map(country =>

                    <p>{country.name} <button onClick={() => handleShowClick(country)}>show</button></p>

                )}
            </div>
        )
    }
}

export default Country;