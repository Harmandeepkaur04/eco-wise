/*Reference
URL:https://www.nodemailer.com/ */

import nodemailer from 'nodemailer';//API route to send email

//handle http request
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;
    console.log('Received email:', email);

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    // Email options
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Invitation to Join Our Recycling Website',
      text: 'Hi there! You are invited to join our recycling website. Click the link below to get started: https://localhost:3000/invite',
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);//wait for email to send
      console.log('Email sent successfully'); // Debugging log
      res.status(200).json({ message: 'Invitation sent successfully!' });
      
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
