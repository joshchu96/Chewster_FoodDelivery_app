import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { ChewsterContext } from "../../context/ChewsterContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, BASE_URL } =
    useContext(ChewsterContext);

  return (
    <div className="food-item">
      <div className="food-item-container">
        <img
          className="food-item-img"
          src={BASE_URL + "/food-images/" + image}
          alt="image of food item"
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="item remover img"
            />
            <p>{cartItems[id]}</p>

            <img onClick={() => addToCart(id)} src={assets.add_icon_green} />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating of food item" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
