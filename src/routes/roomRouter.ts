import { Router } from "express";
import httpStatus from "http-status";

import { CreateRoomController } from "~/controllers/room/CreateRoomController";
import { DeleteRoomController } from "~/controllers/room/DeleteRoomController";
import { ListRoomsController } from "~/controllers/room/ListRoomsController";
import { UpdateRoomController } from "~/controllers/room/UpdateRoomController";
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

roomRouter.put("/:id", async (req, res) => {
  const room = await new UpdateRoomController(
    new DatabaseRoomRepositoryStrategy(),
  ).updateRoom({
    id: Number(req.params.id),
    name: req.body.name,
  });

  res.json(room);
});

roomRouter.delete("/:id", async (req, res) => {
  await new DeleteRoomController(
    new DatabaseRoomRepositoryStrategy(),
  ).deleteRoom({
    id: Number(req.params.id),
  });

  res.sendStatus(httpStatus.NO_CONTENT);
});
