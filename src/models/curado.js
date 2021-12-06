const mongoose = require('mongoose');
const { Schema } = mongoose;

const curadoSchema = new Schema({
    tanda_num: Number,
    fecha: String,
    humedad: Number,
    temperatura: Number,
    fecha_control: String,
    peso: Number
});

module.exports = mongoose.model('curado', curadoSchema);