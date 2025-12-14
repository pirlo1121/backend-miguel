//mongoose
import mongoose, { Schema } from "mongoose";



// crear schema y modelo 

const productSchema = new mongoose.Schema({

  userId: {
    type: Schema.Types.ObjectId,
    ref:'user'
  },
  name:{
    type:String,
    required : [true, "el nombre es obligatorio"]
  },

   description: {
  type:String,
    required : [true, "el descripcion es obligatoria"]
  },
  price: {
  type:String,
    required : [true, "el precioes obligatorio"]
  },

  nameRestaurant : {
  type:String,
    required : [true, "el nombre del restaurante es obligatorio"]
  },

  image :{
  type:String,
    required : [true, "la imagen es obligatoria"]
  },
  
  votes: {
    type: Number,
    default:0,
  }

  
});


export const productModel = mongoose.model('product', productSchema)

// "name":"tablet"
// "price" : 5000
// "stock" : 8

// https://images.unsplash.com/photo-1550547660-d9450f859349
// https://images.unsplash.com/photo-1551782450-a2132b4ba21d