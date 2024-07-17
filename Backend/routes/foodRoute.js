import express from "express";
import {
  addFood,
  displayFood,
  deleteFood,
} from "../controllers/foodController.js";
import multer from "multer";

//create express food router
const foodRouter = express.Router();

//image stoarge engine using multer method
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${file.originalname}`); //upload a file
  },
});

//middleware to upload img.
const upload = multer({ storage: storage });

//POST data to the server and process a response.
foodRouter.post("/add", upload.single("image"), addFood); //upload middleware to upload image using multer pkg.  //the key to json req is "image"

//GET  data to display all foods in db.
foodRouter.get("/list", displayFood);

//DEL: remove food from the db.
foodRouter.delete("/remove-food/:id", deleteFood);

export default foodRouter;
