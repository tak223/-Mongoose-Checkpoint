require("dotenv").config();
let person = require("./person");

console.log(process.env.MONGO_URI); //my url
let mongoose = require("mongoose");
const { deleteOne } = require("./person");
const database = "myDB"; // REPLACE WITH YOUR DB NAME
class Database {
  constructor() {
    this._connect(); //conex to data base
  }
  _connect() {
    mongoose
      .connect(`mongodb://${process.env.MONGO_URI}/${database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error");
      });
  }
}
module.exports = new Database();
let person1 = new person({
  name: "takwa",
  age: 23,
  favoriteFoods: ["choclate ", "fastfood"],
});

person1.save(function (err, data) {});
person.create([
  { name: "ali", age: 25, favoriteFoods: ["milk", "tacos"] },
  {
    name: "mohamed",
    age: 30,
    favoriteFoods: ["pizza ", "chips","burritos"],
  },
  {
    name: "salah",
    age: 15,
    favoriteFoods: ["ham ", "apple"],
  },
]);

//the find operation
person.find({ name:'salah'}).then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)})
    //the findone operation
    person.findOne({ name:'takwa'}).then(doc => {
        console.log(doc)
      })
      .catch(err => {
        console.error(err)})
    
//find by id
person.findById( '62a7b893b55c976d224b5868' ).then(doc => {
    console.log(doc)
  })
  .catch(err => {
    console.error(err)}) 



//find and update favourite food
person.findById('62a7c9297292b39c22a427c2',function(error,result){
console.log(result)
if (error) {
  return console.log(error)
    
   } else {
    result.favoriteFoods.push("potato");
    result.save((error,updatedperson)=>{
      console.log(updatedperson)
  
    })
  
   }
});

//Perform New Updates on a Document Using model.findOneAndUpdate()
const filter = { name: 'ali' };
const update = { age: 30}; 
person.findOneAndUpdate(filter, filter,(error,data)=>{},{new: true});

//Delete One Document Using model.findByIdAndRemove
var user_id = '62a7cc51d854ca97bba02e5d'; 
person.findByIdAndRemove(user_id, function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Removed User : ", docs);
    }
});

//MongoDB and Mongoose - Delete Many Documents with model.remove()
person.remove({ name: 'takwa' }, function (err, result) {
  if (err){
      console.log(err)
  }else{
      console.log("Result :", result) 
  }})

//Chain Search Query Helpers to Narrow Search Results
person.find({ favouriteFoods: "burritos" }  )                   
               
         .sort({name: 1}  )
         .limit(2)     
         .select({name: true}) 
         .exec()                  
         .then(docs => {
            console.log(docs)
          })
         .catch(err => {
            console.error(err)
          }) 