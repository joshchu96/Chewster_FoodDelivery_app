import "../db.js";
import Stripe from "stripe";

//create path to stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//place user order from Frontend
const placeOrder = async (req, res) => {
  const frontendURL = "http://localhost:5173";

  try {
    const userId = req.user.id;
    const { items, amount, address } = req.body;

    const orderResult = await db.query(
      "INSERT INTO orders (user_id, items, amount, address) VALUES ($1, $2, $3, $4) RETURNING *",
      [userId, items, amount, address]
    );

    const newOrder = orderResult.rows[0];

    //clear the users cart after adding the order.
    //find the user info in db based on user id
    await db.query('UPDATE "user" SET cartdata = $1 WHERE id = $2', [
      {},
      userId,
    ]);

    //create stripe payment
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, //stripe prices are in cents so multiply by 100
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2.99 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_URL: `${frontendURL}/verify?success=true&orderId=${newOrder.userId}`,
      cancel_URL: `${frontendURL}/verify?success=false&orderId=${newOrder.userId}`,
    });

    res.json({
      success: true,
      session_URL: session.url,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      //return json message in the case the data has not been added and had an error.
      success: false,
      error: "Error placing order",
    });
  }
};

export { placeOrder };
