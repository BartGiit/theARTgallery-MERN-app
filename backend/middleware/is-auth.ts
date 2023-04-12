import { Response, NextFunction } from 'express';
import * as jwt from "jsonwebtoken";

export async function isAuth(req:any, res:Response, next: NextFunction) {
    const authHeader:any = req.get("Authorization");
    if(!authHeader){
        const error:any = new Error("Not authenticated.");
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken:any;
    try {
        decodedToken = jwt.verify(token, "uyifUIyuFYIOUfo68FDFfF687");
    }catch (err){
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken){
        const error:any = new Error("Not authenticated.");
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};