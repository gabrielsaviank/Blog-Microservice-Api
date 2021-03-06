import React, { useState, useEffect } from 'react';

import AlleSysMicroPost from "../apis/AlleSysMicroPost";
import AlleSysMicroQuery from "../apis/AlleSysMicroQuery";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async() => {
        // Old Way
        // const response = await  AlleSysMicroPost.get('/posts');

        // This is a way that is supposed to be twice as fast.
        // Also, work better with two or more functions, since this is not a prod app, let's test.
        const [response] = await Promise.all([
            AlleSysMicroQuery('/posts')
        ])
        setPosts(response.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderedPosts = Object.values(posts).map((post: any) => {
        return(
            <div
                className="card"
                style={{width: '30%', marginBottom: '20px'}}
                key={post.id}
            >
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments}/>
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        );
    });

    return(
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    );
};

export default PostList;
