const mongoose=require("mongoose")
const skillSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'collection',
        required: true
      },
    tech:{
        type:String,
        required:true
    },
    proficiency:{
        type:String,
        required:true
    },
    certification:{
        type:String,
        required: true
    },
    status:{
        type:Number,
        required: true
    },
    action:{
        type:String,
        required: true
    }
})



const skilluser = mongoose.model("skills",skillSchema)

module.exports=skilluser