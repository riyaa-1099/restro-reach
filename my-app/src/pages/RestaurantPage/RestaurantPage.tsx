import React from "react";
import RestaurantList from "../../components/RestaurantList";
import "./RestaurantPage.css";

interface RestaurantPageProps {}

const RestaurantPage: React.FC<RestaurantPageProps> = () => {
  return (
    <div>
      <h1>Restaurants We Have !!</h1>
      <RestaurantList />
    </div>
  );
};

export default RestaurantPage;
