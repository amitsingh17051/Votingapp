const mongoose = require("mongoose");


const votingSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please fill your name"],
    },
    polls: [],
  });



  
const Voting = mongoose.model("Voting", votingSchema);
module.exports = Voting;