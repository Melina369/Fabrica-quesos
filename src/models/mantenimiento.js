const mongoose = require('mongoose');  
const { Schema } = mongoose;

const mantenimientoSchema = new Schema({
    numero: Number,
    equipo: String,
    sist_op: String,
    diagnostico: String,
    solucion: {
        type: Boolean,
        default: false
    },
    observaciones: String,
    mhardware: String,
    msoftware: String,
});

module.exports = mongoose.model('mantenimiento', mantenimientoSchema);