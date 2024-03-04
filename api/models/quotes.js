const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
    quote:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        require:true,
    },

})

const Quote =  new  mongoose.model("quotes",quoteSchema);

module.exports = Quote;