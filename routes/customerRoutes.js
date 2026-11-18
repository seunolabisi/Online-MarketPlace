const { createCustomer, getAllCustomers, getCustomer, updateCustomer, deleteCustomer } = require("../controllers/customerController")

const router = require("express").Router()

router.post("/customer", createCustomer)
router.get("/customers", getAllCustomers)
router.get("/customer/:customerId", getCustomer)
router.put("/customer/:customerId", updateCustomer)
router.delete("/customer/:customerId", deleteCustomer)

module.exports = router