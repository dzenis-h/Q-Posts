import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Comments from "../components/Comments";

// Mock the fetch function
global.fetch = jest.fn();

describe("Comments Component", () => {
  it("should display a list of comments", async () => {
    // Mock a successful fetch for comments
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            postId: 1,
            id: 1,
            name: "Comment 1",
            email: "comment1@example.com",
            body: "This is comment 1",
          },
          {
            postId: 1,
            id: 2,
            name: "Comment 2",
            email: "comment2@example.com",
            body: "This is comment 2",
          },
        ]),
    });

    // Render the Comments component with a specific postId
    const { getByText } = render(<Comments postId={1} />);

    // Wait for data to load
    await waitFor(() => {
      // Check for the presence of specific comment text
      expect(getByText("Comment 1")).toBeInTheDocument();
      expect(getByText("Comment 2")).toBeInTheDocument();
    });
  });
});
