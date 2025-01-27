const mongoose = require('mongoose')
const Booking = require('../models/bookingModel')


//creating
const createBooking = async(req,res)=> {

    const fields = req.body

    console.log('fields--->',fields)


    if(!fields.scheduledAt || !fields.patient){
        res.status(400).json({message: 'Required Fields Missing '})
    }

    try{

        const newBooking = await Booking.create({...fields})

        if(!newBooking){
            res.status(400).json({message: "Error Creating new Booking"})
        }

        res.status(200).json({message: 'Appointment created succesfully!', newBooking})


    }
    catch(error){
        console.log('Error creating appointment',error)
        res.status(500).json({message: `Error creating appointment: ${error}`})
    }

}

//updating
const updateBooking = async(req,res)=>{

    const {id} = req.params

    const fields = req.body


    if (!mongoose.isValidObjectId(id)) {
        res.status(400).json({ message: "Invalid ID" });
    }

    try{

        const findAppointment = await Booking.findById(id)

        if(!findAppointment){
            res.status(400).json({ message: "Appointment does not exist" }); 
        }
        else{
          
            const updatedBooking = await Booking.findByIdAndUpdate(
                id, 
                { $set: fields }, 
                { new: true } // Return the updated document
            );
    

            res.status(200).json({message: 'Appointment Updated Succesfully', updatedBooking})
        }

        
    }
    catch (error) {
     
        res.status(500).json({ message: "An error occurred while updating the appointment", error: error.message });
    }
    
}

//fetching all Booking
const getAllAppointments =  async(req,res)=>{

    try{

        const allAppointments = await Booking.find()


        if(!allAppointments){
            res.status(400).json({message:"Could not find any appointment"})
    }
    else if(allAppointments.length === 0){
        res.status(200).json({message:"No appointments present"})
    }
    res.status(200).json({allAppointments})

}
catch(error){
    res.status(500).json({message:`Error finding appointments:${error}`})
}
}


module.exports = {
    createBooking, updateBooking,getAllAppointments 
}