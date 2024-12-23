import nodemailer from "nodemailer";
import 'dotenv/config'

export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ETHERAL_EMAIL,
    pass: process.env.ETHERAL_PASSWORD,
  },
});
