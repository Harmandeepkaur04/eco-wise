const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configure the email transport using environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.user,
    pass: functions.config().gmail.pass,
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
