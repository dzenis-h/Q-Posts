import React, { useEffect, useState } from "react";
import Logger from "../utils/Logger";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface CommentsProps {
  postId: number;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Use the Fetch API to make the GET request
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Comment[]) => {
        setComments(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [postId]);

  return (
    <>
      <Logger message="Comments" />;
      {comments.map((comment) => (
        <blockquote key={comment.id} className="sunflower">
          <h3 className="centered">{comment.name}</h3>
          <p>{comment.body}</p>
          <p>{comment.email}</p>
        </blockquote>
      ))}
    </>
  );
};

export default Comments;
