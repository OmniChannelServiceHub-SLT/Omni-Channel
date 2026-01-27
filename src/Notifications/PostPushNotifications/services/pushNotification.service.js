const CommunicationMessage = require('../models/communicationMessage.model');
const { v4: uuidv4 } = require('uuid');

async function processPushNotification(payload) {
  const {
    accountNo,
    billMonth,
    BillCode,
    BillMode,
    email,
    mobile,
    NotType
  } = payload;

  const communicationMessage = new CommunicationMessage({
   
    messageType: 'Push',
    subject: NotType,
    category: BillCode,
    content: `Bill Month: ${billMonth}, Bill Mode: ${BillMode}`,
    sendTime: new Date(),
    relatedEntity: [{
      "@type": "Account",
      id: accountNo
    }],
    receiver: [{
      role: 'recipient',
      contactMedium: [
        email ? {
          "@type": "EmailContactMedium",
          emailAddress: email
        } : null,
        mobile ? {
          "@type": "TelephoneContactMedium",
          phoneNumber: mobile
        } : null
      ].filter(Boolean)
    }],
    channel: {
      "@type": "PushChannel",
      name: BillMode
    }
  });

  // Persist TMF resource
  await communicationMessage.save();

  // TODO: Integrate push provider (FCM/APNs)
  // await pushAdapter.send(communicationMessage);

  return communicationMessage;
}

module.exports = {
  processPushNotification
};
