const mysqlConn = require('../connection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../../config.json')


var getAllUser = async (req, res) =>{
    mysqlConn.query('SELECT * FROM user', (err, rows, fields)=>{
        if(err){
            console.log('error --',err)
        }else{
            res.status(200).json({users : rows})
        }
    })
}


var addUser = async (req, res) =>{
    const {id, name, phone, email, password} = req.body
    if(!id || !name || !phone || !email || !password){
        res.status(400).json({message : "all fields required"})
    }else{
        mysqlConn.query(`SELECT * FROM user WHERE email = ${email}`, (err, rows, fields)=>{
            if(rows){
                res.status(404).json({message : "User already exist"})
            }else{
                bcrypt.genSalt(10, (err, salt)=>{
                    bcrypt.hash(password, salt, (err, hash)=>{
                        if(err) throw err;
                        else{
                            mysqlConn.query(`INSERT INTO user (id, name, phone, email, password) VALUES (${id}, '${name}', '${phone}', '${email}', '${hash}')`, (err)=>{
                                if(err){
                                    console.log('error ', err)
                                }else{
                                    res.status(201).json({message : 'user info saved'})
                                }
                            })
                        }
                    })
                })
            }
        })
        
    }
}

var login = async (req, res) =>{
    const {email, password } = req.body
    if(!email || !password){
        res.status(400).json({message : "All fields required"})
    }else{
        mysqlConn.query(`SELECT * FROM user WHERE email = '${email}'`, (err, rows, fields)=>{
            if(!rows){
                res.status(400).json({message : "User does not exist please sign in"})
             }else{
                bcrypt.compare(password, rows[0].password).then(isMatch=>{
                    if(!isMatch){
                        res.status(401).json({message : "email or password incorrect"})
                    }else{
                        jwt.sign(
                            {id : rows[0].id},
                            config.JWT_KEY,
                            {expiresIn : 3600},
                            (err, token) =>{
                                if(err) throw err;
                                else{
                                    res.status(201).json({Token : token})
                                }
                            }
                        )
                    }
                })
            }
        })
    }
}


var updateUser = async (req, res) =>{
    var id = req.params.id
    mysqlConn.query(`UPDATE user SET name = '${req.body.name}' WHERE id = ${id}`, (err)=>{
        if(err){
            res.send(err)
        }else{
            res.status(200).json({message : 'user details updated'})
        }
    })
}

var deleteUser = async (req, res) =>{
    var id = req.params.id
    mysqlConn.query(`DELETE FROM user WHERE id = ${id}`, (err)=>{
        if(err){
            res.send(err)
        }else{
            res.status(200).json({message : `user info deleted for id ${id}`})
        }
    })
}


module.exports = {
    getAllUser,
    addUser,
    updateUser,
    deleteUser,
    login
}