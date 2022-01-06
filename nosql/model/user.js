const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required : true
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone:{
        type: Number,
        match: [/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/, 'Please fill a valid phone no'],
        required: true
    },
    password:{
        type : String,
        required : true
    }
},{timestamps : true})

module.exports = mongoose.model("User", userSchema)