import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../error/AppError";
import { TLoginUser, TUser } from "./User.interface";
import { User } from "./User.model";
import jwt from "jsonwebtoken";


const createUserIntoDB = async(payload: TUser) => {
    const result = await User.create(payload);

    return result;
};

const loginUser = async(payload: TLoginUser) => {
    const user = await User.isUserExistByEmail(payload.email);
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, "User not found")
    };

    const isPasswordMatch = await User.isPasswordMatched(payload.password, user?.password);
    if(!isPasswordMatch){
        throw new AppError(httpStatus.UNAUTHORIZED, "Password doesn't match")
    }

    const jwtPayload  = {
        email: user?.email,
        role: user?.role
    };

    const accessToken = jwt.sign(jwtPayload, config.access_token_secret as string, {expiresIn: "1d"});

    return {accessToken, user};
}

export const UserServices = {
    createUserIntoDB,
    loginUser
}