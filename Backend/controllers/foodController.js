import db from "../db.js";
import fs from "fs";

//POST: new food func logic.
const addFood = async (req, res) => {
  const { name, price, description, category } = req.body;
  let image_filename = `${req.file.filename}`; //store req filename into the var.

  //validating if all fields are inputted.
  if (!name || !price || !description || !category || !image_filename) {
    return res.status(400).json({
      success: false,
      error: "All fields are required",
    });
  }

  try {
    const result = await db.query(
      "INSERT INTO food ( name, image, price, description, category) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [name, image_filename, price, description, category]
    );
    res.status(201).json({
      //return the json message in the case the data has successfully been loaded to the db.
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error in posting new food", error);
    res.status(500).json({
      //return json message in the case the data has not been added and had an error.
      success: false,
      error: "Error in posting new food",
    });
  }
};

//GET: display all foods in the list.
const displayFood = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM food");
    //check if there are no food items in the database
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No food items found",
      });
    }
    //json response of success message
    res.status(200).json({
      success: true,
      data: result.rows,
    });
    //json repsonse of failed fetch in database
  } catch (error) {
    console.error("Error fetching all food items", error);
    res.status(500).json({
      success: false,
      error: "Database Error",
    });
  }
};

// DEL: remove food item from list.
const deleteFood = async (req, res) => {
  const foodId = req.params.id;
  console.log(foodId);

  try {
    const result = await db.query(
      "DELETE FROM food WHERE _id = $1 RETURNING *",
      [foodId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Food item is not found",
      });
    }

    const food = result.rows[0];
    const imageFilename = food.image;

    //Del the image file from the uploads folder.
    fs.unlink(`uploads/${imageFilename}`, (err) => {
      if (err) {
        console.error("Error deleting image file:", err);
      } else {
        console.log("Image file deleted successfully:", imageFilename); // Log success message if image deletion succeeds
      }
    });

    res.status(200).json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting food", error);
    res.status(500).json({
      success: false,
      error: "Database Error",
    });
  }
};

export { addFood, displayFood, deleteFood };
