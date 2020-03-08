const express = require('express');
const category = require('../models/category');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        let categoryDetails = await category.find().sort({
            name: "asc"
         
        });
        console.log("categoryDetails",categoryDetails);
        res.send(categoryDetails);
    }
    catch (ex) {
        return res.status(500).send(ex);
    }
 });

 router.post('/', async (req, res) => {
    if(!req.body.category_Name)
     {
         let error = { error: "You must enter a category Name!"};
         return res.status(400).send(error);
     }
 
     try {
         let CategoryDetails = new category({
            Category_id:req.body.Category_id,
            category_Name:req.body.category_Name
             
         });
     
         CategoryDetails = await CategoryDetails.save();
         res.send(CategoryDetails);
     }
     catch (ex) {
         return res.status(500).send(ex);
     }
 });
router.delete('/:Categoryid', async (req, res) => {
    try {
        let categoryDetails = await category.findByIdAndDelete({_id:req.params.Categoryid});
       
        if(categoryDetails.length === 0) {
            let error = { error: "Given  ID does not exist!"};
            return res.status(404).send(error);
        }

        await categoryDetails.save();
        res.send(categoryDetails);
    }
    catch (ex) {
        return res.status(500).send(ex);
    }
});

router.put('/:categoryid', async (req, res) => {
  

    try {
        let Categorydetails = await category.findByIdAndUpdate({  _id:req.params.categoryid});
        
            Categorydetails.Category_id=req.body.Category_id,
            Categorydetails.category_Name=req.body.category_Name
    
      
        await Categorydetails.save();
        res.send(Categorydetails);
    }
    catch (ex) {
        return res.status(500).send(ex);
    }
});


module.exports = router;