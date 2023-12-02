import { Router } from "express";
import { userRouter } from "./userRoutes";
import { roomRouter } from "./roomRouter";
import { productRouter } from "./productRouter";
import { storageRouter } from "./storageRouter";
import { productDistributionRouter } from "./productDistibution";

export const router = Router();

router.use("/users", userRouter);
router.use("/rooms", roomRouter);
router.use("/storage", storageRouter)
router.use("/products", productRouter)
router.use("/product_distribution", productDistributionRouter)