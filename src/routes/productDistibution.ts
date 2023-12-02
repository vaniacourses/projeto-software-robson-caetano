import { Router, Request, Response } from "express";
import httpStatus from "http-status";

import { DatabaseRoomRepositoryStrategy } from "~/repositories/room/DatabaseRoomRepositoryStrategy";
import { DatabaseUserRepositoryStrategy } from "~/repositories/user/DatabaseUserRepositoryStrategy";
import { DatabaseProductRepositoryStrategy } from "~/repositories/product/DatabaseProductRepositoryStrategy";
import { DatabaseStorageRepositoryStrategy } from "~/repositories/storage/DatabaseStorageRepositoryStrategy";
import { CreateProductDistributionController } from "~/controllers/product_distribution/CreateProductDistributionController";
import { DatabaseProductDistributionRepositoryStrategy } from "~/repositories/product_distribution/DatabaseProductDistributionRepositoryStrategy";
import { authorizationMiddleware } from "~/middlewares/authorizationMiddleware";
import { Role } from "@prisma/client";

export const productDistributionRouter = Router();

productDistributionRouter.use(authorizationMiddleware([Role.STORAGE_MANAGER]));

productDistributionRouter.post("/", async (req: Request, res: Response) => {
  const createProductDistributionController =
    new CreateProductDistributionController(
      new DatabaseRoomRepositoryStrategy(),
      new DatabaseUserRepositoryStrategy(),
      new DatabaseProductRepositoryStrategy(),
      new DatabaseStorageRepositoryStrategy(),
      new DatabaseProductDistributionRepositoryStrategy(),
    );

  const productDistribution =
    await createProductDistributionController.createProductDistribution({
      roomId: Number(req.body.roomId),
      productId: Number(req.body.productId),
      quantity: Number(req.body.quantity),
      distributedByUserId: Number(req.body.distributedByUserId),
    });

  res.status(httpStatus.CREATED).json(productDistribution);
});
