import { useState, useEffect } from "react";
import data from "./data/data.json"; // Importing the JSON data
import Menu from "./components/Menu";
import CurrencyConverter from "./components/CurrencyConverter";

const App = () => {
  const [country, setCountry] = useState<"USA" | "France">("USA");
  const [conversionRate, setConversionRate] = useState<number>(1);
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  const fetchConversionRate = async (selectedCountry: "USA" | "France") => {
    try {
      const response = await fetch(
        "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_IpcH6d3lrFhoSUge59NwAygJ9oQvKiuoB6U0eoFU"
      );
      const apiData = await response.json();
      const usdToEurRate = apiData.data.EUR;

      if (selectedCountry === "USA") {
        setConversionRate(1);
        setCurrencySymbol("$");
      } else if (selectedCountry === "France") {
        setConversionRate(usdToEurRate);
        setCurrencySymbol("€");
      }
    } catch (error) {
      console.error("Error fetching currency conversion rate:", error);
    }
  };

  useEffect(() => {
    fetchConversionRate(country);
  }, [country]);

  const handleCountryChange = (selectedCountry: "USA" | "France") => {
    setCountry(selectedCountry);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Restaurant Menu</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <CurrencyConverter
          country={country}
          onCountryChange={handleCountryChange}
        />
      </div>
      <Menu
        restaurants={data.restaurants}
        conversionRate={conversionRate}
        currencySymbol={currencySymbol}
      />
    </div>
  );
};

export default App;
