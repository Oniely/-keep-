import { currentDay, dayNumber, currentMonth } from "../utility/GetDay.ts";
import { WeatherDataProps } from "../App.tsx";
import wind_speed_icon from './img/wind_speed_icon.png';
import humidityIcon from './img/humidity.png';
import pressureIcon from './img/pressure.png';

interface ForecastProps {
    data: WeatherDataProps | null;
}

export const Forecast: React.FC<ForecastProps> = ({ data }) => {
    return (
        <div className="flex flex-col items-center text-center h-full pt-14 gap-20">
            <div className="flex gap-1">
                <div className="lg:w-14 sm:w-10">
                    <img
                        src={`http://openweathermap.org/img/w/${data?.icon}.png`}
                        alt="wicon"
                        className=" w-full h-full object-contain"
                    />
                </div>
                <div className="shrink-0">
                    <h3 className="lg:text-2xl sm:text-lg">Today</h3>
                    <p className="lg:text-xs sm:text-[12px] text-gray-300">{`${currentDay}, ${dayNumber}, ${currentMonth}`}</p>
                </div>
            </div>

            <div>
                <h1 className="weather-temp lg:text-8xl sm:text-6xl font-light">
                    {data?.temp || 29}
                </h1>
                <p className="text-md tracking-[1px] leading-6 text-gray-300">
                    {data?.city}, {data?.country}
                </p>
                <p className="text-xs leading-8 text-gray-300 flex gap-2">
                    <span>Feels Like {data?.feelsLike}°</span>•
                    <span>Sunset {data?.sunsetTime}</span>
                </p>
                <p className="text-xs leading-3 text-gray-300 flex gap-1 justify-center">
                    <span>{data?.weatherDescription} </span>
                </p>
            </div>

            <div className="flex justify-evenly w-full">
                <div className="flex items-center gap-2">
                    <div className="lg:w-8 sm:w-6">
                        <img
                            className="w-full h-full object-contain"
                            src={wind_speed_icon}
                            alt=""
                        />
                    </div>
                    <p className="sm:text-xs lg:text-sm">
                        {data?.windSpeed} m/s
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="lg:w-8 sm:w-6">
                        <img
                            className="w-full h-full object-contain"
                            src={humidityIcon}
                            alt=""
                        />
                    </div>
                    <p className="sm:text-xs lg:text-sm">{data?.humidity} %</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="lg:w-8 sm:w-6">
                        <img
                            className="w-full h-full object-contain"
                            src={pressureIcon}
                            alt=""
                        />
                    </div>
                    <p className="sm:text-xs lg:text-sm">
                        {data?.pressure} hPa
                    </p>
                </div>
            </div>
        </div>
    );
};
