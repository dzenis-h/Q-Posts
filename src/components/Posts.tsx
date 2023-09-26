// Posts.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logger from "../utils/Logger";

interface User {
  id: number;
  name: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user?: User;
}

const Posts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery === "") {
      alert("Please enter a valid name!");
    }
    if (searchQuery) {
      axios
        .get<User[]>("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          const users = response.data.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          const postsPromises = users.map((user) =>
            axios
              .get<Post[]>(
                `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
              )
              .then((response) =>
                response.data.map((post) => ({ ...post, user }))
              )
          );
          return Promise.all(postsPromises);
        })
        .then((postsArrays) => {
          setPosts(postsArrays.flat());
        });
    } else {
      setPosts([]);
    }
  };

  return (
    <div style={{ maxHeight: "95vh" }}>
      <Logger message="Posts" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by user name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {posts.map((post) => (
        <div key={post.id} className="card">
          <div className="card-title">
            <Link to={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
          </div>
          <p>By {post.user?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
