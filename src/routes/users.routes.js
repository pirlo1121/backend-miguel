import express from 'express'
import {  deleteusers, getUserById, getusers, updateusers } from '../controllers/users.controllers.js';
import { registerUser, login, verifyToken } from '../controllers/auth.controllers.js';



const routerusers = express.Router();//permite crear las rutas

//RUTA DE VERIFICACION 

routerusers.get("/verify/:token" , verifyToken);

// rutas post

routerusers.get("/users", getusers);//obtener 
routerusers.get("/users/:id", getUserById)

routerusers.put("/updateusers/:id", updateusers )//actualizar69
routerusers.delete("/deleteusers/:id", deleteusers )

routerusers.post("/createUser" , registerUser)
routerusers.post("/login", login)



export default routerusers