const {model, Schema} = require('mongoose')

let welcomeSchema = new Schema({
    Guild: String,
    Channel: String,
    Message: String,
    Background: String
});

module.exports = model("Welcome", welcomeSchema)