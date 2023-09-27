// Posts.tsx
import React, { useState, useEffect } from "react";
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
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsersAndPosts = async () => {
      try {
        const usersResponse = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!usersResponse.ok) {
          throw new Error("Failed to fetch users");
        }
        const users: User[] = await usersResponse.json();

        const postsResponse = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!postsResponse.ok) {
          throw new Error("Failed to fetch posts");
        }
        const posts: Post[] = await postsResponse.json();

        const postsWithUser = posts.map((post) => ({
          ...post,
          user: users.find((user) => user.id === post.userId),
        }));

        setUsers(users);
        setPosts(postsWithUser);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchUsersAndPosts();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery === "") {
      alert("Please enter a valid name!");
      return;
    }

    const filteredPosts = posts.filter((post) =>
      post.user?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredPosts.length === 0) {
      alert("Sorry, no posts found. Try again.");
      return;
    }

    setPosts(filteredPosts);
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
          id="kutu"
          data-testid="search-form"
        />
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
