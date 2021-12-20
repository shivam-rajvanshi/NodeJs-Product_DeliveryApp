const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");
const morgan = require("morgan");
const usersRoutes = require("./Routes/user");
const productRoutes = require("./Routes/product");
const orderRoutes = require("./Routes/order");

//middleware
app.use(cors());
app.options("*", cors());
app.use(morgan("tiny"));
const secret = process.env.secret;
const api = process.env.API_URL;
app.use(bodyParser.json());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

//Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "productDeliveryDatabase",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

// routes

app.get("", (req, res) => {
  return res.json({ message: "succeded" });
});

app.use(`${api}/users`, usersRoutes);
app.use(`${api}/products`, productRoutes);
app.use(`${api}/orders`, orderRoutes);

//Server
app.listen(4000, () => {
  console.log("server is running http://localhost:4000");
});

// 1st make server....
// 2nd work is to connect database mongodb
