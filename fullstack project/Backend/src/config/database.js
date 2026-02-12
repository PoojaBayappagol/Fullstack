const dns=require("node:dns/promises");
dns.setServers(['1.1.1.1','8.8.8.8']);

const mongoose=require('mongoose');

const connectDB=async()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('Connected to MongoDB');
    })

}

module.exports=connectDB;