import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import postRouter from "./routes/posts.js";
import userRouter from "./routes/user.js";
import teacherRouter from "./routes/teacher.js";
import studentRouter from "./routes/student.js";
import classroomRouter from "./routes/classroom.js";
import messageRouter from "./routes/message.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/teachers", teacherRouter);
app.use("/students", studentRouter);
app.use("/classroom", classroomRouter);
app.use("/message", messageRouter);

export default app;
