import { Router, Request, Response } from "express";
import {
  userLoggin,
  createUser,
  verifyToken,
} from "../Controllers/userController";
import * as multer from "multer";
import { authenticated } from "../middleware/authenticated";

import uploads from "../config/multer";

const router: Router = Router();
router.post("/login", userLoggin);
router.post("/create/user", uploads.single("ImageUser"), createUser);
router.get("/verifyToken", authenticated, verifyToken);

export const Routers: Router = router;
