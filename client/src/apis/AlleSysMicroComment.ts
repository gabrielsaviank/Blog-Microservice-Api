import axios from "axios";

const AlleSysMicroComment = axios.create({
    baseURL: 'http://localhost:4001'
});

export default AlleSysMicroComment;
