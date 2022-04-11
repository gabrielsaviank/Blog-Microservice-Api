import express, { Request, Response} from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts: any = {};

app.get('/posts', (req: Request, res: Response) => {
    res.send(posts);
});

app.post('/posts',
    (req: Request, res: Response) => {
        const id: string = randomBytes(4).toString('hex');

        const { title } = req.body;
        posts[id] = {
            id,
            title
        };

        res.status(201).send(posts[id]);
    });

app.listen(4000, () => {
   console.log("Listening Posts Microservice on 4000");
});
