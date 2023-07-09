import React, { useState, useEffect } from "react";
import axios from "axios";
import { back_url } from "./url";
import Cookies from "js-cookie";
import {Restaurant} from "../typings/typings";
import { useNavigate } from "react-router-dom";

interface RestaurantListProps {}

const RestaurantList: React.FC<RestaurantListProps> = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [userID, setUserID] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [restaurantsPerPage] = useState<number>(5); // You can adjust the number of restaurants displayed per page
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${back_url}/restaurant`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: restaurantsPerPage,
        },
      })
      .then((response) => {
        const data = response.data.All_Restaurants;
        const user_ID = response.data.userID;
        const total = response.data.total;
        const isAdmin = response.data.isAdmin;

        const pagesCount = Math.ceil(total / restaurantsPerPage);
         localStorage.setItem("user_id_app", user_ID)
        setRestaurants(data);
        setUserID(user_ID);
        setIsAdmin(isAdmin);
        setPagesCount(pagesCount);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentPage, token, restaurantsPerPage]);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (userID: string) => {
    navigate(`/my-restaurant/${userID}`);
  };

  const handleDelete = (restaurantId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this restaurant?"
    );
    if (confirmDelete) {
      axios
        .delete(`${back_url}/restaurant/${restaurantId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          axios
            .get(`${back_url}/restaurant`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setRestaurants(response.data.All_Restaurants);
            });
        });
    }
  };

  return (
    <div>
      {restaurants.map((restaurant) => (
        <div className="eachrestaurant" key={restaurant._id}>
          <img src={restaurant.image} alt="restaurantimg" />
          <h2>{restaurant.restaurantName}</h2>
          <p>{restaurant.address}</p>
          <p>Pin Code -{restaurant.pinCode}</p>

          {String(restaurant.userID) === userID && (
            <div>
              <button onClick={() => handleEdit(restaurant.userID)}>Edit</button>
              <button onClick={() => handleDelete(restaurant._id)}>
                Delete
              </button>
            </div>
          )}
           {isAdmin && String(restaurant.userID) !== userID &&(
            <div>
              <button onClick={() => handleDelete(restaurant._id)}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="pagination">
        {currentPage > 1 && (
          <div>
            <button onClick={() => paginate(currentPage - 1)}>Prev</button>
          </div>
        )}
        {<div>Page: {currentPage}</div>}
        {currentPage < pagesCount && (
          <div>
            <button onClick={() => paginate(currentPage + 1)}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
