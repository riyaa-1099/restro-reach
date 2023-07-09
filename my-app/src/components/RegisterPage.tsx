import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { back_url } from "./url";
import Cookies from "js-cookie";

interface CreateProps {}

const RegisterPage: React.FC<CreateProps> = () => {
  const [restaurantName, setRestaurantName] = useState("");
  const [contactName, setContactName] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [avgTransactions, setAvgTransactions] = useState("");
  const [image, setImage] = useState("");
  const token = Cookies.get("token");

  const navigate = useNavigate();

  const handleRestaurantNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRestaurantName(event.target.value);
  };

  const handleContactNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContactName(event.target.value);
  };

  const handlePinCodeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPinCode(event.target.value);
  };

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAddress(event.target.value);
  };

  const handleContactNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContactNumber(event.target.value);
  };

  const handleAvgTransactionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAvgTransactions(event.target.value);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const img = event.target.files?.[0];
    if (img) {
      const form = new FormData();
      form.append("image", img);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=ed68c179b77264ff04fd7b3dbdf94056`,
        {
          method: "POST",
          body: form,
        }
      );
      const data = await res.json();
      const imageUrl = data.data.display_url;
      setImage(imageUrl);
    }
  };

  const handleCreateRestaurantSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${back_url}/restaurant`,
        {
          restaurantName,
          contactName,
          pinCode,
          address,
          contactNumber,
          avgTransactions,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("createrestaurant", response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateRestaurantSubmit}>
        <label>
          Restaurant Name:
          <input
            type="text"
            value={restaurantName}
            onChange={handleRestaurantNameChange}
          />
        </label>
        <label>
          Contact Name:
          <input
            type="text"
            value={contactName}
            onChange={handleContactNameChange}
          />
        </label>
        <label>
          Pin Code:
          <input
            type="text"
            value={pinCode}
            onChange={handlePinCodeChange}
          />
        </label>
        <label>
          Address:
          <textarea value={address} onChange={handleAddressChange} />
        </label>
        <label>
          Contact Number:
          <input
            type="text"
            value={contactNumber}
            onChange={handleContactNumberChange}
          />
        </label>
        <label>
          Average Transactions:
          <input
            type="text"
            value={avgTransactions}
            onChange={handleAvgTransactionsChange}
          />
        </label>
        <label>
          Image:
          <input type="file" id="image" onChange={handleImageChange} />
        </label>
        {image && <img src={image} alt="selected" />}
        <br />
        <button className="button" type="submit">
          Register me !
        </button>
      </form>
      <Link to="/">All Restaurants</Link>
    </div>
  );
};

export default RegisterPage;
