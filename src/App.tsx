// App.tsx
import React from "react";
import "./App.css";
import Posts from "./components/Posts";
import Post from "./components/Post";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = (props) => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts/:id" element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
