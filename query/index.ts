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

    if (type === 'Post Created') {
        const { id, title } = data;

        // @ts-ignore
        posts[id] = { id, title, comments: [] };
    }

    if (type === 'Comment Created') {
        const { id, content, postId, status } = data;

        // @ts-ignore
        const post = posts[postId];
        post.comments.push({ id, content, status });
    }

    res.send({});
});

app.listen(4002, () => {
    console.log('Listening Query on 4002');
});
