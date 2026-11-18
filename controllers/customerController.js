const customerModel = require("../models/customerModel")
exports.createCustomer = async(req, res)=>{
    try {
        
     const customerData = {
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    phoneNumber:req.body.phoneNumber,
    address:req.body.address
        }
        const checkEmail = await customerModel.findOne({email:req.body.email})
        if(checkEmail)
            return res.status(400).json({
        message:`Customer with the Email ${req.body.email} already exist`
            })
            const checkPhoneNumber = await customerModel.findOne({phoneNumber:req.body.phoneNumber})
            if(checkPhoneNumber)
                return res.status(400).json({
            message:`Customer with the Phone Number ${req.body.phoneNumber} already exist` })
const data = await customerModel.create(customerData)
res.status(201).json({
    message:"Customer successfully created",
    data})
    } catch (error) {
        res.status(500).json({
            message:"something went wrong",
            realError:error.message
        })
        }}

        exports.getAllCustomers = async (req, res) => {

            try {
                const data = await customerModel.find()
                res.status(200).json({
                    message:"Customer successfully retrieved",
                    data
                })
                
            } catch (error) {
                res.status(500).json({
                    message:"Something went wrong",
                    realError:error.message
                })
            }
        }
        // Retrieve one customer with their order history
        exports.getCustomer = async (req, res)=>{
            try {
                const id = req.params.customerId
                const findCustomer = await customerModel.findById(id).populate("orders")
                if(!findCustomer){
                    return res.status(404).json({
                        message:"Customer not found"
                    })
                }
                res.status(200).json({
                    message:"Customer Successfully Retrieved",
                    data: findCustomer
                })
            } catch (error) {
                res.status(500).json({
                    message:"Something went wrong",
                    realError:error.message
                })
            }
        }
//update a customer
        exports.updateCustomer = async (req, res) => {
            try {
                const id = req.params.customerId
                const updatedCustomer = await customerModel.findByIdAndUpdate(
                    id,
                    req.body,
                    {new:true, runValidators:true }
                )
                if (!updatedCustomer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.status(200).json({
      message: "Customer successfully updated",
      data: updatedCustomer
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      realError: error.message
    })
  }
}

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const id = req.params.customerId;
    const deletedCustomer = await customerModel.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.status(200).json({
      message: "Customer successfully deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      realError: error.message
    });
  }
};

// Retrieve one customer with their order history
exports.getCustomer = async (req, res) => {
  try {
    const id = req.params.customerId;
    const findCustomer = await customerModel.findById(id).populate("orders");

    if (!findCustomer) {
      return res.status(404).json({
        message: "Customer not found"
      });
    }

    res.status(200).json({
      message: "Customer successfully retrieved",
      data: findCustomer
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      realError: error.message
    })
  }
}