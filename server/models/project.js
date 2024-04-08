const mongoose=require("mongoose")
const projectSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'collection',
        required: true
      },
    projname:{
        type:String,
        required:true
    },
    tech:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required: true
    },
    status:{
        type:String,
        required: true
    }
})



const projectuser = mongoose.model("projects",projectSchema)

module.exports=projectuser