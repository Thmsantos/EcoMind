import nodemailer from "nodemailer";
import 'dotenv/config'

export const transporter = nodemailer.createTransport({
  service: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});