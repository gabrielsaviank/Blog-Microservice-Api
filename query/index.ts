import express, { Request, Response} from "express";
const bodyParser = require('body-parser');
const cors = require('cors');
import axios from "axios";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type: string, data: any) => {
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

};

app.get('/posts', (req: Request, res: Response) => {
    res.send(posts);
});

app.post('/events', (req: Request, res: Response) => {
    const { type, data }: any = req.body;

    handleEvent(type, data)
    res.send({});
});

app.listen(4002, async () => {
    console.log('Listening Query on 4002');

    const res = await axios.get('http://localhost:4005/events');

    for (let event of res.data) {
      console.log("Processing Event: ", event.type);

      handleEvent(event.type, event.data);
    }
    // res.data.forEach((event: any) => handleEvent(event.type, event.data))
});
