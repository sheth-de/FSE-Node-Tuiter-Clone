import express, {Request, Response} from 'express';
const app = express();

import mongoose from "mongoose";
import bodyParser from "body-parser";
import UserController from "./controllers/UserController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessagingController from "./controllers/MessagingController";
//devanshi testing
mongoose.connect('mongodb+srv://shethdeva04:MongoConnection123@cluster0.lqk17.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
// mongoose.connect('mongodb://127.0.0.1:27017/tuiter');

app.use(bodyParser.json())

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

const userController = UserController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likeController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messagingController = MessagingController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);