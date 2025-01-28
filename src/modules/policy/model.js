import mongoose from "mongoose";
const { Schema } = mongoose;

const policySchema = new Schema(
  {
    auth_id: { type: Schema.Types.ObjectId, ref: "Auth", required: true }, // Replace 'User' with the name of your referenced model
    policies: [
      {
        policyName: { type: String, required: true,trim:true }, // Define the structure of the object
        checked:{type:Boolean, default: false}
      },
    ],
  },
  { timestamps: true }
);

const PolicyModel = mongoose.model("Policy", policySchema);
export default PolicyModel;
