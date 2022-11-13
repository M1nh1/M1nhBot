const { model, Schema } = require('mongoose')

let verifySchema = new Schema({
    Guild: String,
    Role: String
})

module.exports = model('verify', verifySchema)