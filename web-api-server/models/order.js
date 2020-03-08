const mongoose = require('mongoose');
const orderSchema  = new mongoose.Schema({
    Order_Id: String,
    Customer_Id: String,
});

const orderTB = mongoose.model("order", orderSchema);

module.exports = orderTB;