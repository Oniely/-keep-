import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SearchPlaces } from "./components/SearchPlaces";
import { Weather } from "./components/Weather";
import axios from "axios";

export interface WeatherDataProps {
    icon: string;
    date: string;

    city: string;

    temp: number;
    feelsLike: number;
    dt: string;
    weatherDescription: string;

    windSpeed: number;
    humidity: number;
    pressure: number;
}

const API_KEY: string = "a0708cd146029da8679dfa66033438a1";
const TIME_API_KEY: string = "6I39QXGUAMVL";

const App: React.FC = () => {
    const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(
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

                console.log(data);

                const timeResponse = await axios.get(
                    `https://api.timezonedb.com/v2.1/get-time-zone?key=${TIME_API_KEY}&format=json&by=position&lat=${lat}&lng=${lon}`
                );

                const timeData = timeResponse.data;

                console.log(timeData);

                const dateTime = new Date(timeData.formatted);

                const date = dateTime.toLocaleDateString();
                const time = dateTime.toLocaleTimeString();

                const timeWithSeconds = time;

                const currentDate = formatDateString(date);
                const currentTime = timeWithSeconds.replace(/:\d{2} /, " ");

                const dataSet = {
                    icon: data.weather[0].icon,
                    date: currentDate,

                    city: city,

                    temp: Math.ceil(data.main.temp),
                    feelsLike: Math.round(data.main.feels_like),
                    dt: currentTime,
                    weatherDescription: data.weather[0].description,

                    windSpeed: data.wind.speed,
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                };

                setWeatherData(dataSet);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [lat,lon,city])

    function formatDateString(dateString: string) {
        const dateParts = dateString.split("/");
        const month = parseInt(dateParts[0], 10);
        const day = parseInt(dateParts[1], 10);
        const year = parseInt(dateParts[2], 10);

        const monthNames = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
        ];
        const monthName = monthNames[month - 1];
        const formattedDate = `${monthName} ${day}, ${year}`;

        return formattedDate;
    }

    return (
        <Container className="h-screen w-full mx-auto px-4 py-4" fluid>
            <Row className="flex h-full w-full rounded-3xl bg-whiteIsh">
                <Col className="w-full">
                    <SearchPlaces
                        onSearchChange={handleChange}
                    />
                </Col>

                <Col className="lg:w-[40rem] sm:w-[25rem] h-full bg-[#1a1a52] rounded-e-3xl text-white">
                    <Weather data={weatherData} />
                </Col>
            </Row>
        </Container>
    );
};

export default App;
