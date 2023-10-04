import React, { useState,useEffect } from 'react';
import "./weather.css";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import search_icon from "../Assets/search.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import rain_icon from "../Assets/rain.png";

const Weather = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [wicon,setwicon]=useState(cloud_icon);

    let apikey = "459505f6dfdcc75cda4876b910bd83b6";
    
    const handlechange = (e) => {
        setCity(e.target.value);
    }
    
    const handleclick = () => {
        let cityname = city;
        console.log(cityname);

        let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apikey}&units=metric`;

        fetch(api)
        .then((response) => response.json())
        .then((data) => {
            if(data.cod === 200) {
                setWeatherData(data);
                setError(null);
            } else {
                setError("City Not Found")
            }
        })
        .catch((error) => {
            setError("An error occurred while fetching data: " + error);
        })

      
    }

      useEffect(() => {
            if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
                const icon = weatherData.weather[0].icon;
                if (icon === "01d" || icon === "01n") {
                    setwicon(clear_icon)
                } else if (icon === "02d" || icon === "02n") {
                    setwicon(cloud_icon);
                } else if (icon === "03d" || icon === "03n") {
                    setwicon(drizzle_icon);
                } else if (icon === "04d" || icon === "04n") {
                    setwicon(drizzle_icon);
                } else if (icon === "09d" || icon === "09n") {
                    setwicon(rain_icon);
                } else {
                    setwicon(clear_icon)
                }
            }
        }, [weatherData]);

    return (
        <div className='main-wrapper'>
            <div className='container'>
                <div className='search-bar-parent'>   
                    <div><input type='text' placeholder='search' className="search-bar" onChange={handlechange} value={city}></input></div>
                    <div className="search-icon" onClick={handleclick}><img src={search_icon} className="search-icon-img" alt="Search" /></div>
                </div>

                {error && <div className="error-message">{error}</div>}

                {weatherData && (
                    <div>
                        <div class="cloud-parent">
                            <img src={wicon} class="cloud-img" alt="Cloud" />
                        </div>
                        <div className='temp'>{weatherData.main.temp}&deg;C</div>
                        <div className='city'>{weatherData.name}</div>
                        
                        <div className='weather-desc'>
                            <div className='humidity-parent'>
                                <div><img src={humidity_icon} alt="Humidity" /></div>
                                <div className='cl-white'>{weatherData.main.humidity}%</div>
                                <div className='cl-white'>Humidity</div>
                            </div>

                            <div className='wind-parent'>
                                <div><img src={wind_icon} alt="Wind Speed" /></div>
                                <div className='cl-white'>{weatherData.wind.speed}km/h</div>
                                <div className='cl-white'>Wind Speed</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Weather;
