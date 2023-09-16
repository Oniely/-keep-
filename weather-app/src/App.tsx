import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SearchPlaces } from "./components/SearchPlaces";
import { Weather } from "./components/Weather";
import { Forecast } from "./components/Forecast";
import axios from "axios";

export interface WeatherDataProps {
    icon: string;
    date: string;
    time: string;

    city: string;

    temp: number;
    feelsLike: number;
    mainDesc: string;
    weatherDescription: string;

    windSpeed: number;
    humidity: number;
    pressure: number;
}

export interface ForecastDaysProp {
    icon: string;
    mainDesc: string
    description: string;
    date: string;

    humidity: number;
    min_temp: number;
    curr_temp: number;
    max_temp: number;
}

export interface ForecastDataProps {
    day1: ForecastDaysProp;
    day2: ForecastDaysProp;
    day3: ForecastDaysProp;
    day4: ForecastDaysProp;
    day5: ForecastDaysProp;
}

const API_KEY: string = "a0708cd146029da8679dfa66033438a1";
const TIME_API_KEY: string = "6I39QXGUAMVL";

function getDayOfWeek(dateString: string) {
    const dateParts = dateString.split(" ");
    const currentDate = dateParts[0];

    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const date = new Date(currentDate);
    const dayOfWeekIndex = date.getDay();

    return daysOfWeek[dayOfWeekIndex];
}

const App: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(
        null
    );
    const [forecastData, setForecastData] = useState<ForecastDataProps | null>(
        null
    );

    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [city, setCity] = useState("");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleChange(searchData: any) {
        const [latitude, longitude] = searchData.value.split(" ");
        const cityName = searchData.label;

        setLat(latitude);
        setLon(longitude);
        setCity(cityName);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const weatherResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
                );
                const data = weatherResponse.data;

                const timeResponse = await axios.get(
                    `https://api.timezonedb.com/v2.1/get-time-zone?key=${TIME_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`
                );
                const timeData = timeResponse.data;

                const dateTime = new Date(timeData.formatted);
                const date = dateTime.toLocaleDateString();
                const time = dateTime.toLocaleTimeString();
                const timeWithSeconds = time;
                const currentDate = date;
                const currentTime = timeWithSeconds.replace(/:\d{2} /, " ");

                const dataSet = {
                    icon: data.weather[0].icon,
                    date: currentDate,
                    time: currentTime,

                    city: city,

                    temp: Math.ceil(data.main.temp),
                    feelsLike: Math.round(data.main.feels_like),
                    mainDesc: data.weather[0].main,
                    weatherDescription: data.weather[0].description,

                    windSpeed: data.wind.speed,
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                };

                setWeatherData(dataSet);

                const forecastResponse = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
                );
                const fData = forecastResponse.data;

                const day1 = fData.list[8];
                const day2 = fData.list[16];
                const day3 = fData.list[24];
                const day4 = fData.list[32];
                const day5 = fData.list[39];

                console.log(day1);

                const forecast1: ForecastDaysProp = {
                    icon: day1.weather[0].icon,
                    mainDesc: day1.weather[0].main,
                    description: day1.weather[0].description,
                    date: getDayOfWeek(day1.dt_txt),
                    humidity: day1.main.humidity,
                    min_temp: Math.floor(day1.main.temp_min),
                    curr_temp: Math.round(day1.main.temp),
                    max_temp: Math.ceil(day1.main.temp_max) + 1,
                };
                const forecast2: ForecastDaysProp = {
                    icon: day2.weather[0].icon,
                    mainDesc: day2.weather[0].main,
                    description: day2.weather[0].description,
                    date: getDayOfWeek(day2.dt_txt),
                    humidity: day2.main.humidity,
                    min_temp: Math.floor(day2.main.temp_min),
                    curr_temp: Math.round(day2.main.temp),
                    max_temp: Math.ceil(day2.main.temp_max),
                };
                const forecast3: ForecastDaysProp = {
                    icon: day3.weather[0].icon,
                    mainDesc: day3.weather[0].main,
                    description: day3.weather[0].description,
                    date: getDayOfWeek(day3.dt_txt),
                    humidity: day3.main.humidity,
                    min_temp: Math.floor(day3.main.temp_min),
                    curr_temp: Math.round(day3.main.temp),
                    max_temp: Math.ceil(day3.main.temp_max),
                };
                const forecast4: ForecastDaysProp = {
                    icon: day4.weather[0].icon,
                    mainDesc: day4.weather[0].main,
                    description: day4.weather[0].description,
                    date: getDayOfWeek(day4.dt_txt),
                    humidity: day4.main.humidity,
                    min_temp: Math.floor(day4.main.temp_min),
                    curr_temp: Math.round(day4.main.temp),
                    max_temp: Math.ceil(day4.main.temp_max),
                };
                const forecast5: ForecastDaysProp = {
                    icon: day5.weather[0].icon,
                    mainDesc: day5.weather[0].main,
                    description: day5.weather[0].description,
                    date: getDayOfWeek(day5.dt_txt),
                    humidity: day5.main.humidity,
                    min_temp: Math.floor(day5.main.temp_min),
                    curr_temp: Math.round(day5.main.temp),
                    max_temp: Math.ceil(day5.main.temp_max),
                };

                const tempForecastState: ForecastDataProps = {
                    day1: forecast1,
                    day2: forecast2,
                    day3: forecast3,
                    day4: forecast4,
                    day5: forecast5,
                };

                setForecastData(tempForecastState);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [lat, lon, city]);

    return (
        <Container className="h-screen w-full mx-auto px-4 py-4" fluid>
            <Row className="flex h-full w-full rounded-3xl bg-[#f5f5f5]">
                <Col className="w-full">
                    <SearchPlaces onSearchChange={handleChange} />
                    <Forecast data={forecastData} />
                </Col>

                <Col className="lg:w-[43rem] sm:w-[25rem] h-full bg-[#1a1a52] rounded-e-3xl text-white">
                    <Weather data={weatherData} />
                </Col>
            </Row>
        </Container>
    );
};

export default App;
