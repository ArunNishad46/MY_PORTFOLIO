import express from 'express';
import cors from 'cors';
import Brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ["Content-Type"],
  }
));

app.use(express.json());

// Brevo API Configuration
const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;     

app.post('/message', async (req, res) => {
  const {name, email, subject, message} = req.body;

  if(!name || !email || !message, !subject){
    return res.status(400).json({message: 'All fields are required'});
  }

  try {
    // Send email to you
    await apiInstance.sendTransacEmail({
      sender: { name: "Arun", email: process.env.FROM_EMAIL },
      to: [{ email: process.env.FROM_EMAIL }],
      subject: subject,
      htmlContent: `
        <h3>New Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `
    });

    // Auto-reply to user
    await apiInstance.sendTransacEmail({
      sender: { name: "Arun", email: process.env.FROM_EMAIL },
      to: [{ email }],
      subject: "Thanks for contacting me!",
      htmlContent: `
        <h3>Hello ${name},</h3>
        <p>Thank you for getting in touch! We have received your message and will get back to you shortly.</p><br>
        <p>Best regards,</p>
        <strong>Arun</strong>
      `
    });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
