import React from 'react';

import PostCreate from "./screens/PostCreate";
import PostList from "./components/PostList";

const App = () => {
  return (
      <div className="container">
        <h1>Hello from AlleSys Microservice</h1>
          <h3>Create Post</h3>

          <PostCreate/>

          <hr/>
          <h3>Posts</h3>
          <PostList/>
      </div>
  );
};

export default App;
