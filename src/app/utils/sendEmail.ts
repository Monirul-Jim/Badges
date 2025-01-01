import nodemailer from "nodemailer";
import config from "../config/config";
export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.node_env === "production", // true for port 465, false for other ports
    auth: {
      user: config.user_email,
      pass: config.user_password,
    },
  });
  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  await transporter.sendMail({
    from: config.user_email, // sender address
    to, // list of receivers
    subject: "Reset your password within 10 minutes", // Subject line
    text: "Reset your password", // plain text body
    html, // html body
  });

  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};
