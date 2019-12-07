const mongoose = require("mongoose");

var Schema = new mongoose.Schema({
    firstname: {type:String},
    lastname:{type:String},
    middlename:{type:String},
    gender:{type:Array},
    birthdate: { type: String},
    Address:{type:String},
    email: {type: String, unique:true},
    description:{type:String},
 });

 Schema.statics.addAccount = async function (student){
    var Student = new this(student);
    var result =  await Student.save(student);
    console.log(result);
    return result;
 }
 
 Schema.statics.getLastAccount = async function() {
    return await this.findOne().sort({_id:-1}).limit(1);
 }

 Schema.statics.retrieveAccount = async function(){
     return await this.find()
 }

 Schema.statics.updateAccount = async function(
    id,
    firstname,
    lastname,
    middlename,
    gender,
    birthdate,
    Address,
    email,
    description,
  ) {
    return await updateEvent.updateOne({ "_id": id }, { $set: { "firstname" : firstname, "lastname" : lastname, "middlename" : middlename, "gender":gender, "birthdate" : birthdate, "Address":Address, "email":email, "description":description } });
  };
  
  Schema.statics.deleteAccount = async function(id) {
    return await this.deleteOne({ _id: id });
  };
 
 Schema.statics.getByUsername = async function(email) {
    return await this.findOne({"email" : email});
 }

 module.exports = mongoose.model('student', Schema);