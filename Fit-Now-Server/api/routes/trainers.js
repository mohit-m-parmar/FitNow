const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const trainerModel = require('../models/trainers');

/**
 *  Status code : 200 -> Success.
 *  Status code : 404 -> Not found.
 *  Status code : 500 -> Server Error.
 */

// this API will fetch all trainers from the mongoDB collection (trainerdbs).
router.get('/',(req,res,next)=>{
    trainerModel.find().exec().then(doc => {
        console.log(doc)
        if(doc.length>0){
            return res.status(200).json({
                doc:doc,
                message:"list of Trainer recieved"
            });
        }
        else{
            res.status(404).json({message:'No trainer found'});
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({error:err})
    })
});

//  this API will register trainer inside the MongoDB collection (trainerdbs).
router.post('/signup',(req,res,next)=>{
    trainerModel.find({email: req.body.email}).exec().then(train => {
        if(train.length > 0){
            return res.status(409).json({
                message: "Email already exist"
            }); 
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({
                        error: err,
                        message:"Error : bvrypt error"
                    });
                }
                else{
                    let picture = "";
                    if(!req.body.photo || req.body.photo.length<5){
                        picture = `https://robohash.org/${req.body.email}?set=set2&size=500x500&bgset=bg1`;
                    }
                    else{
                        picture = req.body.photo;
                    }
                    const Trainer = new trainerModel({
                        _id: new mongoose.Types.ObjectId(),
                       name: req.body.name,
                       ph_no: req.body.ph_no,
                       email: req.body.email,
                       age: req.body.age,
                       gender: req.body.gender,
                       city: req.body.city,
                       password: hash,
                       photo: picture,
                       specialization: req.body.specialization,
                       likes:0,
                       dislikes:0
                       });
                       Trainer.save().then(result =>{
                           console.log(result);
                           res.status(200).json({
                               message:"trainer registered successfully",
                               createdTrainer: Trainer
                           });
                       }).catch(err =>{ 
                       console.log(err);
                       res.status(500).json({
                           error:err,
                           message:"Unable to register trainer"
                        });
                       });
                }
            });
        }
    }).catch();
  
});

//  this API will update trainer profile inside MongoDB collection (trainerdbs).
router.patch('/:id',(req,res,next)=>{
    const u = req.params.id;
    arr=req.body;
    let updateOps={};
    obj=arr
    console.log(obj)
    for (var key in obj){

        if(obj[key].length>0){updateOps[key]=obj[key]}
    }
    if(!updateOps.photo || updateOps.photo.length<5){
        updateOps.photo=`https://robohash.org/${u}?set=set2&size=500x500&bgset=bg1`;
    }
    trainerModel.update({ _id:u },{ $set: updateOps }).exec().then(doc =>{
            if(doc.n===1){
                trainerModel.find({_id:u}).exec().then(doc =>{
                    console.log(doc);
                    res.status(200).json({
                        message:"Trainer updated",
                        new:doc[0]
                    });
                }).catch(err=>{
                    console.log(err);
                    res.status(500).json({error:err,message:"Error in fetching upadated trainer data"});
                });
            }
        }).catch(err =>{
            res.status(500).json({error:err,message:"Error"});
        });
});


//  this API will Authenticate trainer based on the emailID and password.
router.post('/login',(req,res,next)=>{
    trainerModel.find({email: req.body.email}).exec().then(trainer => {
        if(trainer.length < 1){
            res.status(404).json({
                message:"Email does not exist."
            });
        }
        else{
            bcrypt.compare(req.body.password,trainer[0].password,(err,data)=>{
                if(err){
                    return res.status(401).json({
                        error:err,
                        message:"Trainer Login Unsuccessful"
                    });
                }
                if(data){
                    const token = jwt.sign({
                        id: trainer[0]._id
                      }, 'thekeything', { expiresIn: '1h' });
                    return res.status(200).json({
                        message:"Trainer Login Succesful",
                        token:token,
                        user: trainer[0]
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


//  this API will delete trainer from the MongoDB collection (trainerdbs).
router.delete('/:id',(req,res,next)=>{
    trainerModel.remove({_id:req.params.id}).exec().then(doc =>{
        if(doc.n>0){
            return res.status(200).json({
                message:"Trainer deleted successfully",
            });
        }
        else {
            return res.status(200).json({
                message:"No trainer found to delete",
            });
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            message:"Error while Deleting trainer",
            error:err
        });
    });
}); 

//  this API will fetch the trainer profile on the basis of id from the MongoDB collection (trainerdbs).
router.get('/:id',(req,res,next)=>{
    const u = req.params.id;
    trainerModel.find({_id:u}).exec().then(doc =>{
        console.log(doc);
        if(doc.length>0){
        res.status(200).json({
            message:"Trainer found",
            doc:doc[0]
        });
        }
        else{
            res.status(404).json({message:'No trainer found'});
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:err});
    });
});

// Need to create API for like functionality.


// this API will update the count of like for the trainer.
router.patch('/like/:id/:i',(req,res,next)=>{
    const i = req.params.i;
    trainerModel.update({ _id:req.params.id },{ $inc:{likes: i} }).exec().then(doc =>{
        if(doc.n===1){
            trainerModel.find({_id:req.params.id}).exec().then(doc =>{
                console.log(doc);
                res.status(200).json({
                    message:"liked",
                    likes:doc[0].likes
                });
            }).catch(err=>{
                console.log(err);
                res.status(500).json({error:err,message:"error in fetching modified data"});
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            message:"liking error",
            error:err
        });
    });
});

// this API will update the count of dislike for the trainer.
router.patch('/dislike/:id/:i',(req,res,next)=>{
    const i = req.params.i;
    trainerModel.update({ _id:req.params.id },{ $inc:{dislikes: i} }).exec().then(doc =>{
        if(doc.n===1){
            trainerModel.find({_id:req.params.id}).exec().then(doc =>{
                console.log(doc);
                res.status(200).json({
                    message:"disliked",
                    dislikes:doc[0].dislikes
                });
            }).catch(err=>{
                console.log(err);
                res.status(500).json({error:err,message:"error in fetching modified data"});
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            message:"disliking error",
            error:err
        });
    });
});



module.exports = router;