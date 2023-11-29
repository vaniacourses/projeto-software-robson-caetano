import { Router } from "express";
import { ListRoomsController } from "~/controllers/room/ListRoomsController";
import { DatabaseRoomRepositoryStrategy } from "~/repositories/room/DatabaseRoomRepositoryStrategy";

export const roomRouter = Router();

roomRouter.get("/", async (_, res) => {
  const rooms = await new ListRoomsController(
    new DatabaseRoomRepositoryStrategy(),
  ).listRooms();

  res.json(rooms);
});
