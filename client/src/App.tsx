import React from 'react';

import PostCreate from "./screens/PostCreate";

const App = () => {
  return (
      <div className="container">
        <h1>Hello from AlleSys Microservice</h1>
          <h3>Create Post</h3>

          <PostCreate/>
      </div>
  );
};

export default App;
