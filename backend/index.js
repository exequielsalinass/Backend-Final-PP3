import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import unidadRoutes from "./routes/unidadRoutes.js";
import tareasRoutes from "./routes/tareasRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      //No esta permitido
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

// Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/unidades", unidadRoutes);
app.use("/api/tareas", tareasRoutes);

const PORT = process.env.PORT || 4000; //Para cuando haga el deployment --> se asigna un puerto en especifico

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
