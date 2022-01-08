const express = require('express')
const jwt = require('jsonwebtoken')
const mysqlConn = require('../connection')
const config = require('../../config.json')

var authUser = async (req, res, next) =>{
    const {authorization} = req.headers
    if(!authorization){
        res.status(401).json({message : "You must have to log in"})
    }else{
        const token = authorization.replace("Bearer ", "")
        jwt.verify(token,config.JWT_KEY, (err, payLoad)=>{
            if(err){
                res.status(401).json({message : 'Token expired'})
            }
            else{
                const id = payLoad.id
                mysqlConn.query(`SELECT * FROM user WHERE id = ${id}`, (err, rows, fields)=>{
                    req.user = rows
                    next()
                })

            }
        })
    }
}

module.exports = authUser