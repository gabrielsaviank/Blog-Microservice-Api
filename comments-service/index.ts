import express, { Request, Response} from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";

const app = express();

app.use(bodyParser.json());

const commentsByPostId: any = {

};

app.get('/posts/:id/comments', (req: Request, res: Response) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req: Request, res: Response) => {
    const commentId = randomBytes(4).toString('hex');

    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content });
    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments)
});

app.listen(5000, () => {
    console.log("Listening Comments Microservice on 5000");
});
