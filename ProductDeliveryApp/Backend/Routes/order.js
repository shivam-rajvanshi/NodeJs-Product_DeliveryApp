const { Order } = require("../Model/order");
const { Product } = require("../Model/product");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const orderList = await Order.find()
    .populate({
      path: "product",
    })
    .populate({ path: "user" });
  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

router.put("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    {
      status: req.body.status,
    },
    { new: true }
  );
console.log(order);
  if (!order) return res.status(400).send("the order cannot be update!");

  res.send(order);
});

router.post("/", async (req, res) => {
  console.log(mongoose.isValidObjectId(req.params.id));
  console.log(mongoose.isValidObjectId(req.body.product));
  //   if (!req.body.product) res.send("enter product id");
  const orderedProduct = await Product.findById(req.body.product);
  if (orderedProduct) {
    console.log(orderedProduct.price);
    const order = new Order({
      product: req.body.product,
      noOfItems: req.body.noOfItems,
      totalPrice: req.body.noOfItems * orderedProduct.price,
      phone: req.body.phone,
      country: req.body.country,
      city: req.body.city,
      zip: req.body.zip,
      shippingAddress: req.body.shippingAddress,
      user: req.body.user,
    });
    const orderSucceed = await order.save();
    if (!orderSucceed)
      return res.status(400).send("the order cannot be created!");
    return res.json({ data: orderSucceed });
  } else {
    return res.status(400).json({ message: "product not exist..." });
  }
});
module.exports = router;
