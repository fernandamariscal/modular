const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Nombres: { type: String, required: true },
  Apellidos: { type: String, required: true },
  Correo: { type: String, required: true, unique: true },
  Fecha_nacimiento: { type: Date, required: true },
  Password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
