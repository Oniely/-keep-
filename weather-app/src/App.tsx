import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SearchPlaces } from "./components/SearchPlaces";
import { Forecast } from "./components/Forecast";
import axios from "axios";
import { capitalCity } from "./datas/city.ts";

export interface WeatherDataProps {
    temp: number;
    feelsLike: number;
    windSpeed: number;
    windDegrees: number;
    humidity: number;
    pressure: number;

    timezone: number;
    sunsetTime: Date;
    
    icon: string;
    city: string;
    country: string;
}

const App: React.FC = () => {
    const API_KEY: string = "a0708cd146029da8679dfa66033438a1";

    const [search, setSearch] = useState("");
    const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(
        null
    );

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearch(
            e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
        );
    }

    useEffect(() => {
        if (capitalCity.includes(search)) {
            axios
                .get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
                )
                .then((res) => {
                    const data = res.data;
                    const unix = data.sys.sunset;
                    const sunset: Date = new Date(unix * 1000);

                    const dataSet: WeatherDataProps = {
                        temp: Math.ceil(data.main.temp),
                        feelsLike: Math.round(data.main.feels_like),
                        windSpeed: data.wind.speed,
                        windDegrees: data.wind.deg,
                        humidity: data.main.humidity,
                        pressure: data.main.pressure,

                        timezone: data.timezone / 3600,
                        sunsetTime: sunset,

                        icon: data.weather[0].icon,
                        city: data.name,
                        country: data.sys.country,
                    };
                    console.log(data);
                    setWeatherData(dataSet);
                });
        }
    }, [search]);

    return (
        <Container
            className="h-screen w-full mx-auto px-4 py-4"
            fluid
        >
            <Row className="flex h-full w-full rounded-3xl bg-whiteIsh">
                <Col className="w-full">
                    <SearchPlaces value={search} onChange={handleChange} />
                </Col>

                <Col className="lg:w-[40rem] sm:w-[25rem] h-full bg-[#11103a] rounded-e-3xl text-white">
                    <Forecast data={weatherData} />
                </Col>
            </Row>
        </Container>
    );
};

export default App;
