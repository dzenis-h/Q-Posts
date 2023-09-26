import React, { useEffect, useState } from "react";
import axios from "axios";
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

  // console.log(comments);

  useEffect(() => {
    axios
      .get<Comment[]>(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      )
      .then((response) => {
        setComments(response.data);
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
