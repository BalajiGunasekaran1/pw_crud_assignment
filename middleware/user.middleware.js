//Middleware check for register api

const registerValidate = (req,res,next)=>{
    const {name,email,password}=req.body;
    if(req.body && name && email && password){
        next();
    }else{
        res.status(400).json({
            message:"all inputs required"
        })
    }
}

//Middleware check for login Api
const loginValidate= (req,res,next)=>{
    const {email,password}=req.body;
    if(req.body && email && password){
        next();
    }else{
        res.status(400).json({
            message:"Invalid"
        })
    }
}

module.exports ={registerValidate,loginValidate}