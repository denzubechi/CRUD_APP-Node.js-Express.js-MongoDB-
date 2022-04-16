//CRUD Operations
const mongoose = require("mongoose")
var schema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    gender:String,
    status:String
}) // alows to define and shape the content of a document

const Userdb = mongoose.model('userdb',schema) //userdb,the name of the document

module.exports = Userdb