import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

export const sendContactMail = async (req, res) => {
  try {

    const { name, email, phone, message } = req.body;

    // SAVE TO DB
    await Contact.create({ name, email, phone, message });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Message",
      html: `
        <h3>New Contact Form</h3>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Message: ${message}</p>
      `,
    });

    res.status(200).json({ message: "Success" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed" });
  }
};