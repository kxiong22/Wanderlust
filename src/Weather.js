import React from 'react';

function Weather(props) {
    var iconURL = 'http://openweathermap.org/img/wn/' + props.weather.icon + '@2x.png';
    return (
        <div>
            <div className="weather-desc">{props.weather.desc}</div>
            <div>
                <img src={iconURL} alt="icon"/>
                <span className="weather-temp">{Math.round(props.weather.temp)}°F</span>
            </div>
            <div>Wind: {Math.round(props.weather.wind)} mph</div>
        </div>
    )
}

export default Weather