import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  }
));

app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: process.env.BREVO_SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS
  }
});

app.post('/message', async (req, res) => {
  const {name, email, message} = req.body;

  if(!name || !email || !message){
    return res.status(400).json({message: 'All fields are required'});
  }

  try {
    await transporter.sendMail({
      from: `Arun <${process.env.FROM_EMAIL}>`,
      to: process.env.FROM_EMAIL,
      subject: "New Portfolio Contact Submission",
      html: `
      <h3>New Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br>${message}</p>`,
    })

    await transporter.sendMail({
      from: `Arun <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: "Thanks for contacting me!",
      html: `
      <h3>Hello ${name},</h3>
      <p>Thank you for getting in touch! We have received your message and will get back to you shortly.</p><br>
      <p>Best regards,</p>
      <strong>Arun</strong>`,
    })

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});