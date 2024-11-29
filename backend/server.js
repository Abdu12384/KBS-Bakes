const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')


dotenv.config()



app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}))

connectDB()

app.get('/',(req,res)=>{
  res.send("MongoDb is connnected")
})

const authRoute=require('./routes/authRoute')




app.use('/auth',authRoute)




const PORT =  3000;
app.listen(PORT,()=>console.log(`Server running http://localhost:${PORT}`))

