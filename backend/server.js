require('dotenv').config()

const express =  require('express')

const mongoose = require('mongoose')
const app = express()

const authRoutes = require('./routes/authentication')
const bookingRoutes = require('./routes/booking')




app.use(express.json())


app.use('/auth', authRoutes)

app.use('/bookings',bookingRoutes)



mongoose.connect(process.env.DATABASE_URI)
.then(()=>{
    app.listen(process.env.PORT, (req,res)=>{
        console.log(req)
        console.log('Connected to db & listening on port 4000')
    })
})
.catch((err) =>{
    console.error('error:',err)
})