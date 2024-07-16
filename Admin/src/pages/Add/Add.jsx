import "./Add.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const handleDataChanges = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const dataToChewster = () => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = dataToChewster();
    try {
      const response = await axios.post(
        `${url}/chewster-api/food/add`,
        formData
      );
      if (response.data.success) {
        setData({ name: "", description: "", price: "", category: "Salad" });
        setImage(false);
        toast.success(response.data.message || "Food item added successfully!");
      } else {
        toast.error("Failed to add food item.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-image-upload flex-col">
          <p>Image Upload</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload image"
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="add-food-name flex-col">
          <p>Food Name</p>
          <input
            type="text"
            name="name"
            placeholder="Enter food name here"
            onChange={handleDataChanges}
            value={data.name}
          />
        </div>
        <div className="add-food-desc flex-col">
          <p>Food description</p>
          <textarea
            name="description"
            rows="8"
            placeholder="Enter food description content here"
            required
            onChange={handleDataChanges}
            value={data.description}
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Food Category</p>
            <select name="category" onChange={handleDataChanges}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Vegan">Vegan</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Price $</p>
            <input
              type="number"
              name="price"
              placeholder="$168"
              onChange={handleDataChanges}
              value={data.price}
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add New Food
        </button>
      </form>
    </div>
  );
};

export default Add;
