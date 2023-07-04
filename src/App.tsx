import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './app/Navbar';
import { PostsList } from './features/posts/PostsLists';
import { AddPostForm } from './features/posts/AddPostForm';
import { SinglePostPage } from './features/posts/SinglePostPage';
import { EditPostForm } from './features/posts/EditPostForm';
import { redo, undo } from './app/undoable';
import { useAppDispatch } from './app/hooks';

function App() {
  const dispatch = useAppDispatch();
  return (
    <Router>
      <Navbar />
      <div className="App" tabIndex={0} onKeyDown={e => {
        if ((e.key === 'z' || e.key === 'Z') && e.ctrlKey) {
          e.preventDefault();
          dispatch(undo());
        }
        if((e.key === 'e'||e.key === 'E') && e.ctrlKey) {
          e.preventDefault();
          dispatch(redo());
        }
      }}>
        <Routes>
          <Route
            path="/posts/"
            element={
              <React.Fragment>
                <AddPostForm />
                <PostsList />
              </React.Fragment>
            }
          />
          <Route path="/posts/:postId" element={
            <React.Fragment>
              <SinglePostPage />
            </React.Fragment>
            }
          />
          {/* <Route path="/" element={<PostsList />} /> */}
          <Route path="/editPost/:postId" element={<EditPostForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
