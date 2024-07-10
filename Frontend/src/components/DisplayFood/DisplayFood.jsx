import React, { useContext } from "react";
import "./DisplayFood.css";
import { ChewsterContext } from "../../context/ChewsterContext";
import FoodItem from "../FoodItem/FoodItem";

const DisplayFood = ({ catgeory }) => {
  const { food_list } = useContext(ChewsterContext);

  return (
    <div className="display-food" id="display-food">
      <h2>Popular Dishes Near You</h2>
      <div className="display-food-list">
        {food_list.map((item, index) => {
          return (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DisplayFood;
