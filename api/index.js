const express = require("express");
const data = require('./data');

const app = express();

const PORT = process.env.PORT || 5000;


app.get("/products",(req,res)=>{

    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const paginatedProducts = data.products.slice(startIndex, endIndex);
  
    console.log(paginatedProducts);

    // Calculate the total number of pages
    const totalPages = Math.ceil(data.products.length / pageSize);

    res.send(paginatedProducts);
}) 

app.listen(PORT,()=>console.log(`Server running on port: http://localhost:${PORT}`))