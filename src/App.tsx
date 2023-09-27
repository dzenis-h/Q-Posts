// App.tsx
import React from "react";
import "./App.css";
import Posts from "./components/Posts";
import Post from "./components/Post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App: React.FC = (props) => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/:id" component={Post} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;

