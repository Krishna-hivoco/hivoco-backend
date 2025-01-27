import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.POLICY_SMTP_USER,
    pass: process.env.POLICY_SMTP_PASSWORD,
  },
});

export default async function sendmail(msg) {
  await transporter.sendMail({
    from: '"HiVoco Tech Studios" <krishna@hivoco.com>',
    to: msg.to,
    subject: msg.subject,
    html: msg.html,
  });
}
