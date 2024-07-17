import db from "../db.js";

//add items to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.body.itemId;

    if (!userId || !itemId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Item ID are required",
      });
    }

    // Fetch the current user data
    const userResponse = await db.query(
      'SELECT cartData FROM "user" WHERE id = $1',
      [userId]
    );

    if (userResponse.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Get the current cartData
    let cartData = userResponse.rows[0].cartdata || {};

    // Update the cartData
    cartData[itemId] = (cartData[itemId] || 0) + 1;

    // Update the user's cartData in the database
    const updateResponse = await db.query(
      'UPDATE "user" SET cartData = $1 WHERE id = $2 RETURNING cartData',
      [JSON.stringify(cartData), userId]
    );

    if (updateResponse.rows.length === 0) {
      throw new Error("Failed to update cart data");
    }

    res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      cartData: updateResponse.rows[0].cartdata,
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding to cart",
    });
  }
};

//remove items from cart
const removeFromCart = async (req, res) => {};

// get users cart
const getCart = async (req, res) => {};

export { addToCart, removeFromCart, getCart };
