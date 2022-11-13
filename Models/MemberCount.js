const { model, Schema } = require('mongoose')

let membercountSchema = new Schema({
    Guild: String,
    Channel: String,
    Member: String
})

module.exports = model('MemberCount', membercountSchema)