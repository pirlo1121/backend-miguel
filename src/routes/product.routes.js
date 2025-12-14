import express from 'express'
import { createProduct,  deleteProduct,  getproduct,  getproductById,  getProductsByCategory,  getProductsByUser,  updateProduct,} from '../controllers/product.controllers.js';
import { getUserById } from '../controllers/users.controllers.js';
import { validarToken } from '../middlewares/auth.js';
const routerProduct = express.Router();//permite crear las rutas




const router = express.Router();


routerProduct.get("/product", getproduct, );
routerProduct.get("/product/:id", getproductById );
 routerProduct.post("/createProduct", validarToken , createProduct, );
routerProduct.get("/product/category/:category", getProductsByCategory);
routerProduct.get("/productByUser", validarToken, getProductsByUser)
routerProduct.put("/updateProduct/:id", updateProduct, );
routerProduct.delete("/deleteProduct/:id", validarToken, deleteProduct, );


export default routerProduct; 