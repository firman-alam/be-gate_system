const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  rfid: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  expired_time: { type: Date, required: true },
})

module.exports = mongoose.model("User", userSchema)
