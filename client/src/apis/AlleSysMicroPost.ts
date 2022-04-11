import axios from "axios";

const AlleSysMicroPost = axios.create({
    baseURL: 'http://localhost:4000'
});

export default AlleSysMicroPost;
