import express from "express";
import {
  registerController,
  loginController, stuRegisterController, testController, stuLiveController,
} from "../controllers/AuthController.js";
import { requireSignIn, isAdmin } from "../middleware/AuthMiddleware.js";
import upload from "../utils/upload.js"
import { uploadImage, downloadImage } from "../controllers/image-controller.js";
//router object
const Router = express.Router();

//routing
//SIGNUP || METHOD POST
Router.post("/signup", registerController);

//LOGIN || POST
Router.post("/login", loginController);

// REGISTRATION || POST
Router.post("/register", stuRegisterController);

// test route
Router.get("/test", requireSignIn, isAdmin, testController);

// UPLOAD IMAGE
Router.post('/upload',upload.single("file") ,uploadImage)

// DOWNLOAD IMAGE
Router.get("/file/:fileId",downloadImage)

// UPDATE STUDENT
Router.patch("/student", stuLiveController)

export default Router;
