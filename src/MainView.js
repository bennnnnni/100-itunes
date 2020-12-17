import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import "./MainView.css";
import ReultsArea from "./results/resultsArea";
import { fetchAlbums } from "./fetchAlbums";

const MainView = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState(null);
  const [filteredAlbums, setFilteredAlbums] = useState(null);

  useEffect(() => {
    fetchAlbums()
      .then(res => {
        const rankedAlbums = res.map((albums, idx) => ({
          ...albums,
          rank: idx + 1,
        }));
        setAlbums(rankedAlbums);
      })
      .catch(e => setError(e))
      .finally(setLoading(false));
  }, []);

  const handleChange = e => {
    e.preventDefault();
    const filteredAlbums = albums.filter(album =>
      album["im:name"].label
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredAlbums(filteredAlbums);
  };

  let results = null;
  if (loading) {
    results = (
      <Row className="d-flex justify-content-center"> Loading ... </Row>
    );
  } else if (error) {
    results = (
      <Row className="d-flex justify-content-center">
        Sorry, an error occured
      </Row>
    );
  } else if (albums) {
    results = <ReultsArea albums={filteredAlbums ? filteredAlbums : albums} />;
  }

  return (
    <div className="root">
      <Container>
        <Row className="d-flex justify-content-between">
          <Col className="d-flex flex-column" md={3}>
            <p className="header">
              Top 100 <b>Albums</b>
            </p>
          </Col>
        </Row>
        <Row className="d-flex justify-content-start align-items-start">
          <Form as={Col} xs={8} md={6} lg={4}>
            <Form.Group controlId="search-group">
              <Form.Control
                placeholder="Search for Title ..."
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Row>
        {results}
      </Container>
    </div>
  );
};

export default MainView;
