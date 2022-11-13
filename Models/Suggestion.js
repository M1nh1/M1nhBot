const { model, Schema } = require('mongoose')

let suggestionSchema = new Schema({
    GuildID: String,
    MessageID: String,
    Details: Array
})

module.exports = model("Suggestion", suggestionSchema)