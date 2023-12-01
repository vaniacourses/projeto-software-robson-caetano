import { Router } from "express";
import { userRouter } from "./userRoutes";
import { roomRouter } from "./roomRouter";
import { sessionRouter } from "./sessionRoutes";

export const router = Router();

router.use("/users", userRouter);
router.use("/rooms", roomRouter);
router.use("/sessions", sessionRouter);
