const mongoose = require("mongoose")
const tagSchema = new mongoose.Schema({
  name: { type: String, unique: true, trim: true, lowercase: true },
});
const Tags = mongoose.model("Tags", tagSchema);

module.exports = Tags;

