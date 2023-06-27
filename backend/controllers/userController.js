const User = require('../model/userModel')
const bcrypt = require('bcrypt')

module.exports.register = async (req,res,next) => {
    try{
        const {username, email, password} = req.body;

        // console.log("r",req.body)
        
        const userNameCheck = await User.findOne({username})
        if(userNameCheck)
            return res.json({msg: "username already exists", status: 'error'})
        
        const emailCheck = await User.findOne({email})
        if(emailCheck) 
            return res.json({msg: "Email already exists", status: 'error'})
        
        let pass = password.toString();
        const hashPswd = await bcrypt.hash(pass,10).then((hash)=>hash);
        
        // const hashPswd = await bcrypt.hash(pass,10).then((hash)=>hash);

        const user = await User.create({
            username: username.toString(),
            email : email.toString(),
            password:hashPswd.toString()
        })
        console.log(user);
        // user.save();

        return res.json({status:'success',user})
    }catch(e){
        next(e);
    }
} 


module.exports.login = async (req,res,next) => {
    try{
        const {username, password} = req.body;

        // console.log("r",req.body)
        
        const user = await User.findOne({username})
        if(!user)
            return res.json({msg: "Incorrect username or password", status: 'error'})
        
        const isPswdValid = await bcrypt.compare(password.toString(), user.password)
        if(!isPswdValid) 
            return res.json({msg: "Incorrect username or password", status: 'error'})


        return res.json({status:'success',user})
    }catch(e){
        next(e);
    }
} 

module.exports.getAllUsers = async (req,res,next) => {
    try{
        //select all users except passed id througn params
        const users = await User.find({_id:{$ne:req.params.id}}).select([
            'email','username','_id'
        ])

        return res.json(users)
    }catch(e){
        next(e);
    }
} 
