import mongoose from "mongoose";
const scoreSchema = new mongoose.Schema({
  name:{type:String, required:true},
  email:{type:String, required:true}
}, { timestamps: true });

 let score= mongoose.model("Score", scoreSchema);

export default score;
