import nodemailer from 'nodemailer';
import 'dotenv/config';

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS 
    }
});

const sender = `"Streamify ChatApp" <${process.env.EMAIL_USER}>`;

export { transporter, sender };
