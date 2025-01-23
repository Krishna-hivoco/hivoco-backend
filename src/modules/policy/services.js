import PolicyModel from "./model.js";



const addPolicy = async (auth_id, policies) => {
  const policy = await new PolicyModel({ auth_id, policies }).save();

  return policy ;
};

const updatePolicy = async (auth_id, policyData) => {
  const { policyName, checked } = policyData;

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

  return {
    message: "Policy added successfully.",
    policies: policyDoc.policies,
  };
};

const policyService = {
 addPolicy,
 updatePolicy
};

export default policyService;
