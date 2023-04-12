import { Response, Request, NextFunction } from 'express';
import { DocumentType } from "@typegoose/typegoose";
import Token from "../models/token.js";
import User from "../models/user.js";

interface ReqBody {
    tokenName: string;
    tokenCollection: string;
  }

export async function addToken(req:Request, res:Response, next:NextFunction) {
    const {tokenName, tokenCollection} = req.body as ReqBody;
    const { userId }:any = req;
    let creator:any;
    const token = new Token({
        tokenName: tokenName,
        tokenCollection: tokenCollection,
        creator: userId,
    });
    
    //add token
    
    token
    .save()
    .then(result => {
        User.findById(userId);
    })
    .then((user: DocumentType<any>) => {
        creator = user;
        user.tokens.push(token);
        return user.save();
    })
    .then(result => {
        res.status(201).json({
            message: "Token added successfully",
            token: token,
            creator: {_id: creator._id, login: creator.login}
        });
    }).catch(err => {
        console.log(err);
    })
};

