import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../utils/api";

interface SearchPlacesProps {
    onSearchChange: (searchData: string) => void;
}

export const SearchPlaces: React.FC<SearchPlacesProps> = ({
    onSearchChange,
}) => {
    const [search, setSearch] = useState("");

    function loadOptions(
        inputValue: string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ): any {
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
            geoApiOptions
        )
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map(
                        (city: {
                            latitude: string;
                            longitude: string;
                            name: string;
                            countryCode: string;
                        }) => {
                            return {
                                value: `${city.latitude} ${city.longitude}`,
                                label: `${city.name}, ${city.countryCode}`,
                            };
                        }
                    ),
                };
            })
            .catch((err) => console.error(err));
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleOnChange(searchData: any) {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <>
            <div className="w-full flex pl-8 pt-10">
                <h1 className="lg:text-4xl mr-12 text-center sm:text-2xl text-xl whitespace-nowrap">
                    Weather Forecasts
                </h1>

                <AsyncPaginate
                    placeholder="Search for places"
                    debounceTimeout={600}
                    value={search}
                    onChange={handleOnChange}
                    loadOptions={loadOptions}
                    className="w-72 text-lg z-20"
                />
            </div>
        </>
    );
};
