const express = require("express");
const User = require("../models/user");
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get("/:token", async (req, res) => {
  try {
    let userToken = await User.findOne({ 'token': req.params.token });
    
    if (!userToken) {
      let error = { status: "error", message: "token not found"}
      res.status(400).send(error);
    }
    else if (userToken.type == 'Admin') {
      let users = await User.find().sort({
        email: "asc"
      });
  
      let success = { status: "success", users: users}
      res.send(success);
    }
    else {
      let error = { status: "error", message: "you are not authorized for use this api"}
      res.status(400).send(error);
    }
  }
  catch (err) {
    let error = { status: "error", message: err.message};
    return res.status(500).send(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    if (req.body.email) {
      let users = await User.findOne({ 'email': req.body.email });
  
      if (!users) {
        let error = { status: "error", message: "email not found"};
        return res.status(404).send(error);
      }
      else if (req.body.password == users.password) {
        const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
        let success = { status: "success", token: token};

        users.set({
          token: token
        });

        await users.save();

        return res.send(success);
      }
      else {
        let error = { status: "error", message: "invalid password"};
        return res.status(400).send(error);
      }
    }
    else {
      let error = { status: "error", message: "invalid email"};
      return res.status(400).send(error);
    }
  }
  catch (err) {
    let error = { status: "error", message: err.message};
    return res.status(500).send(error);
  }
});

router.post('/register', async (req, res) => {
  try {
    let users = await User.findOne({ 'email': req.body.email });
  
    if (users) {
      let error = { status: "error", message: "email already exist"};
      return res.status(404).send(error);
    }
    else {
      if(req.body.password != req.body.confirmpassword) {
        let error = { status: "error", message: "password does not match"};
        return res.status(400).send(error);
      }
  
      let user = new User({
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        password: req.body.password,
        name: req.body.name,
        address: req.body.address
      });
  
      user = await user.save();
  
      let success = { status: "success", user: user}
      res.send(success);
    }
  }
  catch (err) {
    let error = { status: "error", message: err.message};
    return res.status(500).send(error);
  }
});

router.post('/registeradmin/:token', async (req, res) => {
  try {
    if (!req.params.token ) {
      let error = { status: "error", message: "empty token"};
      return res.status(400).send(error);
    }

    let users = await User.findOne({ 'email': req.body.email });
    let token = await User.findOne({ 'token': req.params.token });

    if (!token) {
      let error = { status: "error", message: "token not found"};
      return res.status(404).send(error);
    }
  
    if (users) {
      let error = { status: "error", message: "email already exist" };
      return res.status(404).send(error);
    }
    else {
      if(token.type != "Admin") {
        let error = { status: "error", message: "you are not authorized to create this user"};
        return res.status(400).send(error);
      }

      if(req.body.password != req.body.confirmpassword) {
        let error = { status: "error", message: "password does not match" };
        return res.status(400).send(error);
      }
  
      let user = new User({
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        password: req.body.password,
        name: req.body.name,
        type: "Admin",
        address: req.body.address
      });
  
      user = await user.save();
  
      let success = { status: "success", user: user}
      res.send(success);
    }
  }
  catch (err) {
    let error = { status: "error", message: err.message};
    return res.status(500).send(error);
  }
});

router.put('/:email&:token', async (req, res) => {
  try {
    if (!req.params.email ) {
      let error = { status: "error", message: "empty email"};
      return res.status(400).send(error);
    }

    if (!req.params.token ) {
      let error = { status: "error", message: "empty token"};
      return res.status(400).send(error);
    }

    let users = await User.findOne({ 'email': req.params.email });
    let token = await User.findOne({ 'token': req.params.token });

    if (!users) {
      let error = { status: "error", message: "email not found"};
      return res.status(404).send(error);
    }
    
    if (!token) {
      let error = { status: "error", message: "token not found"};
      return res.status(404).send(error);
    }
    
    if (req.params.token == users.token || token.type == "Admin") {
      var contactNumber = req.body.contactNumber;
      var address = req.body.address;
      var password = req.body.password;
      var confirmpassword = req.body.confirmpassword;

      if (!contactNumber) {
        contactNumber = users.contactNumber;
      }

      if (!address) {
        address = users.address;
      }

      if (!password) {
        password = users.password;
      }

      if (!confirmpassword) {
        confirmpassword = users.password;
      }

      if (contactNumber == users.contactNumber && address == users.address && password == users.password && confirmpassword == users.password) {
        let error = { status: "error", message: "empty data"};
        return res.status(400).send(error);
      }

      if (password == users.password && confirmpassword == users.password) {
        
      }
      else {
        if (password != confirmpassword) {
          let error = { status: "error", message: "password does not match"};
          return res.status(400).send(error);
        }
      }
      
      users.set({
        contactNumber: contactNumber,
        address: address,
        password: password
      });
    
      let user = await users.save();

      let success = { status: "success", user: user}
      res.send(success);
    }
    else {
      let error = { status: "error", message: "you are not authorized to edit this user"};
      return res.status(400).send(error);
    }
  }
  catch (err) {
    let error = { status: "error", message: err.message};
    return res.status(500).send(error);
  }
});

router.delete('/:email&:token', async (req, res) => {
  if (!req.params.email ) {
    let error = { status: "error", message: "empty email"};
    return res.status(400).send(error);
  }

  if (!req.params.token ) {
    let error = { status: "error", message: "empty token"};
    return res.status(400).send(error);
  }

  try {
    let users = await User.findOne({ 'email': req.params.email });
    let token = await User.findOne({ 'token': req.params.token });

    if(!users) {
      let error = { status: "error", message: "email not found"};
      return res.status(404).send(error);
    }

    if(!token) {
      let error = { status: "error", message: "token not found"};
      return res.status(404).send(error);
    }

    if (token.type == "Admin") {
      users.delete({
        email: req.params.email
      })
  
      let user = await users.save();
  
      let success = { status: "success", user: user}
      res.send(success);
    }
    else {
      let error = { status: "error", message: "you are not authorized to delete this user"};
      return res.status(400).send(error);
    }
  }
  catch (err) {
    let error = { status: "error", message: err.message};
    return res.status(500).send(error);
  }
});


router.put('/:userId', async (req, res) => {
  if(!req.params.userId)
    {
        let error = { error: "You must enter a user ID!"};
        return res.status(400).send(error);
    }

    try {
      {
      if(req.body.password != req.body.confirmpassword) {
        let error = { error: "passwords Does Not match!"};
        return res.status(400).send(error);
      }

        let userDetail = await User.findOneAndUpdate({_id:req.params.userId},{
          email: req.body.email,
          telephone: req.body.telephone,
          password: req.body.password,
          name: req.body.name,
          address: req.body.address
        });
            if(userDetail==={})
            {
                let error = { error: "User ID is not in the system !"};
                return res.status(404).send(error);
            }
                await userDetail.save();
                res.send(userDetail);    
       
    }
  }
    catch (ex) {
        return res.status(500).send(ex);
    }
});


module.exports = router;