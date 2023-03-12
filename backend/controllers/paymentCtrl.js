const Stripe = require("stripe");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_KEY);
const Payments = require("../models/paymentModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");

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
    console.log(req.body.cartItems);
    // const user = await Users.findById(req.user.id).select("name email");
    // if (!user) return res.status(400).json({ msg: "user doesn't exist" });

    const customer = await stripe.customers.create({
      metadata: {
        userId: req.user.id,
        // cart: JSON.stringify(req.body.cartItems),
      },
    });

    const line_items = req.body.cartItems.map((item) => {
      console.log("here is item", item);
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
      /*payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "KE"],
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
      },*/
      line_items,
      mode: "payment",
      customer: customer.id,
      success_url: "http://localhost:3000/orderhistory",
      cancel_url: "http://localhost:3000/checkout",
    });

    // res.redirect(303, session.url);
    res.send({ url: session.url, paymentId: session.payment_intent });
  },
};

module.exports = paymentCtrl;
