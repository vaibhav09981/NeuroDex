import React, { useState, useRef, useLayoutEffect } from 'react'
import { useEffect } from 'react'
import './weatherApp.css'
import gsap from 'gsap'
import weatherBg from '@assets/Videos/wbg4.mp4'
import clearDay from '@assets/Images/WeatherIcons/sunny.png'
import clearNight from '@assets/Images/WeatherIcons/clearnight.png'
import cloudyDay from '@assets/Images/WeatherIcons/sunnycloudy.png'
import cloudyNight from '@assets/Images/WeatherIcons/cloudynight.png'
import dayRain from '@assets/Images/WeatherIcons/dayrain.png'
import nightRain from '@assets/Images/WeatherIcons/nightrain.png'
import thunderstorm from '@assets/Images/WeatherIcons/thunderstorm.png'
import brokencd from '@assets/Images/WeatherIcons/brokencd.png'
import brokencn from '@assets/Images/WeatherIcons/brokencn.png'


function WeatherApp() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState('');
    const [error, setError] = useState('');

    // Add refs for animation
    const containerRef = useRef(null);
    const topRef = useRef(null);
    const tempRef = useRef(null);
    const miscRef = useRef(null);

    // Add animation effect
    useLayoutEffect(() => {
        // Set initial visibility
        gsap.set([containerRef.current, topRef.current, tempRef.current, miscRef.current], {
            opacity: 0,
            y: 30
        });

        const tl = gsap.timeline({
            defaults: {
                ease: 'power2.out',
            }
        });

        tl.to(containerRef.current, {
            duration: 1,
            opacity: 1,
            y: 0,
        })
        .to(topRef.current, {
            duration: 0.6,
            opacity: 1,
            y: 0,
        }, '-=0.5')
        .to(tempRef.current, {
            duration: 0.6,
            opacity: 1,
            y: 0,
        }, '-=0.3')
        .to(miscRef.current, {
            duration: 0.6,
            opacity: 1,
            y: 0,
        }, '-=0.3');

    }, []);

    const allIcons = {
        "01d": clearDay,
        "01n": clearNight,
        "02d": cloudyDay,
        "02n": cloudyNight,
        "03d": cloudyDay,
        "03n": cloudyNight,
        "04d": brokencd,
        "04n": brokencn,
        "09d": dayRain,
        "09n": nightRain,
        "10d": dayRain,
        "10n": nightRain,
        "11d": thunderstorm,
        "11n": thunderstorm,
        "50d": clearDay,
        "50n": clearNight,
    }

    const getWeather = async (city) => {
        if (!city.trim()) {
            setError('Please enter a city name');
            return;
        }

        try {
            setError('');
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            );
            const data = await response.json();
            console.log(data);

            if (response.status === 404) {
                setError('City not found');
                setWeather('');
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clearDay;
            setWeather({
                city: data.name,
                temp: data.main.temp,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                feelsLike: data.main.feels_like,
                clouds: data.clouds.all,
                rain: data.rain,
                icon: icon
            });
        } catch (error) {
            console.error('Error fetching weather:', error);
            setError('Failed to fetch weather data');
            setWeather('');
        }
    };

    useEffect(() => {
        getWeather("Delhi");
    }, [])

    return (
        <>
            <div className="bgVideo">
                <video
                    src={weatherBg}
                    autoPlay
                    muted
                    loop
                    playsInline
                ></video>
            </div>
            <div className="weatherPage">
                <div className="wContainer" ref={containerRef}>
                    <div className="wTop" ref={topRef}>
                        <input
                            type="text"
                            value={city}
                            placeholder='Enter a city name....'
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <button onClick={() => getWeather(city)}>Check</button>
                    </div>
                    {error && <div style={{ color: 'red', textAlign: 'center', margin: '10px 0' }}>{error}</div>}
                    <div className="wTemp" ref={tempRef}>
                        <h2>{weather ? weather.city : 'City'}</h2>
                        <div className="wIcon">
                            <h3>{weather ? `${Math.round(weather.temp)}°C` : 'N/A'}</h3>
                            <img src={weather?.icon || clearDay} alt="weather icon" />
                        </div>
                        <h3>Feels Like {weather ? `${Math.round(weather.feelsLike)}°C` : 'N/A'}</h3>
                    </div>
                    <div className="separation"></div>
                    <div className="wMisc" ref={miscRef}>
                        <div className="miscElem">
                            <span>Pressure</span>
                            <span>{weather ? `${weather.pressure}hPa` : 'N/A'}</span>
                        </div>
                        <div className="miscElem">
                            <span>Humidity</span>
                            <span>{weather ? `${weather.humidity}%` : 'N/A'}</span>
                        </div>
                        <div className="miscElem">
                            <span>Cloud</span>
                            <span>{weather ? `${weather.clouds}%` : 'N/A'}</span>
                        </div>
                        <div className="miscElem">
                            <span>Rain</span>
                            <span>{weather?.rain?.['1h'] ? `${weather.rain['1h']}mm` : '0mm'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WeatherApp