import authModel from "../auth/model.js";
import PolicyModel from "./model.js";
import sendEmail from "../../helper/sendEmail.js"


const addPolicy = async (auth_id, policies) => {
  const policy = await new PolicyModel({ auth_id, policies }).save();

  return policy ;
};

const updatePolicy = async (auth_id, policyData) => {
  const { policyName, checked } = policyData;

  const authData = await authModel.findById(auth_id);

  // Find the policy document for the given user
  const policyDoc = await PolicyModel.findOne({ auth_id });

  if (!policyDoc) {
    throw new Error("Policy document not found for the user.");
  }

  // Check if the policy already exists
  const existingPolicy = policyDoc.policies.find(
    (policy) => policy.policyName === policyName && policy.checked === checked
  );

  if (existingPolicy) {
    return { message: "Policy already exists.", policies: policyDoc.policies };
  }

  // Add the new policy
  policyDoc.policies.push({ policyName, checked });
  await policyDoc.save();

   const msg = {
     to: authData.email,
     subject: "Confirmation of Acceptance of Company Policies",
     html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation of Acceptance</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 40px auto;
            border: 1px solid #e1e2e3;
        }
        .header {
            text-align: center;
            padding: 10px;
            background-color: #0073e6;
            color: #ffffff;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .content {
            padding: 20px;
            text-align: left;
        }
        .content h1 {
            font-size: 24px;
            color: #333333;
        }
        .content p {
            font-size: 16px;
            color: #666666;
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #999999;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Confirmation of Acceptance of Company Policies</h2>
        </div>
        <div class="content">
            <h1>Dear ${authData.name},</h1>
            <p>We hope this message finds you well.</p>
            <p>As part of our commitment to ensuring a transparent and professional work environment, we kindly request you to review and acknowledge the acceptance of our company's policies.</p>
            <p>Please find the attached document outlining the updated policies. Kindly review them carefully and confirm your acceptance by replying to this email with the following statement:</p>
            <blockquote>
                "I, ${
                  authData.name
                }, have read and understood the company policies outlined in the document, and I acknowledge my acceptance of the same."
            </blockquote>
            <p>If you have any questions or require further clarification, please do not hesitate to reach out.</p>
            <p>We appreciate your cooperation and adherence to these guidelines, which are essential in maintaining a productive and compliant workplace.</p>
            <p>Best Regards,<br>${authData.name}<br>HiVoco Tech Studios<br>${
       authData.email
     }</p>
        </div>
        <div class="footer">
            <p>© ${new Date().getFullYear()} HiVoco Tech Studios. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`,
   };

   await sendEmail(msg)

  return {
    message: "Policy added successfully.",
    policies: policyDoc.policies,
  };
};

const listOfEmployee = async (user) => {
  if (user.role !== "admin") {
    throw createError(
      StatusCodes.UNAUTHORIZED,
      "Only admin can access employee list"
    );
  }
  const users = await authModel.find({ role: "employee" }, "-password");
  return users;
};
const infoOfEmployee = async (user, auth_id) => {
  if (user.role !== "admin") {
    throw createError(
      StatusCodes.UNAUTHORIZED,
      "Only admin can access info of  an employee"
    );
  }
  const info = await PolicyModel.findOne({auth_id});
  return info;
};

const policyService = {
  addPolicy,
  updatePolicy,
  listOfEmployee,
  infoOfEmployee,
};

export default policyService;
