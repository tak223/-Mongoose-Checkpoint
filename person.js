let mongoose = require("mongoose");
let validator = require("validator");
let personSchema = new mongoose.Schema({
  name: {
    type :String,
    required: true
},
  age:{
   type: Number,
    default:0000,
  },

  favoriteFoods: [{type: String}],
});
module.exports = mongoose.model("Person", personSchema);
