const orderModel = require("../models/order");
const customerModel = require("../models/customerModel");
const productModel = require("../models/productModel");

// 1. Place an order for available products
exports.createOrder = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const { productsOrdered } = req.body;

    // Step A: Find the customer
    const findCustomer = await customerModel.findById(customerId);
    if (!findCustomer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    // Step B: Make sure at least one product was sent
      if (!productsOrdered || productsOrdered.length === 0) {
      return res.status(400).json({
            message: "Please select at least one product to order"
})
    }

    let totalAmount = 0;

    // Step C: Check stock, calculate bill, and reduce stock for each item
    for (const item of productsOrdered) {
      const findProduct = await productModel.findById(item.product);
      if (!findProduct) {
        return res.status(404).json({
          message: `Product not found`
        });
      }

      if (findProduct.stockQuantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${findProduct.ProductName}. Only ${findProduct.stockQuantity} left`
        });
      }

      totalAmount += findProduct.price * item.quantity;

      // Deduct purchased quantity from stock
      findProduct.stockQuantity -= item.quantity;
      await findProduct.save();
    }

    // Step D: Save the order
    const data = await orderModel.create({
      customer: customerId,
      productsOrdered,
      totalAmount
    });

    // Step E: Save the order ID inside the customer's orders array
    findCustomer.orders.push(data._id);
    await findCustomer.save();

    res.status(201).json({
      message: "Order placed successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      realError: error.message
    });
  }
};

// 2. Retrieve all orders
exports.getAllOrders = async (req, res) => {
  try {
    const data = await orderModel
      .find()
      .populate("customer")
      .populate("productsOrdered.product");

    res.status(200).json({
      message: "Orders successfully retrieved",
      data
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      realError: error.message
    });
  }
};

// 3. Retrieve a single order with customer details and products purchased
exports.getOrder = async (req, res) => {
  try {
    const id = req.params.orderId;
    const findOrder = await orderModel
      .findById(id)
      .populate("customer")
      .populate("productsOrdered.product");

    if (!findOrder) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.status(200).json({
      message: "Order successfully retrieved",
      data: findOrder
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      realError: error.message
    });
  }
};

// 4. Update order status (Pending, Processing, Shipped, Delivered)
exports.updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.orderId;
    const { orderStatus } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    res.status(200).json({
      message: "Order status successfully updated",
      data: updatedOrder
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      realError: error.message
    });
  }
};