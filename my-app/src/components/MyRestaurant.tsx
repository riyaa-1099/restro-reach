import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { back_url } from "./url";
import Cookies from "js-cookie";
import { Restaurant } from "../typings/typings";

const user_id = localStorage.getItem("user_id_app");
interface EditRestaurantPageProps {}

const MyRestaurant: React.FC<EditRestaurantPageProps> = () => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [contactName, setContactName] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [avgTransactions, setAvgTransactions] = useState("");
  const token = Cookies.get("token");
  const { id } = useParams<{ id: string }>() || user_id;

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${back_url}/restaurant/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const restro = response.data.restaurant;
        setRestaurant(restro);
        setRestaurantName(restro.restaurantName);
        setContactName(restro.contactName);
        setPinCode(restro.pinCode);
        setAddress(restro.address);
        setContactNumber(restro.contactNumber);
        setAvgTransactions(restro.avgTransactions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, token]);

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

  const handlePinCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleUpdateRestaurantSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `${back_url}/restaurant`,
        {
          restaurantName,
          contactName,
          pinCode,
          address,
          contactNumber,
          avgTransactions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("updaterestaurant", response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <form onSubmit={handleUpdateRestaurantSubmit}>
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
          <input type="text" value={pinCode} onChange={handlePinCodeChange} />
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
        <div>
        <button className="button" type="submit">
          Update
        </button>
        </div>
      </form>
    </div>
  );
};

export default MyRestaurant;
