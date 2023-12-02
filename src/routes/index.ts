import { Router } from "express";
import { userRouter } from "./userRoutes";
import { roomRouter } from "./roomRouter";
import { sessionRouter } from "./sessionRoutes";
import { productRouter } from "./productRouter";
import { storageRouter } from "./storageRouter";
import { productDistributionRouter } from "./productDistibution";
import { patientRouter } from "./patientRouter";
import { appointmentRouter } from "./appointmentRouter";

export const router = Router();

router.use("/users", userRouter);
router.use("/rooms", roomRouter);
router.use("/sessions", sessionRouter);
router.use("/storage", storageRouter);
router.use("/products", productRouter);
router.use("/product_distribution", productDistributionRouter);
router.use("/patients", patientRouter);
router.use("/appointments", appointmentRouter);
