const express =require('express')
const {register,login}= require('../controller/userController.js');
const { registerValidate, loginValidate } = require('../middleware/user.middleware.js');
const userRouter = express.Router();

userRouter.post('/register',registerValidate,register)
userRouter.post('/login',loginValidate,login)

module.exports =userRouter