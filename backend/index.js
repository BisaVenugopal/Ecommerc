const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const connectDB = require('./config/db.js')
const router = require('./routes/index')

const app = express()
app.use(bodyParser.json({ limit: '50mb' })); // Adjust limit as needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin : ["https://deploy-mern-1whq.vercel.app"],
    methods : ["POST","GET"],
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api",router)

const PORT = 4000 || process.env.PORT
connectDB().then(() => {
    app.listen(PORT,()=> {
        console.log("connected to DB")
        console.log("Server is running")
    })

})
