const nodemailer = require('nodemailer');
const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;
const transporter = nodemailer.createTransport({ host: EMAIL_HOST, port: EMAIL_PORT, secure: false, auth: { user: EMAIL_USER, pass: EMAIL_PASS } });
async function sendEmail({ to, subject, html }) { await transporter.sendMail({ from: EMAIL_USER, to, subject, html }); }
module.exports = { sendEmail };