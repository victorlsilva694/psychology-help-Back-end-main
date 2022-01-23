import { Router, Request, Response } from "express";
import { getRepository } from "typeorm";
import multer from "multer";
import { get } from "@srhenry/storage-manager";
import { Server } from "http";
const http = require("http").createServer();
const io = require("socket.io")(http)





