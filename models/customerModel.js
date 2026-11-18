
const mongoose = require("mongoose")

const customerSchema = mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true, unique:true},
    phoneNumber:{type:String,required:true,unique:true},
    address:{type:String,required:true},
    orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order"
    }]
})

const customerModel = mongoose.model("customer", customerSchema)

module.exports = customerModel