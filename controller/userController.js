const userModel = require('../model/userModel.js')
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt')
//------Register User----------------------------
const register = async (req,res)=>{
    const {name,email,password} = req.body;
try{
    if(!name || !email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are required"
           }) 
    }

// Check the user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }
// check the email validation using email validator package
    let isValidEmail = emailValidator.validate(email);
    if (!isValidEmail) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid email",
      });
    }
    
    const userInfo = userModel(req.body);
    const result = await userInfo.save();
    return res.status(200).json({
      success: true,
      data: result,
    });

}catch(err){
   return res.status(400).json({
    success:false,
    message:err.message
   })
}
}

//-----------Login -------------------------
const login = async (req,res)=>{
    const {email,password}= req.body;
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Email id and passwords Should not be empty"
           }) 
    }
    try{ 
        //find the given email from user table 
        const user = await userModel.findOne({email}).select('+password');
        // password validation
       const isValidPassword = await bcrypt.compare(password,user.password);
        //console.log(isValidPassword);
        if(!user || !isValidPassword){
            return res.status(400).json({
                success:false,
                message: "invalid credentials"
            })
        }
        return res.status(200).json({
            success: true,
            data: user,
          });

    }catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
           }) 
    }
}

module.exports ={register,login}