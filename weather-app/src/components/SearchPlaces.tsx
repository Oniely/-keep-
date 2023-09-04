import { capitalCity } from "../datas/city";

interface SearchPlacesProps {
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchPlaces: React.FC<SearchPlacesProps> = ({
    onChange,
    value,
}) => {
    return (
        <>
            <div className="w-full flex pl-8 pt-10 pr-4">
                <h1 className="lg:text-4xl mr-12 text-center sm:text-2xl text-xl whitespace-nowrap">Weather Forecasts</h1>

                <div className="text-container">
                    <input
                        type="text"
                        onChange={onChange}
                        value={value}
                        list="capitalCity"
                        className="block rounded-2xl border-0 lg:w-[18rem] md:w-[13rem] sm:w-[10rem] px-4 py-2 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Search a capital city"
                    />

                    <datalist className="mb-4" id="capitalCity">
                        {capitalCity.map((city) => {
                            if (city === null) return;

                            const id: string = crypto.randomUUID()

                            return (
                                <option key={id} value={city}>
                                    {city}
                                </option>
                            );
                        })}
                    </datalist>
                </div>
            </div>
        </>
    );
};
