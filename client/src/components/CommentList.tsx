import React from "react";

const CommentList = ({ comments }: any) => {

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
