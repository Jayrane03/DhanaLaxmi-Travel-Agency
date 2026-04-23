import nodemailer from "nodemailer";

export const sendBookingEmail = async (booking) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"DhanaLaxmi Travel" <${process.env.EMAIL_USER}>`,
    to: booking.email, // user email
    subject: "Your Travel Booking Confirmation ✈️",

    html: `
      <h2>Booking Confirmation</h2>

      <p><strong>Name:</strong> ${booking.name}</p>
      <p><strong>Email:</strong> ${booking.email}</p>
      <p><strong>Destination:</strong> ${booking.destination}</p>
      <p><strong>Date:</strong> ${booking.date}</p>
      <p><strong>Persons:</strong> ${booking.persons}</p>
      <p><strong>Phone:</strong> ${booking.phone || "-"}</p>
      <p><strong>Message:</strong> ${booking.message || "-"}</p>

      <br/>
      <p>Thank you for booking with <b>DhanaLaxmi Travel</b> 🌍</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};