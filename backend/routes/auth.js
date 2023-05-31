const express=require("express")
const bodyParser = require("body-parser");
const User=require("../models/Users")
const router=express.Router()
const app =express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt=require("jsonwebtoken")
const secretKey="helloworld";
let fetchuser=require("../middleware/fetchuser");
const { findById } = require("../models/Users");
let success=false


//login user
router.post('/login',
[ body('email','Enter a valid email').isEmail(),
  body('password','password must be atleast 5 characters').isLength({ min: 5 }),
],
  async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try{
        let user= await User.findOne({email:req.body.email});
        if(!user)
        {
            return res.status(400).json({ success,errors: "wrong email" });
        }
        else{
           var passwordcompare=await bcrypt.compare(req.body.password,user.password)
           if(!passwordcompare)
           {
            return res.status(400).json({success, errors: "wrong passwrod" });
           }

        var authtoken=await jwt.sign({id:user.id},secretKey)
        // console.log(authtoken)
        // setsuccess(true);
        success=true;
        res.json({success,authtoken});
        success=false;  
    }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Some error occured");
    }
   
 
  }
  
)

//getuser
router.post('/getuser',fetchuser,
  async (req, res) => {
    try{
      // console.log("in auth getuser");
      const userid=req.id;
      let user=await User.findById(userid).select("-password");
      res.send(user);
    }
    catch(err)
    {
      res.status(500).send("Internal server error");
    }
  });


//create user
router.post('/createuser',
[body('name','Enter a valid name').isLength({min:1}),
  body('email','Enter a valid email').isEmail(),
  body('password','password must be atleast 5 characters').isLength({ min: 5 }),
],
  async (req, res) => {
    success=false;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try{
        let user= await User.findOne({email:req.body.email});
        if(user)
        {
            return res.status(400).json({ success,errors: "Email is alerady registered with cloudNote" });

        }
        else{
            var salt =await bcrypt.genSaltSync(10);
var secpassword =  await bcrypt.hashSync(req.body.password, salt);
       user=await  User.create({
            name:req.body.name,
          email: req.body.email,
          password: secpassword,
        })
        // console.log(user);
        var authtoken=await jwt.sign({id:user.id},secretKey)
        // console.log(authtoken)
        success=true
        res.json({success,authtoken});
        success=false;
    }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Some error occured");
    }
   
 
  }
  
);
module.exports=router
