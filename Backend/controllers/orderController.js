import db from "../db.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontendURL = "http://localhost:5173";

  try {
    const userId = req.user.id;
    const { items, amount, address } = req.body;

    const orderResult = await db.query(
      "INSERT INTO orders (user_id, items, amount, address) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, JSON.stringify(items), amount, JSON.stringify(address)]
    );

    const newOrder = orderResult.rows[0];

    await db.query('UPDATE "user" SET cartdata = $1 WHERE id = $2', [
      JSON.stringify({}),
      userId,
    ]);

    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 299,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontendURL}/verify?success=true&orderId=${newOrder.id}`,
      cancel_url: `${frontendURL}/verify?success=false&orderId=${newOrder.id}`,
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
    });
  }
};

//verify if order has gone through stripe
const verifyOrder = async (req, res) => {
  const success = req.body.success;
  const orderId = parseInt(req.body.orderId, 10);

  try {
    //update the payment status to true based on id
    if (success == "true") {
      const updateResult = await db.query(
        'UPDATE "orders" SET payment = TRUE WHERE id=$1 RETURNING *',
        [orderId]
      );
      console.log("Rows affected:", updateResult.rowCount);
      if (updateResult.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "Payment failed",
        });
      }
      const updatedOrder = updateResult.rows[0];
      res.json({
        success: true,
        message: "Payment verified successfully",
        order: updatedOrder,
      });
    } else {
      // Handle the case where success is not "true"
      res.json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error("Error verifying order:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying order",
      error: error.message,
    });
  }
};

//orders for frontend handler
const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orderResponse = await db.query(
      "SELECT * FROM orders WHERE user_id = $1",
      [userId]
    );
    const orders = orderResponse.rows;

    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error: Failed to retrieve orders",
      error: error.message,
    });
  }
};

export { placeOrder, verifyOrder, userOrders };
