import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Please add a username"],
        unique:true,
    },
    email:{
        type:String,
        required:[true, "Please add a email"],
        unique:true,
        trim:true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid emaial",
          ],
    },
    password:{
        type:String,
        required:[true, "Please add a password"],
    },
    profilePicture:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    isAdmin: {
        type: Boolean,
        default: true,
      },
    isMod: {
        type: Boolean,
        default: false,
      },
},{timestamps:true});

const User=mongoose.model('User', userSchema);

export default User;