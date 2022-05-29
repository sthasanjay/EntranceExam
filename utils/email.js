const sgMail = require("@sendgrid/mail");

const sendEmail = async ({ email, subject, message }) => {
  sgMail.setApiKey(process.env.SENDGRID_KEY);
  const data = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: subject,
    text: message,
    html: message,
  };
  await sgMail.sendMultiple(data);
};

module.exports = sendEmail;
