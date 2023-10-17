import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import {config} from "./config.js";
import {Server} from "socket.io";

const app = express(); // express를 실행하면 app이라는 객체가 생성된다.

// Middleware use
app.use(express.json()); // post request의 body를 읽을 수 있게 해준다.
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

// router 설정
app.use('/tweets', tweetRouter);
app.use('/auth', authRouter);

// url이 없는 경우
app.use((req, res, next) => {
    res.sendStatus(404);
});

// error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.sendStatus(500);
});

const server = app.listen(config.host.port);
initSocket(server);
