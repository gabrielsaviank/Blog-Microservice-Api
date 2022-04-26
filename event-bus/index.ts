import express, { Request, Response} from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

app.post('/events', (req: Request, res: Response) => {
    const event = req.body;

    // Posts
    axios.post("http://localhost:4000/events", event);
    //Comments
    axios.post("http://localhost:4001/events", event);
    // Query
    axios.post("http://localhost:4002/events", event);
    // Moderation
    axios.post("http://localhost:4003/events", event);

    res.send({status: "Ok"});
});

app.listen(4005, () => {
    console.log("Event Bus Listening on 4005");
});


