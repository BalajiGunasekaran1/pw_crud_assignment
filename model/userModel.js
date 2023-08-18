const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
//Database structure for user table/collection
const userSchema = mongoose.Schema({
    name:{
        type: String,
    required: [true, "Name is Required field"],
    trim: true,
    maxlength: [50, "Name should be less than 50 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required field"],
        unique: true,
      },
      password:{
        type:String,
        select:false
      }
})

// Save encrupted password using bcrypt library before upload into the dashboard
userSchema.pre('save', async function(next){
    if (!this.isModified("password")) {
        return next();
      }
    
      this.password = bcrypt.hash(this.password, 10);
      return next();
})



module.exports = mongoose.model('User',userSchema);