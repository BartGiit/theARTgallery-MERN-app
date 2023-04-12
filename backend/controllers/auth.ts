import { Response, Request, NextFunction } from 'express';
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";

interface ReqBody {
    login: string;
    password: string;
  }

export async function signUp(req:Request, res:Response, next: NextFunction) {
    const {login, password} = req.body as ReqBody;
    bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
        const user = new User({
            login: login,
            password: hashedPassword,
        });
        return user.save();
    })
    .then(result => {
        res
        .status(201)
        .json({message: "User created", userId: result._id});
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
};

export async function logIn(req:Request, res:Response, next: NextFunction) {
    const {login, password} = req.body as ReqBody;
    let loggedInUser: any;
    User.findOne({login: login})
    .then(user => {
        if(!user) {
            const error: any = new Error("User" + login + "not found");
            error.statusCode = 401;
            throw error;
        }
        loggedInUser = user;
        return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
        if (!isEqual){
            const error:any = new Error("Wrong password!");
            error.statusCode = 401;
            throw error;
        }
        const token = jsonwebtoken.sign({
            login: loggedInUser.login,
            userID: loggedInUser._id.toString()
        }, "uyifUIyuFYIOUfo68FDFfF687"
        );
        res.status(200).json({token: token, userId: loggedInUser._id.toString()});
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};