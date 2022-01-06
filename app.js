const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require("./nosql/routes/user");
const config = require('./config.json')

const app = express();
app.use(express.json());
app.use(cors());


const PORT = config.PORT || 4000;
const password = config.PASSWORD;

// connecting with database
const mongooseURL = `mongodb+srv://upendraa:${password}@cluster0.mwuaz.mongodb.net/assignment?retryWrites=true&w=majority`;
mongoose.connect(mongooseURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

mongoose.Promise = global.Promise;
mongoose.connection.once('open', ()=>{
    console.log("connected")
});

mongoose.connection.on("error", (error) => {
    console.log("Error connecting database..."), error;
});


app.use("/user", userRouter)



// app.get('/', (req, res)=>{
//     res.send("hello")
// });


app.listen(PORT, ()=>{
    console.log(`app running on port ${PORT}`)
});