import React, { useState, useEffect } from "react";

import AlleSysMicroComment from "../apis/AlleSysMicroComment";

const CommentList = ({ postId }: any) => {
    const [comments, setComments] = useState([]);

    const fetchData = async() => {
        const [response] = await Promise.all([
            AlleSysMicroComment.get(`/posts/${postId}/comments`)
        ])
        setComments(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const renderedComments = comments.map((comment: {id: string, content: string}) => {
        return (
            <li key={comment.id}>{comment.content}</li>
        );
    });

    return (
        <ul>
            {renderedComments}
        </ul>
    );
};

export default CommentList;
