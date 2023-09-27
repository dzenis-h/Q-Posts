import React from "react";
import { useEffect, useState } from "react";
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
    const fetchData = async () => {
      try {
        const postResponse = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        if (!postResponse.ok) {
          throw new Error("Failed to fetch post");
        }
        const postData: Post = await postResponse.json();

        const userResponse = await fetch(
          `https://jsonplaceholder.typicode.com/users/${postData.userId}`
        );
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user");
        }
        const userData: User = await userResponse.json();

        setPost({ ...postData, user: userData });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    if (id) {
      fetchData();
    }
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
      <h2 data-testid="post-title">{post.title}</h2>
      <p data-testid="user-name">By {post.user?.name}</p>
      <p data-testid="post-body">{post.body}</p>
      <Comments postId={post.id} />
    </>
  );
};

export default Post;
