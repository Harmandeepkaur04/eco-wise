import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import sgMail from "@sendgrid/mail";
import cors from "cors";

admin.initializeApp();
sgMail.setApiKey(functions.config().sendgrid.key); // Load API key from environment variables

const corsHandler = cors({ origin: true });

export const sendInvite = functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    const { email } = req.body;

    const msg = {
      to: email,
      from: "your-email@example.com",
      subject: "Join our Recycling Community!",
      text: `Hi there! Your friend invited you to join our recycling community.
        Sign up here: https://yourwebsite.com/signup?referral=uniqueID`,
    };

    sgMail
      .send(msg)
      .then(() => {
        res.status(200).send("Invite sent!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        res.status(500).send(error.toString());
      });
  });
});
