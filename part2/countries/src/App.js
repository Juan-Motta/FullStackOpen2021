import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
import Filter from './components/Filter';
import Country from './components/Country';
import Weather from './components/Weather';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        const countriesFromApi = response.data;
        const filteredCountries = countriesFromApi.filter(country => (
          country.name.toLowerCase().includes(filter.toLowerCase())
        ));
        if (filteredCountries.length <= 10) {
          setCountries(filteredCountries);
        } else {
          setCountries([])
        }
      })
  }, [filter]);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const apiKey = process.env.REACT_APP_API_KEY;
    if (countries.length === 1) {
      const country = countries[0];
      axios
        .get(`${baseUrl}?access_key=${apiKey}&query=${country.capital}`)
        .then(response => {
          setWeather(response.data);
        })
    } else {
      setWeather(null)
    }
  }, [countries])

  return (
    <div>
      <Filter label="find countries" setFilter={setFilter} />
      <Country countries={countries} setCountries={setCountries} />
      <Weather weather={weather} />
    </div>
  );
}

export default App;
