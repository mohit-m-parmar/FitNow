const mongoose = require('mongoose');

const trainerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required: true},
    photo: {type:String},
    city: {type:String, required: true},
    gender: {type:String, required: true},
    email: {type:String, required: true,unique: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    age: {type:Number, required: true},
    specialization: {type:String, required: true},
    ph_no: {type:String, required: true},
    password: {type:String, required: true},
    likes: {type:Number},
    dislikes: {type:Number}
});

module.exports = mongoose.model('TrainerDB',trainerSchema);