const { model, Schema } = require('mongoose')

let premiumguildSchema = new Schema({
    Guild: String,
    Expire: Number,
    Permanent: Boolean,
    Date: String
})

module.exports = model("premium-guild", premiumguildSchema)