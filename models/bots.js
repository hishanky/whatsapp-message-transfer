var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
var Bots = new Schema({
  BotName: {
    type: String,
    required: [true, "Bot Name"],
  },
  Url: {
    type: String,
    unique: [true, "url already exists in database!"],
    lowercase: true,
    trim: true,
    required: [true, "url not provided"],
  },
});
module.exports = mongoose.model("Bots", Bots);
