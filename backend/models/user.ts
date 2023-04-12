import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface UserInterface extends mongoose.Document {
    login: string;
    password: string;
    status: string;
    tokens: [];
  };

export const userSchema = new Schema({
    login: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "new",
    },
    tokens: [
        {
            type: Schema.Types.ObjectId,
            ref: "Token",
        }
    ]
});

const User = mongoose.model<UserInterface>("User", userSchema);
export default User;