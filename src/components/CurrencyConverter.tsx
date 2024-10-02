import React from "react";

interface CurrencySelectorProps {
  country: "USA" | "France";
  onCountryChange: (country: "USA" | "France") => void;
}

const CurrencyConverter: React.FC<CurrencySelectorProps> = ({ country, onCountryChange }) => {
  return (
    <div>
      <button onClick={() => onCountryChange("USA")} disabled={country === "USA"}>
        USA
      </button>
      <button onClick={() => onCountryChange("France")} disabled={country === "France"}>
        France
      </button>
    </div>
  );
};

export default CurrencyConverter;
