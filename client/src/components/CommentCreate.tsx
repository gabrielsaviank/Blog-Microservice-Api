import React, { useState } from "react";

import AlleSysMicroComment from "../apis/AlleSysMicroComment";

const CommentCreate = ({ postId }: any) => {
  const [content, setContent] = useState('');

  const onSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() ;

    await AlleSysMicroComment.post(`/posts/${postId}/comments`, {
      content
    });

    setContent('');
  };

  return (
      <div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>New Comment</label>
            <input value={content} onChange={e => setContent(e.target.value)} className="form-control" />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
  );
};

export default CommentCreate;
