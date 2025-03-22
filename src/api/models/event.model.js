const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventoSchema = new Schema({
    eventId:{type:String, required:true, unique: true},
    name:{type:String, required:true},
    description:{type:String, required:true},
    date:{type: Date, required: true},
    tipoDeDeporte: {type:String, required:true},
    trainerId: { type: mongoose.Schema.Types.ObjectId,
                  ref: "Users",
                  required: true
    }
},
    {
    collection: "evento",
    timestamps: true

});

const Eventos = mongoose.model('eventos', eventoSchema);
module.exports = Eventos;