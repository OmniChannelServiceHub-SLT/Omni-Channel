const OTPRequest = require('../models/otpModel');
const { v4: uuidv4 } = require('uuid');

exports.sendOTP = async (req, res) => {
  try {
    const { contactMedium } = req.body;

    // Correctly extracting the phoneNumber from the TMF structure 
    const phoneNumber = contactMedium && contactMedium[0] ? contactMedium[0].phoneNumber : null;

    if (!phoneNumber) {
      return res.status(400).json({ 
        error: "contactMedium[0].phoneNumber is mandatory" 
      });
    }

    const taskId = uuidv4();
    
    const newOTPRequest = new OTPRequest({
      id: taskId,
      href: `/tmf-api/otpManagement/v1/sendOTP/${taskId}`,
      '@type': 'OTPRequest',
      '@baseType': 'Task',
      contactMedium: [{
        '@type': 'PhoneContactMedium',
        contactType: 'mobile',
        phoneNumber: phoneNumber // MSISDN input
      }],
      otp: Math.floor(100000 + Math.random() * 900000).toString(),
      status: 'initialized'
    });

    const savedRequest = await newOTPRequest.save();
    
    // TMF standard returns 201 for POST operations [cite: 133, 219]
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};