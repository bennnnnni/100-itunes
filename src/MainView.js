import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./MainView.scss";
import ResultsArea from "./results/resultsArea";
import { fetchAlbums } from "./fetchAlbums";

const MainView = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState(null);
  const [filteredAlbums, setFilteredAlbums] = useState(null);
  const [advancedAlbums, setAdvancedAlbums] = useState(null);
  const [searchFields, setSearchFields] = useState({
    artist: "",
    year: "",
    genre: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleTitleChange = e => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    const filterAlbums = albums =>
      albums.filter(album =>
        album["im:name"].label
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
    let filteredAlbums = filterAlbums(advancedAlbums ? advancedAlbums : albums);

    //reset filtered albums when search term is empty
    if (e.target.value === "") {
      filteredAlbums = null;
    }
    setFilteredAlbums(filteredAlbums);
  };

  const handleAdvancedSearchChange = e => {
    const fieldId = e.target.id;
    setSearchFields({ ...searchFields, [fieldId]: e.target.value });
  };

  const submitAdvancedSearch = () => {
    //start either with albums or filtered albums
    let startAlbums = filteredAlbums ? filteredAlbums : albums;

    if (searchFields.artist) {
      startAlbums = startAlbums.filter(album =>
        album["im:artist"].label
          .toLowerCase()
          .includes(searchFields.artist.toLowerCase())
      );
      setAdvancedAlbums(startAlbums);
    }

    if (searchFields.year) {
      startAlbums = startAlbums.filter(album =>
        album["im:releaseDate"].attributes.label
          .toLowerCase()
          .includes(searchFields.year.toLowerCase())
      );

      setAdvancedAlbums(startAlbums);
    }

    if (searchFields.genre) {
      startAlbums = startAlbums.filter(album =>
        album["category"].attributes.term
          .toLowerCase()
          .includes(searchFields.genre.toLowerCase())
      );

      setAdvancedAlbums(startAlbums);
    }

    //if all advanced filters are empty, set startAlbums back to filtered or unfiltered albums
    if (!searchFields.artist && !searchFields.year && !searchFields.genre) {
      setAdvancedAlbums(null);
    }
  };

  const resetSearch = () => {
    setSearchFields({
      artist: "",
      year: "",
      genre: "",
    });
    setFilteredAlbums(null);
    setAdvancedAlbums(null);
    setSearchTerm("");
  };

  // conditoinal rendering for the albums
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
    results = (
      <ResultsArea
        albums={
          advancedAlbums
            ? advancedAlbums
            : filteredAlbums
            ? filteredAlbums
            : albums
        }
      />
    );
  }

  return (
    <div className="root">
      <Container fluid>
        <Row className="d-flex justify-content-start align-items-start">
          <Accordion as={Col} xs={10} md={6} className="accordion">
            <Card className="search-card">
              <Card.Header>
                <Form onSubmit={e => e.preventDefault()}>
                  <Form.Group controlId="title">
                    <Form.Control
                      placeholder="Search for title"
                      onChange={handleTitleChange}
                      value={searchTerm}
                      className="form-input"
                    />
                  </Form.Group>
                </Form>
                <Row>
                  <Col>
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey="0"
                      className="link-button"
                    >
                      Advanced Search
                    </Accordion.Toggle>
                  </Col>
                </Row>
                <Row className="d-flex justify-content-start align-items-center">
                  <Col>
                    <Button
                      bsPrefix="button reset-button"
                      onClick={resetSearch}
                    >
                      Reset
                    </Button>
                    {Object.values(searchFields).map((filter, idx) => {
                      if (filter) {
                        return (
                          <div className="badge" key={idx}>
                            {filter}
                          </div>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </Col>
                </Row>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Form onSubmit={e => e.preventDefault()}>
                    <Row>
                      <Col>
                        <Form.Group controlId="artist">
                          <Form.Control
                            placeholder="Artist"
                            onChange={handleAdvancedSearchChange}
                            value={searchFields.artist}
                            className="form-input"
                          />
                          <Form.Text className="text-muted">
                            Search for artist
                          </Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Form.Group lg={6} as={Col} controlId="year">
                        <Form.Control
                          placeholder="Realease Year"
                          onChange={handleAdvancedSearchChange}
                          value={searchFields.year}
                          className="form-input"
                        />
                        <Form.Text className="text-muted">
                          Search for release year
                        </Form.Text>
                      </Form.Group>

                      <Form.Group lg={6} as={Col} controlId="genre">
                        <Form.Control
                          placeholder="Genre"
                          onChange={handleAdvancedSearchChange}
                          value={searchFields.genre}
                          className="form-input"
                        />
                        <Form.Text className="text-muted">
                          Search for genre
                        </Form.Text>
                      </Form.Group>
                    </Row>
                    <Row>
                      <Col>
                        <Button
                          bsPrefix="button"
                          onClick={submitAdvancedSearch}
                        >
                          Apply
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Row>
        {results}
      </Container>
    </div>
  );
};

export default MainView;
