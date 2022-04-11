import axios from "axios";

const AlleSysMicroComment = axios.create({
    baseURL: 'http://localhost:5000'
});

export default AlleSysMicroComment;
