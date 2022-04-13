import express, { Request, Response} from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

app.post('/events', (req: Request, res: Response) => {
    const event = req.body;

    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    axios.post("http://localhost:4002/events", event);

    res.send({status: "Ok"});
});

app.listen(4005, () => {
    console.log("Event Bus Listening on 4005");
});


