import React, { useState } from "react";

// A menu item with a name and price
interface MenuItem {
  name: string;
  price: number;
}

// A category with a name and a list of menu items
interface Category {
  name: string;
  menuItems: MenuItem[];
}

// A restaurant with a name and a list of categories
interface Restaurant {
  name: string;
  categories: Category[];
}

// Props for the Menu component that we will pass in
interface RestaurantMenuProps {
  restaurants: Restaurant[]; // List of restaurants to display
  conversionRate: number; // Conversion rate for prices
  currencySymbol: string; // Currency symbol (like $, €)
}

const Menu: React.FC<RestaurantMenuProps> = ({
  restaurants,
  conversionRate,
  currencySymbol,
}) => {
  // Track which restaurant and category are selected
  const [selectedRestaurantIndex, setSelectedRestaurantIndex] = useState<
    number | null
  >(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<
    number | null
  >(null);

  // When a restaurant is clicked, set it as selected and reset the category
  const handleRestaurantSelect = (index: number) => {
    setSelectedRestaurantIndex(index);
    setSelectedCategoryIndex(null); // Reset category when a new restaurant is chosen
  };

  // When a category is clicked, set it as selected
  const handleCategorySelect = (index: number) => {
    setSelectedCategoryIndex(index);
  };

  // Display the list of menu items with converted prices
  const renderMenuItems = (menuItems: MenuItem[]) => (
    <ul>
      {menuItems.map((item) => (
        <li key={item.name}>
          {item.name} - {currencySymbol}
          {(item.price * conversionRate).toFixed(2)} {/* Convert price */}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
      }}
    >
      {/* List of restaurants on the left */}
      <div style={{ flex: 1, maxWidth: "200px" }}>
        <h2>Restaurants</h2>
        {restaurants.map((restaurant, index) => (
          <div key={restaurant.name}>
            <h3
              onClick={() => handleRestaurantSelect(index)}
              style={{ cursor: "pointer", marginBottom: "10px" }}
            >
              {restaurant.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Menu categories and items on the right */}
      <div style={{ flex: 3, textAlign: "center", padding: "0 20px" }}>
        {selectedRestaurantIndex !== null && (
          <>
            {/* Show categories for the selected restaurant */}
            {restaurants[selectedRestaurantIndex].categories.map(
              (category, catIndex) => (
                <div key={category.name} style={{ marginBottom: "20px" }}>
                  <h4
                    onClick={() => handleCategorySelect(catIndex)}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                  >
                    {category.name}
                  </h4>
                  {/* Show menu items for the selected category */}
                  {selectedCategoryIndex === catIndex &&
                    renderMenuItems(category.menuItems)}
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
