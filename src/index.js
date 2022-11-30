const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const session =require('express-session')
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
   // name:"swap",
   secret:"swapnali",
    resave:false,
   
   
    cookie:{
        maxAge:1000*60*60*2,
        //sameSite:true,
        //secure:true
    },
    saveUninitialized:false,
}))

mongoose.connect("mongodb+srv://Uranium-Batch:aruSjkdGdfhc9MRK@functionup.eel5r.mongodb.net/digi"
, {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', route)


app.listen(process.env.PORT || 5002, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5002))
});