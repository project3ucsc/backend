const mongoose = require('mongoose')

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    city: {
        type: String
    }
})


module.exports = mongoose.model('Student', StudentSchema)