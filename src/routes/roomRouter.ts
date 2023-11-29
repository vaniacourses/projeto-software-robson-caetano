import { Router } from "express";
import httpStatus from "http-status";

import { CreateRoomController } from "~/controllers/room/CreateRoomController";
import { ListRoomsController } from "~/controllers/room/ListRoomsController";
import { DatabaseRoomRepositoryStrategy } from "~/repositories/room/DatabaseRoomRepositoryStrategy";

export const roomRouter = Router();

roomRouter.get("/", async (_, res) => {
  const rooms = await new ListRoomsController(
    new DatabaseRoomRepositoryStrategy(),
  ).listRooms();

  res.json(rooms);
});

roomRouter.post("/", async (req, res) => {
  const room = await new CreateRoomController(
    new DatabaseRoomRepositoryStrategy(),
  ).createRoom({
    name: req.body.name,
  });

  res.status(httpStatus.CREATED).json(room);
});
