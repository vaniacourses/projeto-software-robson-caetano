import { Router } from "express";
import { userRouter } from "./userRoutes";
import { roomRouter } from "./roomRouter";

export const router = Router();

router.use("/users", userRouter);
router.use("/rooms", roomRouter);
