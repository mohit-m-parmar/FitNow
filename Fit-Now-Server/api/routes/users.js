const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/users');

// get all trainee list
router.get('/',(req,res,next)=>{
    userModel.find().exec().then(doc => {
        console.log(doc)
        if(doc.length>0){
            return res.status(200).json({
                doc:doc,
                message:"list of Trainee retrieved"
            });
        }
        else{
            res.status(404).json({message:' No Trainee found'});
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error:err,
            message:'Error : Unable to fech trainee list '
        });
    });
});


// register trainee
router.post('/signup',(req,res,next)=>{
    userModel.find({email: req.body.email}).exec().then(train => {
        if(train.length > 0){
            return res.status(409).json({
                message: "Email already exist "
            }); 
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        message:"Unable to bcrypt",
                        error: err
                    });
                }
                else{
                    const User = new userModel({
                        _id: new mongoose.Types.ObjectId(),
                       name: req.body.name,
                       ph_no: req.body.ph_no,
                       email: req.body.email,
                       age: req.body.age,
                       gender: req.body.gender,
                       password: hash
                       });
                       User.save().then(result =>{
                           console.log(result);
                           res.status(200).json({
                               message:"Trainee Registered successfully",
                               createdUser: User
                           });
                       }).catch(err =>{ 
                       console.log(err);
                       res.status(500).json({
                           error:err,
                           message:"Error : Unable to register Trainee"
                        });
                    });
                }
            });
        }
    }).catch();
  
});

// update trainee
router.patch('/:id',(req,res,next)=>{
    const u = req.params.id;
    arr=req.body;
    const updateOps={};
    obj=arr
    console.log(obj)
    for (var key in obj){

        if(obj[key].length>0){updateOps[key]=obj[key]}
    }
    
    userModel.update({ _id:u },{ $set: updateOps }).exec().then(doc =>{
            if(doc.n===1){
                userModel.find({_id:u}).exec().then(doc =>{
                    console.log(doc);
                    res.status(200).json({
                        message:"Trainee profile updated",
                        new:doc[0]
                    });
                }).catch(err=>{
                    console.log(err);
                    res.status(500).json({error:err,message:" Unable to fetch updated trainee information "});
                });
            }
        }).catch(err =>{
            res.status(500).json([{error:err,message:" Error "}]);
        });
});


// login authentication
router.post('/login',(req,res,next)=>{
    userModel.find({email: req.body.email}).exec().then(user => {
        if(user.length < 1){
            res.status(404).json({
                message:"Email does not exist "
            });
        }
        else{
            bcrypt.compare(req.body.password,user[0].password,(err,data)=>{
                if(err){
                    return res.status(401).json({
                        error:err,
                        message:"Error : login failed "
                    });
                }
                if(data){
                    const token = jwt.sign({
                        id: user[0]._id
                      }, 'thekeything', { expiresIn: '1h' });
                    return res.status(200).json({
                        message:"Trainee Login successful",
                        user:user[0],
                        token:token
                    });
                }
                else{
                    return res.status(401).json({
                        message:"Incorrect password"
                    });
                }
            });
        }
    }).catch(err =>{
        res.status(500).json({
            error:err,
            message:"Error : Login Failed"
        });
    });
});

// delete trainee
router.delete('/:id',(req,res,next)=>{
    userModel.remove({_id:req.params.id}).exec().then(doc =>{
        if(doc.n>0){
            return res.status(200).json({
                message:"Trainee deleted successfully",
            });
        }
        else {
            return res.status(200).json({
                message:"No trainee to delete ",
            });
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            message:"Error: Unable to delete ",
            error:err
        });
    });
}); 

// get trainee by id
router.get('/:id',(req,res,next)=>{
    const u = req.params.id;
    userModel.find({_id:u}).exec().then(doc =>{
        console.log(doc);
        if(doc.length>0){
        res.status(200).json({
            message:"Trainee exist",
            user: doc[0]
        });
        }
        else{
            res.status(404).json({message:'Unable to find trainee'});
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:err});
    });
});

module.exports = router;