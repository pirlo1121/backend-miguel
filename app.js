import express from 'express';
import { connectDB } from './src/config/db-config.js';
import dotenv from 'dotenv';
import routerProduct from './src/routes/product.routes.js';
import routerUsers from './src/routes/users.routes.js';
import cors from 'cors'
import routerVotes from './src/routes/vote.routes.js';

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
// Rutas con prefijo

app.use("/api/products", routerProduct);
app.use("/api/users", routerUsers);
app.use("/api/votes", routerVotes)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});


