import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Select from "react-select";

interface CountryCityHook {
  countries: { value: string; label: string, code: string }[];
  selectedCountry: string | null;
  cities: string[];
  isLoading: boolean;
  setSelectedCountry: (country: string | null) => void;
  getCountryNameWithCode: (code: string) => string;
  getCountryWithName: (name: string) => { value: string; label: string, code: string }|undefined;
}

const useCountryCityHook = (): CountryCityHook => {
  const [countries, setCountries] = useState<{ value: string; label: string, code: string }[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCountryNameWithCode = (code: string): string => {
    return countries.find(c => c.code === code)?.value ?? ''
  }

  const getCountryWithName = (countryName: string): { value: string; label: string, code: string }|undefined => {
    return countries.find(c => c.value === countryName) 
  }

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("http://api.geonames.org/countryInfoJSON?username=francktiomela&lang=fr&style=full");
        const countriesData = response.data.geonames.map((country: any) => ({
          value: country.countryName,
          label: country.countryName,
          code: country.countryCode,
        }));
        setCountries(countriesData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useMemo(() => {
    const fetchCities = async () => {
      setIsLoading(true);
      if (selectedCountry) {
        try {
          const response = await axios.get(
            `http://api.geonames.org/searchJSON?formatted=true&country=${encodeURIComponent(selectedCountry)}&username=francktiomela&style=full&maxRows=1000`
          );          
          const citiesData = response.data.geonames.map((city: any) => city.name);
          setCities(citiesData);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      } else {
        setCities([]);
      }
      setIsLoading(false);
    };

    fetchCities();
  }, [selectedCountry]);

  return { 
    countries, 
    selectedCountry, 
    cities,
    isLoading, 
    setSelectedCountry,
    getCountryNameWithCode,
    getCountryWithName
  };
};

export default useCountryCityHook;

// Example usage:
export const  CountryCitySelector = () => {
  const { countries, selectedCountry, cities, isLoading, setSelectedCountry } = useCountryCityHook();

  const handleCountryChange = (selectedOption: any) => {
    setSelectedCountry(selectedOption.code);
  };

  return (
    <div>
      <Select options={countries} onChange={handleCountryChange} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <p>Selected Country: {selectedCountry}</p>
          <p>Cities: {cities.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
    
   
    
    


