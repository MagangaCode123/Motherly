
const mongoose = require('mongoose')

/**
 * 
 * first they book the date
 */


const bookingSchema = mongoose.Schema({

    scheduledAt:{
        type: String,
        required: true
    },
    consultationType:{
        type: [String],
        enum: ['Antenatal care', 'Postnatal care', 'Continued care and child development tracking', 'Other'],
        default: ['Antenatal care']
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Health Center',
    },

}, {timestamps: true})



module.exports = mongoose.model('Booking', bookingSchema)
