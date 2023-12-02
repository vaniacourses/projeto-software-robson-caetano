import { Router, Request, Response } from "express";
import httpStatus from "http-status";

import { DatabaseRoomRepositoryStrategy } from "~/repositories/room/DatabaseRoomRepositoryStrategy";
import { DatabaseProductRepositoryStrategy } from "~/repositories/product/DatabaseProductRepositoryStrategy";
import { DatabaseStorageRepositoryStrategy } from "~/repositories/storage/DatabaseStorageRepositoryStrategy";
import { CreateProductDistributionController } from "~/controllers/product_distribution/CreateProductDistributionController";
import { DatabaseProductDistributionRepositoryStrategy } from "~/repositories/product_distribution/DatabaseProductDistributionRepositoryStrategy";
import { authorizationMiddleware } from "~/middlewares/authorizationMiddleware";
import { Role } from "@prisma/client";
import { ConsumeProductsOfRoomController } from "~/controllers/product_distribution/ConsumeProductOfRoomController";

export const productDistributionRouter = Router();

const databaseProductDistributionRepository =
  new DatabaseProductDistributionRepositoryStrategy();

productDistributionRouter.post(
  "/",
  authorizationMiddleware([Role.STORAGE_MANAGER]),
  async (req: Request, res: Response) => {
    const createProductDistributionController =
      new CreateProductDistributionController(
        new DatabaseRoomRepositoryStrategy(),
        new DatabaseProductRepositoryStrategy(),
        new DatabaseStorageRepositoryStrategy(),
        databaseProductDistributionRepository,
      );

    const productDistribution =
      await createProductDistributionController.createProductDistribution({
        roomId: Number(req.body.roomId),
        productId: Number(req.body.productId),
        quantity: Number(req.body.quantity),
      });

    res.status(httpStatus.CREATED).json(productDistribution);
  },
);

productDistributionRouter.put(
  "/",
  authorizationMiddleware([Role.DOCTOR]),
  async (req: Request, res: Response) => {
    const consumeProductsController = new ConsumeProductsOfRoomController(
      databaseProductDistributionRepository,
    );

    await consumeProductsController.consumeProductsOfRoom({
      roomId: Number(req.body.roomId),
      productId: Number(req.body.productId),
      quantity: Number(req.body.quantity),
    });

    res.sendStatus(httpStatus.NO_CONTENT);
  },
);
