import db from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import dotenv from "dotenv";

//this will load the env variables from the .env file
dotenv.config();

//JWT Token generator pulled out to avoid cluster from registration function
const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

//user login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM "user" WHERE email = $1  ', [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({
        sucess: false,
        message: "User does not exist",
      });
    }
    //if it is a match the return is a boolean true statement
    const matchUser = await bcrypt.compare(password, user.password);
    if (!matchUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = createToken(user);
    return res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// user register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //checking if the user already exists
    const existingUser = await db.query(
      'SELECT * FROM "user" WHERE email = $1  ',
      [email]
    );
    if (existingUser.rows.length > 0) {
      //status 400 for bad requests
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    } else {
      //validate the email format is correct.
      if (!validator.isEmail(email)) {
        //status 400 for bad requests
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address",
        });
      }
      //checking password strength
      if (password.length < 10) {
        return res.status(400).json({
          success: false,
          message: "Please enter a STRONG password",
        });
      }

      //hash user password strength between 5-15 is good
      const salt = await bcrypt.genSalt(8);
      const hashedPassword = await bcrypt.hash(password, salt);

      //inclusion of hashed password into the db not the original one!
      const newUser = await db.query(
        'INSERT INTO "user" (name, email, password) VALUES ($1,$2,$3) RETURNING *',
        [name, email, hashedPassword]
      );
      //save user info into the user variable
      const user = newUser.rows[0];

      //create JWT token
      const token = createToken(user);

      //201 for creation, send token information as response
      return res.status(201).json({
        success: true,
        message: `Welcome to Chewster, ${name}! `,
        user,
        token,
      });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    //status 500 for Internal server error
    return res.status(500).json({
      success: false,
      message: "Error registering user",
      error: error.message,
    });
  }
};

export { loginUser, registerUser };
