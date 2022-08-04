import express from "express";
import dotenv from 'dotenv'
import conectarDB from "./config/db.js";
import usuarioRoutes from './routes/usuarioRoutes.js'

const app = express();
app.use(express.json())

dotenv.config()

conectarDB();

// Routing
app.use('/api/usuarios', usuarioRoutes)


const PORT = process.env.PORT || 4000;  //Para cuando haga el deployment --> se asigna un puerto en especifico

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
