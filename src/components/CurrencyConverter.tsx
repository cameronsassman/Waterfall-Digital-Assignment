import React from "react";

// Define props for the CurrencyConverter component
interface CurrencySelectorProps {
  country: "USA" | "France"; // The current selected country
  onCountryChange: (country: "USA" | "France") => void; // Function to handle country change
}

const CurrencyConverter: React.FC<CurrencySelectorProps> = ({
  country,
  onCountryChange,
}) => {
  return (
    <div>
      {/* Button for selecting USA */}
      <button
        onClick={() => onCountryChange("USA")}
        disabled={country === "USA"}
      >
        USA
      </button>

      {/* Button for selecting France */}
      <button
        onClick={() => onCountryChange("France")}
        disabled={country === "France"}
      >
        France
      </button>
    </div>
  );
};

export default CurrencyConverter;
