// functions/index.js
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configure the email transport using the default SMTP transport and a GMail account.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ecowiseapp@gmail.com',
    pass: 'eco-wiseapp1@gmail',
  },
});

exports.sendInviteEmail = functions.https.onCall((data, context) => {
  const { senderEmail, receiverEmail, groupName } = data;

  const mailOptions = {
    from: senderEmail,
    to: receiverEmail,
    subject: `Invitation to join ${groupName}`,
    text: `You have been invited to join the group ${groupName} by ${senderEmail}.`,
  };

  return transporter.sendMail(mailOptions)
    .then(() => {
      return { success: true };
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    });
});
