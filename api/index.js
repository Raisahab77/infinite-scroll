const express = require("express");
const data = require('./data');
const Quote = require('./models/quotes');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const mongoosePaginate = require("mongoose-paginate-v2");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/quote",{
}).then(()=>{
    console.log("Connection successful");
}).catch((e)=>{
    console.log("Unable to connect with database",e);
})

const PORT = process.env.PORT || 5000;


app.get("/quote",async(req,res)=>{
    try {
        // We destructure the req.query object to get the page and limit variables from url 
        const { page = 1, pageSize = 10 } = req.query;

        const quote = await Quote.find({})
            // We multiply the "limit" variables by one just to make sure we pass a number and not a string
            .limit(pageSize * 1)
            // I don't think i need to explain the math here
            .skip((page - 1) * pageSize)
            // We sort the data by the date of their creation in descending order (user 1 instead of -1 to get ascending order)
            .sort({ createdAt: -1 })

        // Getting the numbers of products stored in database
        const count = await Quote.countDocuments();

        setTimeout(() => {
            return res.status(200).json({
                quote,
                total:count,
                totalPages: Math.ceil(count / pageSize),
                currentPage: page,
            });
        }, 3000);
        
    } catch (err) {
        res.send(err);
    }
}) 

app.post("/quote",(req,res)=>{
    let data = req.body.data;
    for(let i = 0; i<data.length;i++){
        const quote = new Quote(data[i]);
        quote.save().then(() => {
            // res.status(201).send(quote);
            console.log("Saved Successfully");
        }).catch((err) => {
            res.send(err);
            console.log(err)
        });
    }
    res.send("done");
})

app.listen(PORT,()=>console.log(`Server running on port: http://localhost:${PORT}`))