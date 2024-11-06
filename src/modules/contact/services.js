import sendmail from "../../helper/commonFunction.js";
import Contact from "./model.js";
const insertContactDetals = async (data, image) => {
  const mailOptions = {
    to: "pritesh@hivoco.com",
    subject: "New Contact Form Submission from Hivoco Tech Studio",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Form Submission</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f7fafc; margin: 0; padding: 0;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
    <!-- Gradient Header -->
    <tr>
      <td style="background: linear-gradient(to right, #3b82f6, #ef4444); padding: 20px; text-align: center;">
        <h2 style="color: #ffffff; font-size: 24px; margin: 0;">New Contact Form Submission</h2>
      </td>
    </tr>

    <!-- Main Content -->
    <tr>
      <td style="padding: 20px;">
        <p style="font-size: 14px; color: #718096; text-align: center; margin: 0;">
          Hello, Hivoco Tech Studio team!
        </p>
        <p style="font-size: 14px; color: #4a5568; text-align: center; margin: 0;">
          A visitor has submitted a new inquiry through the website contact form. Here are the details:
        </p>

        <!-- Contact Details -->
        <h3 style="font-size: 18px; color: #1a202c; margin-top: 20px; margin-bottom: 10px; text-align: center;">Contact Details</h3>
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px; text-align: center;">
          <tr>
            <td style="font-size: 14px; color: #4a5568; padding: 5px 0;"><strong>Name:</strong> Krishna</td>
          </tr>
          <tr>
            <td style="font-size: 14px; color: #4a5568; padding: 5px 0;"><strong>Email:</strong> krishna@hivoco.com</td>
          </tr>
          <tr>
            <td style="font-size: 14px; color: #4a5568; padding: 5px 0;"><strong>Message:</strong></td>
          </tr>
          <tr>
            <td style="font-size: 14px; color: #4a5568; padding: 5px 0;">Here is the message</td>
          </tr>
        </table>

        <p style="font-size: 14px; color: #4a5568; text-align: center;">
          You can follow up with Krishna directly by replying to this email or accessing the full message in the admin dashboard.
        </p>

        <!-- Gradient Button -->
        <div style="text-align: center;">
         <a href="https://hivoco.com" 
   style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; text-decoration: none; background: linear-gradient(to right, #3b82f6, #ef4444); border-radius: 5px; text-align: center; font-weight: bold;">
   Go to Admin Dashboard
</a>

        </div>

        <p style="font-size: 14px; color: #718096; text-align: center; margin-top: 20px;">
          For further details, please visit the admin dashboard.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #f7fafc; padding: 10px; text-align: center;">
        <p style="font-size: 12px; color: #a0aec0; margin: 0;">Hivoco Tech Studio &copy; ${new Date().getFullYear()}</p>
      </td>
    </tr>
  </table>
</body>
</html>
`,
  };
  if (image) {
    data = { ...data, image: image };
  } else {
    data = { ...data };
  }

  const insert = await new Contact(data).save();
  await sendmail(mailOptions);
  return insert;
};

const contactService = {
  insertContactDetals,
};

export default contactService;
