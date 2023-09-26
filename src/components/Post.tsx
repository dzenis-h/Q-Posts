// Post.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Comments from "./Comments";
import Logger from "../utils/Logger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
    <>
      <Logger message="Post" />
      <Link to="/" className="back-btn">
        <span className="back-btn-dark"> </span>{" "}
        <FontAwesomeIcon
          icon={faArrowLeft}
          beatFade
          style={{ color: "#ccdb94", paddingLeft: ".5rem" }}
        />{" "}
      </Link>
      <h2>{post.title}</h2>
      <p>By {post.user?.name}</p>
      <p>{post.body}</p>
      <Comments postId={post.id} />
    </>
  );
};

export default Post;
