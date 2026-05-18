const mongoose = require("mongoose");

const connectDb=()=>{mongoose.connect("mongodb+srv://htmlworkshop:root@register.gapcghu.mongodb.net/workshop?appName=register")
    .then(()=>console.log("Database connected"))
    .catch((err)=>console.log(err))

}

module.exports= connectDb;