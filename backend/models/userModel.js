const mongoose = require('mongoose');


const emergencyContactSchema = new mongoose.Schema({
    name: {
        type: String,
      
    },
    phone: {
        type: String,
      
    },
    relation: {
        type: String,
     
    }
});

const obstetricHistorySchema = new mongoose.Schema({
    previousPregnancies: [{
        pregnancyNumber: {
            type: Number,
            
        },
        outcome: {
            type: String,
            enum: ['Live Birth', 'Miscarriage', 'Stillbirth'],
            
        },
        complications: {
            type: [String],
            default: []
        }
    }]
});

const babyInformationSchema = new mongoose.Schema({
    bloodType: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    },
    weightAtBirth: {
        type: String
    },
    heightAtBirth: {
        type: String
    },
    status: {
        type: String,
        enum: ['Healthy', 'Premature', 'Jaundice', 'Other'],
        default: 'Healthy'
    },
    vaccinationSchedule: [{
        vaccineName: String,
        scheduledDate: Date,
        status: {
            type: String,
            enum: ['Scheduled', 'Administered', 'Missed']
        }
    }],
    milestones: [{
        milestone: String,
        ageInMonths: Number,
        date: Date
    }],
    medicalConditions: [{
        type: String
    }],
    feedingMethod: {
        type: String,
        enum: ['Breastfeeding', 'Formula Feeding', 'Mixed Feeding'],
        default: 'Breastfeeding'
    }
});

const pregnancyDetailsSchema = new mongoose.Schema({
    pregnancyStatus: {
        type: String,
        enum: ['Pregnant', 'Not Pregnant', 'Postnatal'],
       
    },
    estimatedDueDate: {
        type: Date
    },
    pregnancyNumber: {
        type: Number,
  
    },
    trimester: {
        type: String,
        enum: ['1st', '2nd', '3rd'],
    
    },
    lastMenstrualPeriod: {
        type: Date
    },
    bloodType: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    },
    medicalConditions: [{
        type: String
    }],
    allergies: [{
        type: String
    }],
    obstetricHistory: obstetricHistorySchema,
    immunizations: [{
        type: String
    }],
    prenatalSupplements: [{
        type: String
    }],
    familyHistory: [{
        type: String
    }]
});

const configSchema = new mongoose.Schema({
    profile: {
        type: [String],
        enum: ['Antenatal care', 'Postnatal care', 'Continued care and child development tracking'],
        default: ['Antenatal care']
    },
    pregnancyDetails: pregnancyDetailsSchema,
    babyInformation: babyInformationSchema
});

const userModel = mongoose.model('User', new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    address: {
        county: {
            type: String,
            required: true
        },
        ward: {
            type: String,
            required: true
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    emergencyContacts: [emergencyContactSchema],
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    config: configSchema,
    password: {
        type: String,
        required: true
    }
}));

module.exports = userModel;
