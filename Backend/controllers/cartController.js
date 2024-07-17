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
      'SELECT id, name, email, cartdata FROM "user" WHERE id = $1',
      [userId]
    );

    if (userResponse.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let { cartdata } = userResponse.rows[0];
    cartdata = cartdata || {};

    cartdata[itemId] = (cartdata[itemId] || 0) + 1;

    const updateResponse = await db.query(
      'UPDATE "user" SET cartdata = $1 WHERE id = $2 RETURNING cartdata',
      [cartdata, userId]
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
const removeFromCart = async (req, res) => {
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
      'SELECT id, name, email, cartdata FROM "user" WHERE id = $1',
      [userId]
    );

    if (userResponse.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let { cartdata } = userResponse.rows[0];
    cartdata = cartdata || {};

    if (!cartdata[itemId]) {
      return res.status(400).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    if (cartdata[itemId] === 1) {
      delete cartdata[itemId];
    } else {
      cartdata[itemId] -= 1;
    }

    const updateResponse = await db.query(
      'UPDATE "user" SET cartdata = $1 WHERE id = $2 RETURNING cartdata',
      [cartdata, userId]
    );

    if (updateResponse.rows.length === 0) {
      throw new Error("Failed to update cart data");
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart successfully",
      cartData: updateResponse.rows[0].cartdata,
    });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while removing from cart",
    });
  }
};

// get users cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Fetch the current user data
    const userResponse = await db.query(
      'SELECT cartdata FROM "user" WHERE id = $1',
      [userId]
    );

    if (userResponse.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { cartdata } = userResponse.rows[0];

    res.status(200).json({
      success: true,
      cartData: cartdata,
    });
  } catch (error) {
    console.error("Error in getCart:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the cart data",
    });
  }
};

export { addToCart, removeFromCart, getCart };
