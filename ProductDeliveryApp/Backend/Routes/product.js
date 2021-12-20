const { Product } = require("../Model/product");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let UploadError = new Error("invalid image type");
    if (isValid) {
      UploadError = null;
    }
    cb(UploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

router.get(`/`, async (req, res) => {
  const productList = await Product.find();
  if (!productList) {
    res.status(500).json({ success: false });
  } else {
    res.send(productList);
  }
});

router.get(`/:id`, async (req, res) => {
  const productList = await Product.findById(req.params.id);
  if (!productList) {
    res.status(500).json({ success: false });
  } else {
    res.send(productList);
  }
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id).then((product) => {
    if (product) {
      return res.status(200).json({
        success: true,
        message: "the prduct is deleted",
      });
    } else {
      return res.status(500).json({
        succes: false,
        error: err,
      });
    }
  });
});

router.post("/", uploadOptions.single("image"), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send("Please Enter an Image...");
  const FileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    image: `${basePath}${FileName}`,
    brand: req.body.brand,
    price: req.body.price,
    isFeatured: req.body.isFeatured,
    category: req.body.category,
  });
  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

module.exports = router;
