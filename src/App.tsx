import { useState, useEffect } from "react";
import data from "./data/data.json"; // Load the data from a JSON file
import Menu from "./components/Menu"; // Import the Menu component
import CurrencyConverter from "./components/CurrencyConverter"; // Import the CurrencyConverter component

const App = () => {
  // State to keep track of the selected country (either USA or France)
  const [country, setCountry] = useState<"USA" | "France">("USA");

  // State to store the conversion rate for currency (1 means no conversion for USD)
  const [conversionRate, setConversionRate] = useState<number>(1);

  // State to store the currency symbol ($ for USA, € for France)
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");

  // Function to get the latest currency conversion rate
  const fetchConversionRate = async (selectedCountry: "USA" | "France") => {
    try {
      // Fetch data from the currency API
      const response = await fetch(
        "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_IpcH6d3lrFhoSUge59NwAygJ9oQvKiuoB6U0eoFU"
      );
      const apiData = await response.json();

      // Get the conversion rate from USD to EUR
      const usdToEurRate = apiData.data.EUR;

      // If the user selects USA, we don't need to change anything (USD is the base)
      if (selectedCountry === "USA") {
        setConversionRate(1); // USD doesn't need conversion
        setCurrencySymbol("$"); // Set the symbol to $
      } else if (selectedCountry === "France") {
        setConversionRate(usdToEurRate); // Convert USD to EUR
        setCurrencySymbol("€"); // Set the symbol to €
      }
    } catch (error) {
      console.error("Error fetching currency data:", error); // Log the error if something goes wrong
    }
  };

  // Automatically run this function whenever the selected country changes
  useEffect(() => {
    fetchConversionRate(country);
  }, [country]);

  // This function changes the selected country when the user selects a different one
  const handleCountryChange = (selectedCountry: "USA" | "France") => {
    setCountry(selectedCountry);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Restaurant Menu</h1>

      {/* The currency converter is displayed here, letting users pick USA or France */}
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

      {/* The Menu component shows the restaurants and their prices, adjusted for the selected country's currency */}
      <Menu
        restaurants={data.restaurants}
        conversionRate={conversionRate}
        currencySymbol={currencySymbol}
      />
    </div>
  );
};

export default App