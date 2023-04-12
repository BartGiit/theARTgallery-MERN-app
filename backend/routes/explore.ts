import express from "express";
import { body } from "express-validator/check/index.js";
import { isAuth } from "../middleware/is-auth.js";

import * as exploreController from "../controllers/explore.js";

export const routerExplore = express.Router();

//POST /explore/token

routerExplore.post('/token', isAuth , [
    body("tokenName")
        .trim()
        .isLength({min: 1}),
    body("tokenCollection")
        .trim()
        .isLength({min: 1}),
],exploreController.addToken);