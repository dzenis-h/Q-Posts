// App.tsx
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Posts from "./components/Posts";
import Post from "./components/Post";
import About from "./components/About";

const App: React.FC = (props) => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/:id" component={Post} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
