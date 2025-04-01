import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true
        },
        fullname: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true,
            minleangth: 6
        },
        picture: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model("User", userSchema);