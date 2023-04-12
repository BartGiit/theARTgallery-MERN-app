import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface TokenInterface extends mongoose.Document {
    tokenName: string; 
    tokenCollection: string; 
    status?: any;
    creator: mongoose.Schema.Types.ObjectId;
  };

export const tokenSchema = new Schema({
    tokenName: {
        type: String,
        required: true,
    },
    tokenCollection: {
        type: String,
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

const Token = mongoose.model<TokenInterface>("Token", tokenSchema);
export default Token;