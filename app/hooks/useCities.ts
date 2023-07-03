import { Country, State, City } from 'country-state-city';

const countryCode = 'PK'; // Replace with your desired country code
const country = Country.getCountryByCode(countryCode);
const cities = country ? City.getCitiesOfCountry(country.isoCode) : [];

const formattedCities = cities
  ? cities.map((city) => ({
      value: city.name,
      label: city.name,
      latlng: [city.latitude, city.longitude], // Combine latitude and longitude into a single array
    }))
  : [];

const useCities = () => {
  const getAll = () => formattedCities;

  const getByValue = (value: string) => {
    return formattedCities.find((item) => item.value === value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCities;
