import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { back_url } from "../../components/url";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = async () => {
    axios
      .post(`${back_url}/user/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        localStorage.setItem("loggedIn", "false");
        setLoggedIn(false);
      })
      .catch((error) => {
        console.error(error);
      });
    navigate("/login");
    window.location.reload(); // Refresh to update the Navbar component
  };

  useEffect(() => {
    const loggedInFromLocalStorage =
      localStorage.getItem("loggedIn") === "true";
    setLoggedIn(loggedInFromLocalStorage);
  }, []);

  return (
    <div className="nav">
      {loggedIn && <Link to="/"> Home</Link>}
      {loggedIn && <Link to="/register-restaurant"> Add Your Restaurant</Link>}
      {loggedIn && <Link to="/my-restaurant"> My Restaurant</Link>}
      {!loggedIn && <Link to="/login"> Login</Link>}
      {!loggedIn && <Link to="/signup"> Signup</Link>}
      {loggedIn && <h4 onClick={handleLogout}> Logout</h4>}
    </div>
  );
};

export default Navbar;
