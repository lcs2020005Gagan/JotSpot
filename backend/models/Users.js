const mongoose=require("mongoose")

const usersSchema=new mongoose.Schema({
name:{
    type:String,
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
date:{
    type:Date,
    default:Date.now().toGMTString
}

});
const users=mongoose.model("users",usersSchema);
users.createIndexes();
module.exports=users