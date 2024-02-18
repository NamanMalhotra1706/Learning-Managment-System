import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string; // Cloudinary
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () =>string;
  SignRefreshToken:() =>string;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter you Email"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your Email"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "Please Enter a Valid Email",
      },
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 length"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: String,
      },
    ],
  },
  { timestamps: true }
);

// Hashing the Password
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Sign Acess Token // when user login, create a access token

UserSchema.methods.SignAccessToken=function(){
  return jwt.sign({id:this._id}, process.env.ACCESS_TOKEN  || '',{
    expiresIn:"5m",
  });
}

// Sign refresh token
UserSchema.methods.SignRefreshToken=function(){
  return jwt.sign({id:this._id}, process.env.REFRESH_TOKEN || '',{
    expiresIn:"7d"
  });
}


// Compare with Hash Password
UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create Model
const userModel: Model<IUser> = mongoose.model("User", UserSchema);

export default userModel;
