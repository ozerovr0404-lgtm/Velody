import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendMail = async ({
  to,
  subject,
  text,
  html,
  replyTo
}) => {
  const info = await transporter.sendMail({
    from: `"Velody Music Platform" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
    replyTo
  });

  return info;
};

transporter.verify((err, seccess) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Mail server ready");
  }
});