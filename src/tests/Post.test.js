import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import Post from "../components/Post";

// Mock the fetch function
global.fetch = jest.fn();

describe("Post Component", () => {
  it("should render the Post component", () => {
    // Mock a successful fetch for a specific post
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          userId: 1,
          id: 1,
          title: "Example Post Title",
          body: "This is the post body",
        }),
    });

    // Mock a successful fetch for the user
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 1,
          name: "John Doe",
        }),
    });

    // Define the specific URL with the desired ID
    const specificUrl = "https://jsonplaceholder.typicode.com/posts/1";

    // Render the component within a MemoryRouter with the specific route
    const { container } = render(
      <MemoryRouter initialEntries={[specificUrl]}>
        <Route path="/posts/:id">
          <Post />
        </Route>
      </MemoryRouter>
    );

    // Check if the Post component rendered without errors
    expect(container).toBeDefined();
  });
});
