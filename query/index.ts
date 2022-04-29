import express, { Request, Response} from "express";
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req: Request, res: Response) => {
    res.send(posts);
});

app.post('/events', (req: Request, res: Response) => {
    const { type, data }: any = req.body;

    if (type === 'PostCreated') {
        const { id, title } = data;

        // @ts-ignore
        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId, status }: {
            id: string,
            content: { title: string },
            postId: string,
            status: string
        } = data;

        // @ts-ignore
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;

        // @ts-ignore
        const post = posts[postId];
        const comment = post.comments.find((comment: any) => {
            return comment.id === id;
        });

        comment.status = status;
        comment.content = content;
    }

    console.log(posts);
    res.send({});
});

app.listen(4002, () => {
    console.log('Listening Query on 4002');
});
