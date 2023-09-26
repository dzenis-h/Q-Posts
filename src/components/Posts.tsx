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
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    Logger("Posts");
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        const posts = response.data;
        const usersPromises = posts.map((post) =>
          axios.get<User>(
            `https://jsonplaceholder.typicode.com/users/${post.userId}`
          )
        );
        return Promise.all([posts, ...usersPromises]);
      })
      .then(([posts, ...usersResponses]) => {
        const postsWithUsers = posts.map((post, index) => ({
          ...post,
          user: usersResponses[index].data,
        }));
        setPosts(postsWithUsers);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>By {post.user?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
