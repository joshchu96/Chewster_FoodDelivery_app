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

export { placeOrder };
