import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true, //* Elimina los espacios al principio y al final
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, //* Solo puede existir una vez
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, //* Crea dos columnas --> createdAt || updatedAt
  }
);

usuarioSchema.pre('save', async function(next){         //* No uso un arrow function porque ocupo el this
  if(!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
})

/* usuarioSchema.pre('save', async function(next){         //* No uso un arrow function porque ocupo el this
  if(!this.isModified('password2')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password2 = await bcrypt.hash(this.password2, salt)
}) */

usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password)    //* this.password --> instancia del usuario que estamos comprobando
} //* retorna true o false

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
