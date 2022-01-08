const User = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../../config.json')


module.exports.signIn = (req, res) => {
    const { userName, email, phone, password } = req.body
    if (!userName || !email || !phone || !password) {
        res.status(400).json({ message: "All fields required" })
    } else {
        User.findOne({ email: email }).then((user) => {
            if (user) {
                console.log(user)
                res.status(400).json({ message: "User already registered" })
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        else {
                            const newUser = new User({
                                userName: userName,
                                email: email,
                                phone: phone,
                                password: hash
                            })
                            newUser.save()
                                .then(() => {
                                    res.status(200).json({ message: 'user successfully registered' })
                                })
                                .catch(err => {
                                    res.status(500).json({ message: err.message })
                                })
                        }
                    })
                })
            }
        })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
}

module.exports.logIn = (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json({ message: "All fields required" })
    } else {
        User.findOne({ email: email }).then((user) => {
            if (!user) {
                res.status(400).json({ message: "User does not exist Kindly register" })
            } else {
                bcrypt.compare(password, user.password).then((isMatch) => {
                    if (!isMatch) {
                        res.status(401).json({ message: 'Email or password incorrect' })
                    } else {
                        jwt.sign(
                            { id: user._id },
                            config.JWT_KEY,
                            {
                                expiresIn: 3600
                            },
                            (err, token) => {
                                if (err) throw err;
                                res.status(200).json({ Token: token })
                            }
                        )
                    }
                })
            }
        })
    }
}

module.exports.getAllUser = (req, res) => {
    let { page = 1, limit = 10 } = req.query
    page = parseInt(page)
    limit = parseInt(limit)
    User.find()
        .then((user) => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}

module.exports.updateOne = (req, res) => {
    const id = req.params.id
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(() => {
            res.status(200).json({ message: 'User details updated successfully' })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}
    

module.exports.remove = (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then(() => {
            res.status(200).json({ message: 'User deleted successfully' })
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
}


