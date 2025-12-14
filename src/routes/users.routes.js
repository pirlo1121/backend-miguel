import express from 'express'
import {  deleteusers, getUserById, getusers, updateusers } from '../controllers/users.controllers.js';
import { registerUser, login } from '../controllers/auth.controllers.js';



const routerusers = express.Router();//permite crear las rutas

// rutas get
routerusers.get("/users", getusers);//obtener 
routerusers.get("/users/:id", getUserById)

// rutas put
routerusers.put("/updateusers/:id", updateusers )//actualizar

// rutas delete
routerusers.delete("/deleteusers/:id", deleteusers )

// rutas post
routerusers.post("/createUser" , registerUser)
routerusers.post("/login", login)



export default routerusers
