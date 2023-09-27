import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Posts from "../components/Posts";

// Mock the fetch function
global.fetch = jest.fn();

describe("Posts Component", () => {
  it("should filter and display posts by user name", async () => {
    // Mock a successful fetch for users
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            id: 1,
            name: "John Doe",
          },
        ]),
    });

    // Mock a successful fetch for user's posts
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve([
          {
            userId: 1,
            id: 1,
            title: "Example Post Title",
            body: "This is the post body",
          },
        ]),
    });

    const { getByPlaceholderText, getByText, getByTestId } = render(
      <BrowserRouter>
        <Posts />
      </BrowserRouter>
    );

    const searchInput = getByPlaceholderText("Search by user name");

    // Simulate user input
    fireEvent.change(searchInput, { target: { value: "John" } });

    // Find the form element and submit it
    const form = getByTestId("search-form");
    fireEvent.submit(form);

    // Wait for data to load
    await waitFor(() => {
      expect(getByText("Example Post Title")).toBeInTheDocument();
      expect(getByText("By John Doe")).toBeInTheDocument();
    });
  });
});
