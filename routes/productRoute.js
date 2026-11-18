const router = require("express").Router();
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

router.post("/product", createProduct);
router.get("/products", getAllProducts);
router.get("/product/:productId", getProduct);
router.put("/product/:productId", updateProduct);
router.delete("/product/:productId", deleteProduct);

module.exports = router;