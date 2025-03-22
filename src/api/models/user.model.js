const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
    username  :  {type: String, required:true, unique: true},
    name  :  {type: String, required:true},
    email : {type:String, required:true, unique:true },
    password: { type: String, required: true},
    role: {type: String,enum: ["participe, trainer"], default: "trainer"},     
},{
    collection: "users",
    timestamps:true // createdAt,updatedAt
});


const Users = mongoose.model("Users", userSchema);
module.exports = Users;