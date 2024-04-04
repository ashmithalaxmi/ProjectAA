const mongoose=require("mongoose")
const newSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    types:{
        type:String,
        required: true
    },
    contact:{
        type:Number,
        required: true
    },
    role:{
        type:String,
        required: true
    }
})



const collection = mongoose.model("matrix_proj",newSchema)

module.exports=collection