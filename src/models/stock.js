const mongoose = require('mongoose');
const { Schema } = mongoose;

const stockSchema = new Schema({
    tanda_num: Number,
    kilos: Number,
    cantidad: Number,
    venta:Number,
    precio_vta: Number,
    ganancia: Number,
});

module.exports = mongoose.model('stock', stockSchema);