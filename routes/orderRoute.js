const router = require("express").Router();
const {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus
} = require("../controllers/orderController");

router.post("/order/:customerId", createOrder);
router.get("/orders", getAllOrders);
router.get("/order/:orderId", getOrder);
router.put("/order/:orderId", updateOrderStatus);

module.exports = router;