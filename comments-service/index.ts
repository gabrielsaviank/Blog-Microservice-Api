import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId: any = {

};

app.get('/posts/:id/comments', (req: Request, res: Response) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async(req: Request, res: Response) => {
    const commentId = randomBytes(4).toString('hex');

    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content, status: "pending" });
    commentsByPostId[req.params.id] = comments;

    await axios.post("http://localhost:4005/events", {
        type: "Comment Created",
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: "pending"
        }
    })

    res.status(201).send(comments)
});

app.post('/events', async (req: Request, res: Response) => {
   console.log("Event Received", req.body);

   const { type, data } = req.body;

   if (type === 'CommentModerated') {
       const { postId, id , status, content } = data;
       const comments = commentsByPostId[postId];

       const comment = comments.find((comment: {id: string}) => {
           return comment.id === id
       });
       comment.status = status;

       await axios.post("http://localhost:4005/events", {
           type: 'CommentUpdated',
           data: {
               id,
               status,
               postId,
               content
           }
       });
   }

   res.send({});
});

app.listen(4001, () => {
    console.log("Listening Comments Microservice on 4001");
});
