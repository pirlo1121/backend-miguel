import mongoose from "mongoose";
import { productModel } from "../models/products.models.js";






export async function getproduct  (req, res) {
    try {
       const products = await productModel.find();

       return res.status(200).json ({ok : true , products})

    } catch (error) {
        console.log(error)
        return res.status(500).json ({ok: false, msg : "error interno"})
    }
}
export async function getProductsByCategory(req, res) {
  try {
    const { category } = req.params;
    console.log("Categor\u00eda recibida:", category);

    const products = await productModel.find({ category });
    console.log("Productos encontrados:", products);

    if (!products.length) {
      return res.status(404).json({ ok: false, msg: "No hay productos con esta categor\u00eda" });
    }

    return res.status(200).json({ ok: true, products });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ ok: false, msg: "Error interno del servidor" });
  }
}


export const getProductsByUser = async (req, res) => {
    try {
        const userId = req.userId;

        const products = await productModel.find({ userId });

        return res.json({
            ok: true,
            total: products.length,
            products
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false, msg: "Error interno" })
    }
};



export async function getproductById (req,res){
    try {
        const id  = req.params.id;
        if(!mongoose.isValidObjectId(id)){
        return res.status(400).json ({ok : false, msg: "No hay id"})
        }
        const product = await productModel.findById(id);
        if (!product){
            return res.status(404).json({ok: false, msg: "error interno"})
        }

        return res.status(200).json({ok : true, product})

    } catch (error) {
        return res.status(500).json({ok: false, msg:"error interno"})
    }
}

export async function  createProduct (req, res){
    try {
        const data = req.body;
        const idUser = req.userId;
        data.userId = idUser
        const product = await productModel.create(data);
        return res.status(201).json ({ok:true, product});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false, msg : "Error al crear producto"})
    }
}

export async function  updateProduct (req, res){
    try {
        const  id = req.params.id;
        const data = req.body;
        
        const productUptade = await productModel.findByIdAndUpdate(id, data, {new: true});
        if (!productUptade){
            return res.status(404).json({ok:false, msg : "error interno"})
        }
        return res.status(200).json({ok: true, productUptade})

   
    } catch (error) {
        return res.status(500).json({ok: false, msg: "error interno"})
    }
}

export async function  deleteProduct (req, res){
    try {
       const id = req.params.id;
       const deletedProducts = await productModel.findByIdAndDelete(id);
       if(!deletedProducts){
        return res.status(404).json({ok: false, msg :"producto no encontrado" })
        
       }

       return res.status(200).json({ok:true, msg: "producto eliminado "})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok: false, msg: "error interno"})
    }
}
