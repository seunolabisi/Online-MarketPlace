
const express = require("express")
require("./db")
const app = express()
const CustomerRouter = require("./routes/customerRoutes")
app.use(express.json())
const productRouter = require("./routes/productRoute")
const orderRouter = require("./routes/orderRoute")
app.use(CustomerRouter)
app.use(productRouter)
app.use(orderRouter)

PORT = 3000

app.listen(PORT, ()=>{console.log(`My port is running from `+PORT)})
       