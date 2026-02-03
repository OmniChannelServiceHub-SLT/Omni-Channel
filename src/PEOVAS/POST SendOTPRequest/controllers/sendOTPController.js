const CommunicationMessage = require('../models/CommunicationMessage');

exports.sendOTP = async (req, res) => {
  try {
    // 1. Destructure incoming Postman request fields
    const { requestType, requestPeriod, otpSource, otpContact } = req.body;

    // 2. Map to TMF681 CommunicationMessage Model
    const newMessage = new CommunicationMessage({
      type: 'OTP',
      state: 'Initial',
      content: `Your OTP code is ${Math.floor(100000 + Math.random() * 900000)}`, // Logic to generate OTP
      receiver: [{
        // Mapping 'otpContact' based on source
        email: otpSource === 'EMAIL' ? otpContact : undefined,
        phoneNumber: otpSource === 'MOBILE' ? otpContact : undefined,
        mediumType: otpSource // Maps 'otpSource'
      }],
      characteristic: [
        { name: 'requestType', value: requestType },
        { name: 'requestPeriod', value: requestPeriod.toString() }
      ]
    });

    // 3. Save to Database
    const savedMessage = await newMessage.save();

    // 4. Respond with TMF standard structure
    res.status(201).json(savedMessage);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};