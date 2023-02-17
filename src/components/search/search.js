import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions } from "../../api";
import { GEO_API_URL } from "../../api";

const Search = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);
    //Setting minPopulation 100k from 1 mil to cover more spaces

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`, geoApiOptions)
            .then(response => response.json())
            .then(response => {
                return {
                    options: response.data.map((city) => {

                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,

                        }
                    })
                }
            })
            .catch(err => console.error(err));

    }

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate

            placeholder="Search for cities"
            debounceTimeout={600}

            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}

        />
    )

}

export default Search;
