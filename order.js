const mongoose = require ( "mongoose" )

const orderSchema = new mongoose.Schema({
    fanId: 
    {
      type: String,
      required: true,
    },
    orderTime: 
    {
      type: Date,
      required: true,
    },
    department: 
    {
      type: String,
      required: true,
    },
    title: 
    {
      type: String,
      required: true,
    },
    price: 
    {
      type: Number,
      required: true,
    },
    collectionName: 
    {     
      type: String,  
      required: true,     
    }, 
    character: 
    {     
      type: String,       
      required: true,  
    },    
} )

const orderTable = mongoose.model("orders", orderSchema)

module.exports = orderTable