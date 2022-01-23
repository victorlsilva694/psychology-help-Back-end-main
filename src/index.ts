import "reflect-metadata";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import * as bodyParser from "body-parser";
import { Routers } from "./Routers/routes";
import "./Schema";
import path from 'path';
import { createServer} from 'http';
import { Server } from 'socket.io';

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", Routers);
const pathImages = path.resolve(__dirname, '..', 'uploads');
console.log(pathImages);
app.use('/images/', express.static(pathImages))

const port = process.env.PORT || 8080;
const server = createServer(app);
const socketIO = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketIO.on('connection', socket => {
  socket.on("EnvMessageUser", (handler: unknown) => {
    socketIO.emit("EnvMessageUser", handler);
  })
})

server.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
