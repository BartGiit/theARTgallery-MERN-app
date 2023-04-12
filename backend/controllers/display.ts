import { Response, Request, NextFunction } from 'express';
import { DocumentType } from "@typegoose/typegoose";
import Token from "../models/token.js";
import User from '../models/user.js';

export async function displayTokens(req:Request, res:Response, next: NextFunction) {
    const { userId }:any = req;
    //get tokens
    Token.find({creator: userId})
    .then(tokens => {
        res
        .status(200)
        .json({
            tokens: tokens
       });
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
};

export async function deleteToken(req:Request, res:Response, next: NextFunction) {
    const tokenId = req.params.tokenId;
    const { userId }:any = req;
    //remove token
    Token.findById(tokenId)
    .then(token => {
        if (!token){
            const error:any = new Error("Couldn't find the token");
            error.statusCode = 404;
            throw error;
        }
        if(token.creator.toString() !== userId){
            const error:any = new Error("Not authorized!");
            error.statusCode = 403;
            throw error
        }
        return Token.findByIdAndRemove(tokenId);
    })
    .then(result => {
        return User.findById(userId);
    })
    .then((user: DocumentType<any>) => {
        user.tokens.pull(tokenId);
        return user.save();
    })
    .then(result => {
        res.status(200).json({message: "Token Deleted"});
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

};

