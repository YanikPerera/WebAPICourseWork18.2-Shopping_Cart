const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const home = require('./routes/home');
const validation = require("./middlewares/validation");
const authenticator = require("./middlewares/authenticator");
const categories = require('./routes/categories');

const PORT = 5000;
mongoose.Promise = global.Promise;
mongoose
    .connect(
        'mongodb+srv://Anjalee_2:VyEfSgvLboOimdCQ@cluster0-edfz9.mongodb.net/shoppingcart?retryWrites=true&w=majority',
       
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log('Mongodb Connection Established'))
    .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(validation);

app.use('/', home);
app.use('/api/categories',categories);

app.listen(PORT, ()=> {
    console.log(`Listening on Port: ${PORT}`);
});