import path from "path";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();


connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.json());



app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.post('/api/config/stripe', (req, res) => {
  const { order, token } = req.body;
  console.log("Product", order);
  console.log("Price", order.totalPrice);
  const idempontencyKey = uuid.v4();

  return stripe.customers
    .create({
      email: token.email_address,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: order.totalPrice * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: order._id,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempotencyKey: idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
})

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running.....");
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
