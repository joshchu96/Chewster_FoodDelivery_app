import React from "react";
import "./Display_Items.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Display_Items = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/chewster-api/food/list`);
      if (response.data.success) {
        const fetchedList = response.data.data;
        setList(fetchedList);
        if (fetchedList.length === 0) {
          toast.info("No food items found");
        }
      } else {
        toast.error("Failed to get list of food items");
        setList([]);
      }
    } catch (error) {
      console.error("Error in fetching list", error);
      if (error.response && error.response.status === 404) {
        toast.info("No food items found");
      } else {
        toast.error("An error occurred while fetching for food item list");
      }
      setList([]);
    }
  };

  const removeFood = async (id) => {
    try {
      const response = await axios.delete(
        `${url}/chewster-api/food/remove-food/${id}`
      );
      if (response.data.success) {
        toast.success("Food item deleted successfully");
        const updatedList = list.filter((item) => item._id !== id);
        setList(updatedList);
      } else {
        toast.error("Failed to delete food item");
      }
    } catch (error) {
      console.error("Error deleting food item", error);
      toast.error("An error occurred while deleting food item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/food-images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className="cursor" onClick={() => removeFood(item._id)}>
                Remove
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Display_Items;
