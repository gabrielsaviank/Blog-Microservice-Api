import React from "react";

const CommentList = ({ comments }: any) => {

    const renderedComments = comments.map((comment: {id: string, content: string, status: string}) => {
        let content;

        switch (comment.status) {
            case 'approved':
                content = comment.content
                return <li key={comment.id}>{content}</li>
            case 'pending':
                content = "This comment is awaiting moderation "
                return <li key={comment.id}>{content}</li>
            case 'rejected':
                content = "This comment has been rejected "
                return <li key={comment.id}>{content}</li>
            default:
                break;
        }
    });

    return (
        <ul>
            {renderedComments}
        </ul>
    );
};

export default CommentList;
