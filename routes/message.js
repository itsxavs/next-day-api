import { getMessageByChat, sendMessage } from "../controllers/message.js";
import express from "express";

const messageRouter = express.Router();
messageRouter.post("/", sendMessage);
messageRouter.get("sender/:id/receiver/:id", getMessageByChat);

export default messageRouter;
