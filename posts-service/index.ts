import express, { Request, Response} from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";

const app = express();
app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req: Request, res: Response) => {
    res.send(posts);
});

app.post('/posts',
    (req: Request, res: Response) => {
        const id: string = randomBytes(4).toString('hex');

        const { title } = req.body;

        // @ts-ignore
        posts[id] = {
            id,
            title
        };


        // @ts-ignore
        res.status(201).send(posts[id]);
    });

app.listen(4000, () => {
   console.log("Listening Posts Microservice on 4000");
});
