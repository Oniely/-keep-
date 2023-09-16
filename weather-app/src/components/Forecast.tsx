import { ForecastDataProps } from "../App";
import humidityIcon from "./img/water.png";

interface ForecastProps {
    data: ForecastDataProps | null;
}

export const Forecast: React.FC<ForecastProps> = ({ data }) => {
    return (
        <div className="w-full px-12 pt-8 flex flex-col items-start justify-start gap-7">
            <div className="w-full flex items-center justify-between pr-12">
                <h1 className="font-semibold">Week</h1>

                <h1 className="font-semibold">Humidity</h1>

                <h1 className="font-semibold">Weather</h1>

                <h1 className="font-semibold relative">
                    Temperature
                    <span className="font-sans text-xs align-text-top absolute top-[-8px]">
                        &#8451;
                    </span>
                </h1>
            </div>

            <div className="grid grid-cols-5 w-full">
                <div className="text-lg flex flex-col gap-[6px]  justify-between items-start font-medium">
                    <p>{data?.day1.date}</p>
                    <p>{data?.day2.date}</p>
                    <p>{data?.day3.date}</p>
                    <p>{data?.day4.date}</p>
                    <p>{data?.day5.date}</p>
                </div>
                {data?.day1.humidity &&
                data?.day2.humidity &&
                data?.day3.humidity &&
                data?.day4.humidity &&
                data?.day5.humidity ? (
                    <div className="text-lg flex flex-col gap-[6px] justify-between items-start">
                        <div className="flex gap-1 items-center">
                            <img
                                src={humidityIcon}
                                alt="wicon"
                                className="h-5 object-contain"
                            />
                            <span className="text-gray-500">{`${data.day1.humidity} %`}</span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <img
                                src={humidityIcon}
                                alt="wicon"
                                className="h-5 object-contain"
                            />
                            <span className="text-gray-500">{`${data.day2.humidity} %`}</span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <img
                                src={humidityIcon}
                                alt="wicon"
                                className="h-5 object-contain"
                            />
                            <span className="text-gray-500">{`${data.day3.humidity} %`}</span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <img
                                src={humidityIcon}
                                alt="wicon"
                                className="h-5 object-contain"
                            />
                            <span className="text-gray-500">{`${data.day4.humidity} %`}</span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <img
                                src={humidityIcon}
                                alt="wicon"
                                className="h-5 object-contain"
                            />
                            <span className="text-gray-500">{`${data.day5.humidity} %`}</span>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                {data?.day1.icon &&
                data?.day2.icon &&
                data?.day3.icon &&
                data?.day4.icon &&
                data?.day5.icon ? (
                    <div className="text-lg flex flex-col gap-[6px] justify-between items-start">
                        <div className="flex items-center gap-1">
                            <img
                                src={`http://openweathermap.org/img/w/${data.day1.icon}.png`}
                                alt="wicon"
                                className="h-10 w-10 object-contain shadow-inner rounded-full"
                                title={data.day1.description}
                            />
                            <span>{`- ${data.day1.mainDesc}`}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <img
                                src={`http://openweathermap.org/img/w/${data.day2.icon}.png`}
                                alt="wicon"
                                className="h-10 w-10 object-contain shadow-inner rounded-full"
                                title={data.day2.description}
                            />
                            <span>{`- ${data.day2.mainDesc}`}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <img
                                src={`http://openweathermap.org/img/w/${data.day3.icon}.png`}
                                alt="wicon"
                                className="h-10 w-10 object-contain shadow-inner rounded-full"
                                title={data.day3.description}
                            />
                            <span>{`- ${data.day3.mainDesc}`}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <img
                                src={`http://openweathermap.org/img/w/${data.day4.icon}.png`}
                                alt="wicon"
                                className="h-10 w-10 object-contain shadow-inner rounded-full"
                                title={data.day4.description}
                            />
                            <span>{`- ${data.day4.mainDesc}`}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <img
                                src={`http://openweathermap.org/img/w/${data.day5.icon}.png`}
                                alt="wicon"
                                className="h-10 w-10 object-contain shadow-inner rounded-full"
                                title={data.day5.description}
                            />
                            <span>{`- ${data.day5.mainDesc}`}</span>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                {data?.day1 &&
                data?.day2 &&
                data?.day3 &&
                data?.day4 &&
                data?.day5 && (
                <div className="text-lg flex flex-col gap-[6px] justify-between items-center col-span-2">
                    <div className="flex items-center w-full justify-center px-3">
                        <div className="flex items-center gap-3">
                            <div className="text-gray-500">
                                {data.day1.min_temp}
                            </div>
                            <div
                                className="bg-blue-500 h-4 w-[150px] relative rounded-full shadow-sm"
                                title={data.day1.curr_temp.toString()}
                            >
                                <span
                                    className="absolute top-0 left-0 bg-red-500 z-10 rounded-full h-4"
                                    style={{
                                        width: `${
                                            ((data.day1.curr_temp -
                                                data.day1.min_temp) /
                                                (data.day1.max_temp -
                                                    data.day1.min_temp)) *
                                            100
                                        }%`,
                                    }}
                                    title={data.day1.curr_temp.toString()}
                                >
                                    &nbsp;
                                </span>
                            </div>
                            <div className="text-gray-500">
                                {data.day1.max_temp}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center w-full justify-center px-3">
                        <div className="flex items-center gap-3">
                            <div className="text-gray-500">
                                {data.day2.min_temp}
                            </div>
                            <div
                                className="bg-blue-500 h-4 w-[150px] relative rounded-full shadow-sm"
                                title={data.day2.curr_temp.toString()}
                            >
                                <span
                                    className="absolute top-0 left-0 bg-red-500 z-10 rounded-full h-4"
                                    style={{
                                        width: `${
                                            ((data.day2.curr_temp -
                                                data.day2.min_temp) /
                                                (data.day2.max_temp -
                                                    data.day2.min_temp)) *
                                            100
                                        }%`,
                                    }}
                                    title={data.day2.curr_temp.toString()}
                                >
                                    &nbsp;
                                </span>
                            </div>
                            <div className="text-gray-500">
                                {data.day2.max_temp}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center w-full justify-center px-3">
                        <div className="flex items-center gap-3">
                            <div className="text-gray-500">
                                {data.day3.min_temp}
                            </div>
                            <div
                                className="bg-blue-500 h-4 w-[150px] relative rounded-full shadow-sm"
                                title={data.day3.curr_temp.toString()}
                            >
                                <span
                                    className="absolute top-0 left-0 bg-red-500 z-10 rounded-full h-4"
                                    style={{
                                        width: `${
                                            ((data.day3.curr_temp -
                                                data.day3.min_temp) /
                                                (data.day3.max_temp -
                                                    data.day3.min_temp)) *
                                            100
                                        }%`,
                                    }}
                                    title={data.day3.curr_temp.toString()}
                                >
                                    &nbsp;
                                </span>
                            </div>
                            <div className="text-gray-500">
                                {data.day3.max_temp}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center w-full justify-center px-3">
                        <div className="flex items-center gap-3">
                            <div className="text-gray-500">
                                {data.day4.min_temp}
                            </div>
                            <div
                                className="bg-blue-500 h-4 w-[150px] relative rounded-full shadow-sm"
                                title={data.day4.curr_temp.toString()}
                            >
                                <span
                                    className="absolute top-0 left-0 bg-red-500 z-10 rounded-full h-4"
                                    style={{
                                        width: `${
                                            ((data.day4.curr_temp -
                                                data.day4.min_temp) /
                                                (data.day4.max_temp -
                                                    data.day4.min_temp)) *
                                            100
                                        }%`,
                                    }}
                                    title={data.day4.curr_temp.toString()}
                                >
                                    &nbsp;
                                </span>
                            </div>
                            <div className="text-gray-500">
                                {data.day4.max_temp}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center w-full justify-center px-3">
                        <div className="flex items-center gap-3">
                            <div className="text-gray-500">
                                {data.day5.min_temp}
                            </div>
                            <div
                                className="bg-blue-500 h-4 w-[150px] relative rounded-full shadow-sm"
                                title={data.day5.curr_temp.toString()}
                            >
                                <span
                                    className="absolute top-0 left-0 bg-red-500 z-10 rounded-full h-4"
                                    style={{
                                        width: `${
                                            ((data.day5.curr_temp -
                                                data.day5.min_temp) /
                                                (data.day5.max_temp -
                                                    data.day5.min_temp)) *
                                            100
                                        }%`,
                                    }}
                                    title={data.day5.curr_temp.toString()}
                                >
                                    &nbsp;
                                </span>
                            </div>
                            <div className="text-gray-500">
                                {data.day5.max_temp}
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};
