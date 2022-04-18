import express, { Request, Response} from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req: Request, res: Response) => {
    res.send(posts);
});

app.post('/events', (req: Request, res: Response) => {
    const { type, data } = req.body;

    if(type === "PostCreated") {
        const { id, title } = data;

        // @ts-ignore
        posts[id] = { id, title, comments: [] }
    }

    if(type === "CommentCreated") {
        const { id, content, postId } = data;

        // @ts-ignore
        const post = posts[postId]
        post.comments.push({ id, content })
    }

    res.send({})
});

app.listen(4002, () => {
    return console.log("Listening to Query on port 4002")
});
