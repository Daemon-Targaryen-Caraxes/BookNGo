import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bookngowebsite@gmail.com',
    pass: 'aazv uvdb afct aihk',
  },
});

const SendMail = async (to, subject, text) => {
  const mailOptions = {
    from: 'bookngowebsite@gmail.com',
    to: to,
    subject: subject,
    text: text,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", result.response);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default SendMail;
