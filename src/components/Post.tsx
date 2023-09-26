// Post.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Comments from "./Comments";
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

const Post: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    Logger("Post");
    axios
      .get<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        const post = response.data;
        return axios
          .get<User>(
            `https://jsonplaceholder.typicode.com/users/${post.userId}`
          )
          .then((response) => {
            setPost({ ...post, user: response.data });
          });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [id]);

  if (!post) return null;

  return ( 
    <div>
      <h2>{post.title}</h2>
      <p>By {post.user?.name}</p>
      <p>{post.body}</p>
      <Comments postId={post.id} />
    </div>
  );
};

export default Post;
