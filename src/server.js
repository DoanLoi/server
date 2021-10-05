require("dotenv").config();

import express from "express";
import ConnectDB from "./config/connectDB";
import initRoutes from "./routes";
import configViewEngine from "./config/viewEngine";
import bodyParser from "body-parser";
import connectFlash from "connect-flash";
import session from "./config/session";
import http from "http";
import socketio from "socket.io";

import passport from "passport";
import initSockets from "./socket/index";
import passportSocketIo from "passport.socketio";
import cookieParser from "cookie-parser";
import jwt_decode from "jwt-decode";
import cors from "cors";

//kho tao app
var app = express();

let server = http.createServer(app);
let io = socketio(server);
//ket noi csdl
ConnectDB();

//Config session

session.config(app);

//Bodypasrse
app.use(bodyParser.json());

//Enable connect flash
app.use(connectFlash());

//use cookie Parser
app.use(cookieParser());
//use cors
app.use(cors());

//Cau hinh passport

app.use(passport.initialize());
app.use(passport.session());
//Cau hinh router

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString}]: ${req.method} - ${req.url}`);
  next();
});

initRoutes(app);
io.on("connection", (socket) => {
  try {
    console.log("Start:" + socket.id);
    let token = socket.handshake.headers.authorization;
    var decoded = jwt_decode(token);
    socket.request.user = decoded;
  } catch (error) {}
});
// initSockets(io);
server.listen(Number(process.env.PORT), process.env.APP_HOST, () => {
  console.log("Server is running on port " + process.env.PORT);
});
