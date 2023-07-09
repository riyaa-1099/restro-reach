import { Routes, Route } from "react-router-dom";
import SignupPage from "./SignupPage/SignupPage";
import LoginPage from "./LoginPage/LoginPage";
import RestaurantPage from "./RestaurantPage/RestaurantPage";
import RegisterPage from "./RegisterPage/registerPage";
import MyRestro from "./MyRestaurantPage/myRestaurant";

const Allrouter: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RestaurantPage />} />
        <Route path="/register-restaurant" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/my-restaurant" element={<MyRestro />} />
      </Routes>
    </div>
  );
};

export default Allrouter;
