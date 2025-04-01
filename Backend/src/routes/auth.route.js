import express from "express";
import { checkUser, login, logout, signup, updateProfile } from "../controller/auth.controller.js";
import { protectedUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.put("/update-profile", protectedUser, updateProfile)

router.get("/check-user", protectedUser, checkUser)

export default router;
