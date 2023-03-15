const Stripe = require("stripe");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);
const Payments = require("../models/paymentModel");
const Users = require("../models/userModel");

// Create payment function

const createPayment = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart);
  const newPayment = new Payments({
    user_id: customer.metadata.user_id,
    name: customer.metadata.name,
    email: customer.metadata.email,
    cart: Items,
    total: data.amount_total,
    paymentID: data.payment_intent,
    address: data.customer_details,
  });

  try {
    await newPayment.save();
    await Users.findByIdAndUpdate({ _id: customer.metadata.user_id }, { cart: [] });
    console.log("Payement success");
  } catch (err) {
    // return res.status(500).json({ msg: e.message });
    console.log("Got error", err);
  }
};

const paymentCtrl = {
  getPayments: async (req, res) => {
    try {
      const payments = await Payments.find();
      res.json(payments);
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },

  createPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("name email");
      if (!user) return res.status(400).json({ msg: "user doesn't exist" });

      const { cart, paymentID, address } = req.body;
      const { _id, name, email } = user;

      const newPayment = new Payments({
        user_id: _id,
        name,
        email,
        cart,
        paymentID,
        address,
      });
      await newPayment.save();
      res.json({ msg: "Payment success" });
    } catch (e) {
      return res.status(500).json({ msg: e.message });
    }
  },

  createCheckoutSession: async (req, res) => {
    const user = await Users.findById(req.user.id).select("name email");
    if (!user) return res.status(400).json({ msg: "user doesn't exist" });

    // let cartItems = JSON.stringify(req.body.cartItems);
    const cartItems = req.body.cartItems.map((item, ind) => {
      new_item = {
        _id: item._id,
        product_id: item.product_id,
        price: item.price,
        quantity: item.quantity,
        title: item.title,
        category: item.category,
      };
      return new_item;
    });

    const customer = await stripe.customers.create({
      metadata: {
        user_id: req.user.id,
        name: user.name,
        email: user.email,
        cart: JSON.stringify(cartItems),
      },
    });

    const line_items = req.body.cartItems.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            // images: [...item.images],
            // description: item.description,
            metadata: {
              id: item._id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "IN"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "usd",
            },
            display_name: "Free shipping",
            // Delivers between 5-7 business days
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "usd",
            },
            display_name: "Next day air",
            // Delivers in exactly 1 business day
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      line_items,
      mode: "payment",
      customer: customer.id,
      success_url: `http://localhost:3000/orderhistory`,
      cancel_url: "http://localhost:3000/checkout",
    });

    // res.redirect(303, session.url);
    res.send({ url: session.url, paymentId: session.payment_intent });
  },

  // Stripe webhoook

  webhook: async (req, res) => {
    let data;
    let eventType;

    // Check if webhook signing is configured.
    let webhookSecret = process.env.STRIPE_WEB_HOOK_KEY;

    if (webhookSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers["stripe-signature"];

      try {
        event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed:  ${err}`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data.object;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the checkout.session.completed event
    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then(async (customer) => {
          try {
            // CREATE payment in database
            createPayment(customer, data);
          } catch (err) {
            console.log(typeof createOrder);
            console.log(err);
          }
        })
        .catch((err) => console.log(err.message));
    }

    res.status(200).end();
  },
};

module.exports = paymentCtrl;
