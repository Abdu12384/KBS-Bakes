const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
const morgan = require('morgan')

dotenv.config()



app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true
}))

app.options('*', cors());

connectDB()

app.get('/',(req,res)=>{
  res.send("MongoDb is connnected")
})

const authRoute  = require('./routes/authRoute')
const adminRoute = require('./routes/adminRoute')
const userRoute =  require('./routes/userRoute')



app.use('/auth',authRoute)
app.use('/admin',adminRoute)
app.use('/user',userRoute)



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running Successfully ${PORT}`))

