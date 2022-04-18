import axios from "axios";

const AlleSysMicroComment = axios.create({
    baseURL: 'http://localhost:4002'
});

export default AlleSysMicroComment;
