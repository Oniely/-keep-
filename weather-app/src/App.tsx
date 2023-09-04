import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SearchPlaces } from "./components/SearchPlaces";
import { Forecast } from "./components/Forecast";
import axios from "axios";
import { capitalCity } from "./datas/city";

export interface WeatherDataProps {
    temp: number;
    feelsLike: number;
    windSpeed: number;
    windDegrees: number;
    humidity: number;
    pressure: number;

    weatherDescription: string;
    icon: string;
    city: string;
    country: string;
    sunsetTime: string;
}

const App: React.FC = () => {
    const API_KEY: string = "a0708cd146029da8679dfa66033438a1";

    const [searchCity, setSearchCity] = useState("");
    const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(
        null
    );
    
    function timestampToTime(x: number) {
        const date = new Date(x * 1000);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const formatTime = hours + ":" + minutes;
        return formatTime;
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value: string =
            e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);

        setSearchCity(value);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (capitalCity.includes(searchCity)) {
                try {
                    const geoResponse = await axios.get(
                        `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&appid=${API_KEY}`
                    );

                    const geoData = geoResponse.data;

                    const lat = geoData[0].lat;
                    const lon = geoData[0].lon;

                    const weatherResponse = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
                    );

                    const data = weatherResponse.data;

                    console.log(data);

                    const dataSet = {
                        temp: Math.ceil(data.main.temp),
                        feelsLike: Math.round(data.main.feels_like),
                        windSpeed: data.wind.speed,
                        windDegrees: data.wind.deg,
                        humidity: data.main.humidity,
                        pressure: data.main.pressure,
                        icon: data.weather[0].icon,
                        city: searchCity,
                        country: data.sys.country,
                        weatherDescription: data.weather[0].description,
                        sunsetTime: timestampToTime(data.sys.sunset),
                    };

                    setWeatherData(dataSet);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();

    }, [searchCity]);
    
    return (
        <Container className="h-screen w-full mx-auto px-4 py-4" fluid>
            <Row className="flex h-full w-full rounded-3xl bg-whiteIsh">
                <Col className="w-full">
                    <SearchPlaces value={searchCity} onChange={handleChange} />
                </Col>

                <Col className="lg:w-[40rem] sm:w-[25rem] h-full bg-[#1a1a52] rounded-e-3xl text-white">
                    <Forecast data={weatherData} />
                </Col>
            </Row>
        </Container>
    );
};

export default App;
