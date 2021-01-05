import React from "react";

import { render } from "@testing-library/react";

import MainView from "../MainView";
import * as api from "../api";

test("<MainView/> renders searcharea", () => {
  const { getByRole, getByText, getByPlaceholderText, debug } = render(
    <MainView />
  );
  console.log(debug());
  //searchfield
  expect(getByPlaceholderText(/search for title/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/artist/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/release year/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/genre/i)).toBeInTheDocument();
  expect(getByRole("button", { name: "Advanced Search" })).toBeInTheDocument();
  expect(getByRole("button", { name: "Reset" })).toBeInTheDocument();
  expect(getByRole("button", { name: "Apply" })).toBeInTheDocument();
});

test("<MainView/> renders error screen when error", async () => {
  jest.spyOn(api, "fetchAlbums").mockRejectedValue(new Error("Async error"));

  const { getByText } = render(<MainView error={true} />);
  expect(getByText(/Sorry, an error occured/i)).toBeInTheDocument();
});

const fakeItems = [
  {
    rank: 1,
    name: "fake title",
    artist: "fake artist",
    year: "fake year",
    img: "fake img",
    genre: "fake",
  },
];

test("<MainView/> renders results when given", async () => {
  const { getByTestId } = render(<MainView items={fakeItems} />);
  expect(getByTestId("results-container")).toBeInTheDocument();
});
