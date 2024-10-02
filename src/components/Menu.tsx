import React, { useState } from "react";

interface MenuItem {
  name: string;
  price: number;
}

interface Category {
  name: string;
  menuItems: MenuItem[];
}

interface Restaurant {
  name: string;
  categories: Category[];
}

interface RestaurantMenuProps {
  restaurants: Restaurant[];
  conversionRate: number;
  currencySymbol: string;
}

const Menu: React.FC<RestaurantMenuProps> = ({
  restaurants,
  conversionRate,
  currencySymbol,
}) => {
  const [selectedRestaurantIndex, setSelectedRestaurantIndex] = useState<
    number | null
  >(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<
    number | null
  >(null);

  const handleRestaurantSelect = (index: number) => {
    setSelectedRestaurantIndex(index);
    setSelectedCategoryIndex(null); // Reset category selection
  };

  const handleCategorySelect = (index: number) => {
    setSelectedCategoryIndex(index);
  };

  const renderMenuItems = (menuItems: MenuItem[]) => (
    <ul>
      {menuItems.map((item) => (
        <li key={item.name}>
          {item.name} - {currencySymbol}
          {(item.price * conversionRate).toFixed(2)}
        </li>
      ))}
    </ul>
  );

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
      {/* Restaurant List Section */}
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

      {/* Menu and Category Section */}
      <div style={{ flex: 3, textAlign: "center", padding: "0 20px" }}>
        {selectedRestaurantIndex !== null && (
          <>
            {restaurants[selectedRestaurantIndex].categories.map(
              (category, catIndex) => (
                <div key={category.name} style={{ marginBottom: "20px" }}>
                  <h4
                    onClick={() => handleCategorySelect(catIndex)}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                  >
                    {category.name}
                  </h4>
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
