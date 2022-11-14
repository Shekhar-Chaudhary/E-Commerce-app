// import cors from "cors";
// import express from "express";
// import { Stripe } from "stripe";
// import * as uuid from "uuid";

// const stripe = Stripe(
//   "sk_test_51M2ZZ1SEnBqVwV4rxrPFC8pfSMa2NUIbPGuT1EvXSYmA5RIBhcexv3FkvUno4am9GTkFC6GiEOA3JMHjqV9Srnaa00x5bpCOxm"
// );

// const app = express();

// //middleware
// app.use(express.json());
// app.use(cors());

// //routes
// app.get("/", (req, res) => {
//   res.send("It works");
// });

// app.post("/payment", (req, res) => {
//   const { product, token } = req.body;
//   console.log("Product", product);
//   console.log("Price", product.price);
//   const idempontencyKey = uuid.v4();

//   return stripe.customers
//     .create({
//       email: token.email,
//       source: token.id,
//     })
//     .then((customer) => {
//       stripe.charges.create(
//         {
//           amount: product.price * 100,
//           currency: "usd",
//           customer: customer.id,
//           receipt_email: token.email,
//           description: product.name,
//           shipping: {
//             name: token.card.name,
//             address: {
//               country: token.card.address_country,
//             },
//           },
//         },
//         { idempotencyKey: idempontencyKey }
//       );
//     })
//     .then((result) => res.status(200).json(result))
//     .catch((err) => console.log(err));
// });

// export default router;
