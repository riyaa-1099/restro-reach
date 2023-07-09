import React from "react";
import MyRestaurant from "../../components/MyRestaurant";
import "./myrestro.css";

const MyRestro: React.FC = () => {
  return (
    <div className="registerpage">
      <h1>My Restaurant</h1>
      <MyRestaurant />
    </div>
  );
};

export default MyRestro;
