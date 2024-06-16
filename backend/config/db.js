// const mongoose = require("mongoose")
// async function connectDB() {
//      try{
//         await mongoose.connect("mongodb+srv://Leelakasthuri:Leelakasthuri@22@mernapplication.mv9lpd2.mongodb.net/?MernApplicationretryWrites=true&w=majority&appName=MernApplicationI")
//         console.log("connected to DB")

//      }catch(err){
//         console.log(err);
//      }
// }

// module.exports = connectDB

const mongoose = require("mongoose");

async function connectDB() {
    try {
        const dbUri = process.env.MONGODB_URI;
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to DB in mongoose");
    } catch (err) {
        console.log("Error connecting to DB:", err);
    }
}

module.exports = connectDB;
