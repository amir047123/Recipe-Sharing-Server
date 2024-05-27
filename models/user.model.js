const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    email: {
      type: String, 
    },
    img: {
      type: String,
      default: "",
    },
    name: {
      type: String,
    },
    coin: {
      type: Number,
    },
   
    macAddress: Array,
    deviceName: Array,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
