const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String, required: true},
    gender: {type:String, required: true},
    email: {type:String, required: true,unique: true, pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    age: {type:Number, required: true},
    ph_no: {type:String, required: true},
    password: {type:String, required: true},
    pref: {type:String}
});

module.exports = mongoose.model('TraineeDB',userSchema);