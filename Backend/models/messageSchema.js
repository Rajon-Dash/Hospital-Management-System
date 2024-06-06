import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required: true,
            minLength:[3,"First name must contain  al least 3 characters"]
        },
        lastName:{
            type:String,
            required: true,
            minLength:[3,"First name must contain  al least 3 characters"]
        },
        email:{
            type:String,
            required: true,
            validator:[validator.isEmail,"Please provied valid email "]
        },
        phone:{
            type:String,
            required: true,
            minLength:[11,"Phone number most contain 11 digit"],
            maxLength:[11,"Phone number most contain 11 digit"]

        },
        message:{
            type:String,
            required: true,
            minLength:[10,"message must contain  at least 10 charaacters"],

        },
    }
);


export const Message  = mongoose.model("Message",messageSchema)