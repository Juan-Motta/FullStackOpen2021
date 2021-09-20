import React from 'react';

const Weather = ({ weather }) => {

    if (weather) {
        return (
            <div>
                <h2>Weather in {weather.location.name}</h2>
                <p><strong>temperature: </strong>{weather.current.temperature} celcius</p>
                <img src={weather.current.weather_icons[0]} alt={weather.location.name}></img>
                <p><strong>wind: </strong>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
            </div>
        )
    } else {
        return (null);
    }

}

export default Weather;