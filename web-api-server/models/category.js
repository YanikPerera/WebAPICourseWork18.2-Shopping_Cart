const mongoose = require('mongoose');
const categorySchema  = new mongoose.Schema({
    Category_id: String,
    category_Name: String,
});

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;