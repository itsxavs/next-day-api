import mongoose from "mongoose";
import app from "./app.js";
import { server } from "./websocket.js";

const CONNECTION_URL =
  "mongodb+srv://Usuario1:123412341234@cluster0.egept.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

server.listen(3000, () => {
  console.log("listening on *:3000");
});

mongoose
  .connect(CONNECTION_URL)
  .then((mek) => {
    /* loadData() */
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log("puTaaaaaaaaaa"));
