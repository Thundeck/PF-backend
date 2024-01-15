const { createTransport } = require("nodemailer");
require("dotenv").config();

const sendNotificationMail = async (
  subject,
  from,
  toCount,
  message = "",
  htmlMessage = ""
) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: process.env.ADMIN_MAIL,
      pass: process.env.PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: from,
    to: toCount,
    subject: subject,
    text: message,
    html: htmlMessage,
  };
  // if (file) {
  //   mailOptions.attachments = [
  //     {
  //       path: new URL(`./${file}`, import.meta.url).pathname,
  //     },
  //   ];
  // }

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = sendNotificationMail;
