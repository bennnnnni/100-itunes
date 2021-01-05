import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Resultitem from "./ResultItem";
import "./resultsArea.scss";

const ResultsArea = props => {
  const { results } = props;

  if (results.length === 0)
    return (
      <Row className="d-flex justify-content-center no-results">
        Found no results
      </Row>
    );

  return (
    <Row data-testid="results-container">
      {results.map((result, idx) => (
        <Col
          xl="auto"
          lg="auto"
          md="auto"
          sm="auto"
          xs="auto"
          className="card-col"
          key={idx}
        >
          <Resultitem result={result} />
        </Col>
      ))}
    </Row>
  );
};

export default ResultsArea;
