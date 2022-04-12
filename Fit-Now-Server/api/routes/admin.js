
// Need to Implement backend services for superuser (Admin).

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminModel = require('../models/admin');

// login authentication
router.post('/login',(req,res,next)=>{
    adminModel.find({email: req.body.email}).exec().then(Admin => {
        if(Admin.length < 1){
            res.status(404).json({
                message:"Email does not exist."
            });
        }
        else{
            bcrypt.compare(req.body.password,Admin[0].password,(err,data)=>{
                if(err){
                    return res.status(401).json({
                        error:err,
                        message:"Admin Login Unsuccessful"
                    });
                }
                if(data){
                    const token = jwt.sign({
                        id: Admin[0]._id
                      }, 'thekeything', { expiresIn: '1h' });
                    return res.status(200).json({
                        message:"Admin Login Succesful",
                        token:token,
                        user: Admin[0]
                    });
                }
                else{
                    return res.status(401).json({
                        message:"Incorrect password"
                    });
                }
            })
        }
    }).catch(err =>{
        res.status(500).json({
            error:err,
            message:"Error : Login Failed"
        });
    });
});

// get Admin by ID
router.get('/:id',(req,res,next)=>{
    const u = req.params.id;
    adminModel.find({_id:u}).exec().then(doc =>{
        console.log(doc);
        if(doc.length>0){
        res.status(200).json({
            message:"Admin found",
            doc:doc[0]
        });
        }
        else{
            res.status(404).json({message:'No Admin found'});
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:err});
    });
});

module.exports = router;