import dotenv from "dotenv";
import { Response } from "express";
import { IUser } from "../models/user.model";
import { redis } from "./redis";

dotenv.config();

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | undefined | "none";
  secure?: boolean;
}

//parse Environment variable to intergrated with fallback values

const accessTokenExpire = parseInt(
  process.env.ACCESS_TOKEN_EXPIRE || "300",
  10
);
const refreshTokenExpire = parseInt(
  process.env.REFRESH_TOKEN_EXPIRE || "1200",
  10
);

// options for cookies
export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + accessTokenExpire*60*60*1000), // --> 5*60*60*1000 -> 5 Minutes
  maxAge: accessTokenExpire* 60 * 60 *1000,
  httpOnly: true,
  sameSite: "none",
  secure:true,
};

export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 *1000), 
  maxAge: refreshTokenExpire*24*60*60*1000,
  httpOnly: true,
  sameSite: "none",
  secure:true,
};

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignAccessToken();
  const refreshToken = user.SignRefreshToken();

  // upload the session to redis when user login
  redis.set(user._id, JSON.stringify(user) as any);


  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
