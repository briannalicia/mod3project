const mongoose = require ("mongoose")

const Schema = mongoose.Schema

const LogSchema = new Schema ({
    
    date: { type: String },
    title: { type: String},
    entry: { type: String},

    

})

const Log = mongoose.model("logs", LogSchema)

module.exports = Log