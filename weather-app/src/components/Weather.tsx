import { WeatherDataProps } from "../App.tsx";
import wind_speed_icon from "./img/wind_speed_icon.png";
import humidityIcon from "./img/humidity.png";
import pressureIcon from "./img/pressure.png";
// import weatherDefaultIcon from './img/weather-news.png';

interface WeatherProps {
    data: WeatherDataProps | null;
}

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

export const Weather: React.FC<WeatherProps> = ({ data }) => {

    return (
        <div className="flex flex-col items-center justify-between text-center w-full h-full lg:px-18 lg:py-16 px-10 py-10 gap-8">
            <div className="flex gap-1">
                <div className="lg:w-[3.6rem] sm:w-10">
                    {
                        data?.icon ? (
                            <img
                                src={`http://openweathermap.org/img/w/${data.icon}.png`}
                                alt="wicon"
                                className=" w-full h-full object-contain shadow-inner rounded-full drop-shadow-2xl"
                                title={data.mainDesc}
                            />
                        ) : (
                            ""
                        )
                        /* (
                        <img
                            src={weatherDefaultIcon}
                            alt="licon"
                            className="h-11 object-contain mx-auto mt-1"
                        />
                    ) */
                    }
                </div>
                <div>
                    {data?.date ? (
                        <div className="lg:text-xs sm:text-[12px] text-gray-300">
                            <h3 className="lg:text-2xl text-xl">Today</h3>
                            <span className="md:text-[12px] text-[13px]">
                                {formatDateString(data.date)}
                            </span>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>

            <div>
                {data?.temp && (
                    <h1 className="weather-temp lg:text-8xl text-6xl font-light">
                        {data.temp}
                        <span className="font-sans lg:text-2xl text-xl align-text-top absolute">
                            &#8451;
                        </span>
                    </h1>
                )}
                <p className="text-md tracking-[1px] leading-6 text-gray-300">
                    {data?.city}
                </p>
                <p className="text-xs leading-8 text-gray-300 flex gap-2">
                    <span>
                        {data?.feelsLike && `Feels Like ${data.feelsLike}°  •`}
                    </span>
                    <span>{data?.time && `Time ${data.time}`}</span>
                </p>
                <p className="text-xs leading-3 text-gray-300 flex gap-1 justify-center">
                    <span>{data?.weatherDescription} </span>
                </p>
            </div>

            {data?.windSpeed && data?.humidity && data?.pressure ? (
                <div className="flex justify-evenly w-full gap-6 px-4">
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="lg:w-8 w-6">
                            <img
                                className="w-full h-full object-contain"
                                src={wind_speed_icon}
                                alt=""
                                title="Wind Speed"
                            />
                        </div>
                        <p className="text-[14px] sm:text-[15px]">
                            {data?.windSpeed} m/s
                        </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="lg:w-8 w-6">
                            <img
                                className="w-full h-full object-contain"
                                src={humidityIcon}
                                alt=""
                                title="Humidity"
                            />
                        </div>
                        <p className="text-[14px] sm:text-[15px]">
                            {data?.humidity} %
                        </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="lg:w-8 w-6">
                            <img
                                className="w-full h-full object-contain"
                                src={pressureIcon}
                                alt=""
                                title="Air Pressure"
                            />
                        </div>
                        <p className="text-[14px] sm:text-[15px]">
                            {data?.pressure} hPa
                        </p>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};
