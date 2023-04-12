import express from "express";
import { body } from "express-validator/check/index.js";
import User from "../models/user.js";
import * as authController from "../controllers/auth.js"

export const routerAuth = express.Router();

//PUT /auth/signupuser

routerAuth.put("/signupuser", [
    body("login")
    .custom((value, {req}) => {
        return User.findOne({login: value})
        .then(userDoc => {
            if(userDoc) {
                return Promise.reject("Login already exists!");
            }
        })
    })
    .trim()
    .isLength({min:5}),
    ],
    authController.signUp 
);

routerAuth.post("/login", authController.logIn);