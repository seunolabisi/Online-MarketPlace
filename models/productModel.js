const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    ProductName:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true, min:0},
    category:{type:String,required:true},
    stockQuantity:{type:Number,required:true,min:0}
})

const productModel = mongoose.model("product", productSchema)

module.exports = productModel