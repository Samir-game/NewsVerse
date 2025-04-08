const User= require('../models/user.model.js')
const bcrypt= require('bcryptjs')
const {generateJWT}= require('../middlewares/generateJWT.js')

const handleSignUp= async(req, res)=>{
    const {userName, userEmail, userPassword}= req.body;

    if(!userName || !userEmail || !userPassword){
        return res.status(400).json({
            msg: "fill all credentials"
        })
    }

    try {
        const existingUser= await User.findOne({userEmail:userEmail})
          
        if(existingUser){
            return res.status(400).json({
                msg:"user already exist with this email"
            })
        }
        
        const saltRounds= 10;
        const hashpassword= await bcrypt.hash(userPassword,saltRounds)

        const user= await User.create({
            userName,
            userEmail,
            userPassword: hashpassword,
        })

        const token=  generateJWT(user)
        
        return res.status(201).json({
            msg:"user registered",
            userName,
            userEmail,
            token
        })

    } catch (error) {
        console.log("error creating the user",error)
        return res.status(500).json({
            msg:"internal server error"
        })
        
    }
}

const handleLogin= async(req,res)=>{

    const {userEmail,userPassword}= req.body;

    if(!userEmail || !userPassword){
        return res.status(400).json({
            msg:"fill all the credentials"
        })
    }

    try {

        const user= await User.findOne({userEmail:userEmail})

        if(!user){
            return res.status(404).json({
                msg:"user not found"
            })
        }

        const ispasswordValid= await bcrypt.compare(userPassword,user.userPassword);

        if(!ispasswordValid){
            return res.status(401).json({
                msg:"incorrect passowrd"
            })
        }

        const token= generateJWT(user);
       
        return res.status(200).json({
            msg:"login successful",
            userName: user.userName,
            userEmail: user.userEmail,
            token,
        })

    } catch (error) {
        console.log("error login user",error)
        return res.status(500).json({
            msg:"internal server error"
        })
    }
}

module.exports={
    handleSignUp,
    handleLogin
}