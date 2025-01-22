import express, {Request, Response} from 'express';
import bodyParser from "body-parser";
import UserRoute from "./routes/userRoute";
import session from "express-session";
import cors from 'cors';
import gameRouter from "./routes/gameRouter";
import userRoute from "./routes/userRoute";
import authRouter from "./routes/authRouter";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

//Index endpoint to avoid errors
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome, Do our new online casino!');
});
app.use('/auth', authRouter);
app.use('/user', userRoute);
app.use('/game', gameRouter);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
