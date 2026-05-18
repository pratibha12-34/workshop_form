const register = require('../models/RegisterSchema');

exports.userregister = async(req,res)=>{
    const{Name, EmailID, Password, Phone}= req.body;
    try{
        const registeruser = await register.findOne({email: EmailID});
        if(registeruser){
            return res.status(400).json({msg:"user already exists"});
        }
        let newuser= await register.create({name: Name, email: EmailID, password: Password, phone: Phone});
        

        return res.status(200).json({msg:"user registered successfully", user:newuser});
    }
    catch(err){
        return res.status(500).json({"error":err.message});
    }

};
