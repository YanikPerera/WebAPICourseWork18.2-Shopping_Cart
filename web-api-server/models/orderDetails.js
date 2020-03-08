const mongoose = require('mongoose');
const orderDetailSchema  = new mongoose.Schema({
    Order_Id: String,
    product_id:String,
    Customer_Id: String,
    Category_id:String,
    Quantity:String,
    Created_at:  {
        type: Date,
        default: Date.now
    }
});

const orderTB = mongoose.model("orderDetail", orderDetailSchema);

module.exports = orderTB;