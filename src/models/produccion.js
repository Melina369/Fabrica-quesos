const mongoose = require('mongoose');
const { Schema } = mongoose;

const produccionSchema = new Schema({
    fecha_ing: String,
    hora: String,
    cisterna: Number,
    temperatura: Number,
    fermentos: String,
    empleado: String
});

module.exports = mongoose.model('produccion', produccionSchema);