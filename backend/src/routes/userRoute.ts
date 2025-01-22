import express, {Request, Response} from "express";
import {UserController} from "../controllers/userController";

const UserRoute = express.Router();

UserRoute.post("/create", UserController.create);
UserRoute.get("/get/:id", UserController.get);
export default UserRoute;
