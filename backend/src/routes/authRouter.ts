import express from "express";
import {AuthController} from "../controllers/authController";

const AuthRouter = express.Router();
AuthRouter.post('/login', AuthController.login);

export default AuthRouter;
