import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req: Request, res: Response) => {
    const { type, data } = req.body;

    if(type === 'Comment Created') {
        const status = data.content.includes("wanker") ? "rejected": "approved";

        await axios.post("http://localhost:4005/events", {
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        });
    }

    res.send({});
});

app.listen(4003, () => {
    console.log("Listening Moderation on Port 4003");
});

