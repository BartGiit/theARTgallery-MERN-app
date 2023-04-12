import express from "express";
import * as displayController from "../controllers/display.js";
import { isAuth } from "../middleware/is-auth.js";

export const routerDisplay = express.Router();

//GET /display/token

routerDisplay.get('/', isAuth ,displayController.displayTokens);

//DELETE /display/:tokenId

routerDisplay.delete('/:tokenId', isAuth ,displayController.deleteToken);