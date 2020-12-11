import React from "react";

import { render } from "@testing-library/react";

import ResultsArea from "../resultsArea";

test("<ResultsArea/> renders info message when no results are found via search", () => {
  const fakeProps = { albums: [], searched: true };
  const { getByText } = render(<ResultsArea {...fakeProps} />);

  expect(getByText(/found no results/i)).toBeInTheDocument();
});

const fakeAlbum = {
  "im:name": { label: "fake title" },
  "im:artist": {
    label: "fake artist",
  },
  "im:releaseDate": { attributes: { label: "12 november 2020" } },
  category: { attributes: { term: "fake genre" } },
  "im:image": [{}, {}, { label: "fakeImgURL" }],
};

test("<ResultsArea/> renders album when given", () => {
  const fakeProps = { albums: [fakeAlbum], searched: false };
  const { getByText, getByTestId } = render(<ResultsArea {...fakeProps} />);

  expect(getByText(/fake title/i)).toBeInTheDocument();
  expect(getByText(/fake artist/i)).toBeInTheDocument();
  expect(getByText(/2020/i)).toBeInTheDocument();
  expect(getByText(/fake genre/i)).toBeInTheDocument();
  expect(getByTestId("card-image")).toBeInTheDocument();
});

test("<ResultsArea/> renders multiple albums when given", () => {
  const fakeProps = {
    albums: [fakeAlbum, fakeAlbum, fakeAlbum, fakeAlbum],
    searched: false,
  };
  const { getByTestId } = render(<ResultsArea {...fakeProps} />);

  const resultContainerNode = getByTestId("results-container");
  expect(resultContainerNode.hasChildNodes()).toEqual(true);
  expect(resultContainerNode.childNodes.length).toEqual(4);
});
