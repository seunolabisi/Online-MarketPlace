const productModel = require("../models/productModel");

// 1. CREATE a new product
exports.createProduct = async (req, res) => {
  try {
    const productData = {
      ProductName: req.body.ProductName,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      stockQuantity: req.body.stockQuantity
    };

    const data = await productModel.create(productData);

    res.status(201).json({
      message: "Product successfully created",
      data
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      realError: error.message
    });
  }
};

// 2. READ all products
exports.getAllProducts = async (req, res) => {
  try {
    const data = await productModel.find();

    res.status(200).json({
      message: "MY product don come oo",
      data
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      realError: error.message
    });
  }
};

// 3. READ a single product by ID
exports.getProduct = async (req, res) => {
  try {
    const id = req.params.productId;
    const findProduct = await productModel.findById(id);

    if (!findProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product successfully retrieved",
      data: findProduct
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      realError: error.message
    });
  }
};

// 4. UPDATE a product (e.g. change price or restock quantity)
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.productId;
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      req.body,
      { new:true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product successfully updated",
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      realError: error.message
    });
  }
};

// 5. DELETE a product
exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.productId;
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product successfully deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      realError: error.message
    });
  }
};