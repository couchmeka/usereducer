import React, { useReducer, useEffect, useState } from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.css'
import { Card, Row, Col } from 'react-bootstrap';

// Action Types
const SET_POSTS = "SET_POSTS";

// Reducer
const postsReducer = (state, action) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(postsReducer, null);
  const [postCount, setPostCount] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);

      if (!response.ok) {
        console.error(`API request failed with status ${response.status}`);
        return;
      }

      let posts = await response.json();

      if (!Array.isArray(posts)) {
        console.error('API response is not an array');
        return;
      }

      // Slice the array of posts to desired length
      posts = posts.slice(0, postCount);

      dispatch({ type: SET_POSTS, posts });
    };

    fetchPosts();
  }, [postCount]);

  return (
    <div className="App">
      <h1>Posts</h1>
      <label>
        Number of posts to display:
        <input
          type="number"
          value={postCount}
          onChange={(e) => setPostCount(e.target.value)}
        />
      </label>
      {state === null ? <p>Loading...</p> :
        <Row>
          {state.map((post, index) => (
            <Col sm={4} key={index}>
              <Card style={{ width: '18rem', marginTop: '1rem' }}>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>
                    {post.body}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      }
    </div>
  );
}

export default App;

