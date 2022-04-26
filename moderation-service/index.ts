import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

app.post('/events', (req: Request, res: Response) => {

});

app.listen(4003, () => {
    console.log("Listening Moderation on Port 4003");
});
