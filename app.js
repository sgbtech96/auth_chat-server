const http = require("http");
const express = require("express");
const socketIOServer = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIOServer(server);
const port = process.env.PORT || 8000;
const roomChats = require("./database/models/roomChats");
const moment = require("moment");
const cors = require("cors");
const bodyParser = require("body-parser");

const otpRouter = require("./routers/otpRoutes");
const registerRouter = require("./routers/registerRoutes");
const loginLogoutRouter = require("./routers/loginLogoutRoutes");
const infoRouter = require("./routers/infoRoutes");
require("./database/connection");
app.use(cors());
app.use(bodyParser.json());

app.use("/", otpRouter);
app.use("/", registerRouter);
app.use("/", loginLogoutRouter);
app.use("/", infoRouter);

const genMsg = (text, from) => {
    return {
        text,
        from,
        createdAt: moment().valueOf(),
    };
};

io.on("connection", (socket) => {
    console.log("someone connected :-)");
    socket.on("join", async ({ username, room }) => {
        socket.join(room);
    });

    socket.on("createMessage", async ({ text, username, room }) => {
        const msg = genMsg(text, username);
        io.to(room).emit("newMessage", msg);
        await roomChats.findOneAndUpdate(
            { room },
            {
                $push: {
                    chats: msg,
                },
            }
        );
    });
});

server.listen(port, () => {
    console.log(`server is up on port! ${port}`);
});
