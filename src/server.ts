import "express-async-errors";

import express from "express";
import { router } from "./routes";
import { env } from "./config/env";
import { errorMiddleware } from "./middlewares/expressErrorMiddleware";

const app = express();

app.use(express.json());

app.use(router);

app.use(errorMiddleware);

app.listen(env.PORT, () => console.log(`App listening on port ${env.PORT}`));
