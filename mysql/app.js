const express = require('express')
const bodyParser = require('body-parser')
const mysqlConn = require('./connection')
const userRoute = require('./routes/user')
const config = require('../config.json')

const app = express()
app.use(bodyParser.json())


mysqlConn.connect((err)=>{
    if(err){
        console.log('error '+err)
    }else{
        console.log('connected ................')
    }
})

app.use('/user', userRoute)

app.get('/', (req, res)=>{
    res.send('hello')
})


app.listen(config.PORT, ()=>{
    console.log('App running on port ', config.PORT)
})