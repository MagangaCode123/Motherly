
const express = require('express')
const {createBooking, updateBooking,getAllAppointments } = require('../controllers/bookingControllers')


const router = express.Router()

router.get('/all-appointments',getAllAppointments)
router.post('/create-appointment', createBooking)

router.patch('/update-appointment/:id', updateBooking)





module.exports = router

