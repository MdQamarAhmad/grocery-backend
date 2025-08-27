import mongoose from "mongoose";

const grocerySchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const Grocery = mongoose.model("Grocery", grocerySchema);

export default Grocery;
