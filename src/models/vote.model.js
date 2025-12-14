import mongoose  from "mongoose";
const voteSchema = new mongoose.Schema(
{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true}
},
{timestamps: true}
);

voteSchema.index({user : 1, product: 1 }, {unique: true});

const vote = mongoose.model("Vote", voteSchema);
export default vote;