const mongoose=require("mongoose")
const date=new Date();
const strdate=date.toString()

const notesSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
title:{
    type:String,
    required:true
},
description:{
    type:String,
},
tag:{


    type:String,
    default:"General"
},
date:{
    type:String,
    default:strdate
}

});
const notes=mongoose.model("notes",notesSchema);
notes.createIndexes();
module.exports=notes