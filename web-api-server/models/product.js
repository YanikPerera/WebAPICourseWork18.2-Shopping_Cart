const mongoose = require('mongoose');

const productschema = new mongoose.Schema({
    product_id: String,
    product_name: String,
    product_description:String,
    image:String,
    price:String,
    quantity:String,
    total:String,
    category_id:String,
});

const Product = mongoose.model("Product", productschema);
module.exports = Product;