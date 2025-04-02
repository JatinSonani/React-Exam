import { useEffect, useState } from "react";
import { Button, Container, Spinner, Card, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getAllMoviesAsync } from "../Service/action/movieAction";
import { FaEye, FaStar, FaList } from "react-icons/fa";
import { addToWatchlist } from "../Service/action/watchlistActions";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movies, isLoading } = useSelector((state) => state.movieReducer);
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 9;
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllMoviesAsync());
    const timer = setTimeout(() => setIsPageLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortOption === "rating") return b.rating - a.rating;
    if (sortOption === "release") return new Date(b.release_date) - new Date(a.release_date);
    if (sortOption === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = sortedMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(sortedMovies.length / moviesPerPage);

  return (
    <Container className="mt-3">
      {isPageLoading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
          <h5 className="mt-3">Loading Movies...</h5>
        </div>
      ) : (
        <>
          <h1>Now Showing</h1>

          <Form className="d-flex mb-3">
            <Form.Select className="ms-2" onChange={(e) => setSortOption(e.target.value)}>
              <option value="">Sort By...</option>
              <option value="rating">Rating</option>
              <option value="release">Release Date</option>
              <option value="title">Title A-Z</option>
            </Form.Select>
          </Form>

          {isLoading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <h5 className="mt-3">Loading Movies...</h5>
            </div>
          ) : currentMovies.length > 0 ? (
            <Row>
              {currentMovies.map((movie) => (
                <Col key={movie.id} md={4} className="mb-3">
                  <Card>
                    <Card.Img variant="top" src={movie.poster || "https://via.placeholder.com/150"} />
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <Card.Text>Rating: {movie.rating} <FaStar color="gold" /></Card.Text>
                      <Card.Text>Release Date: {movie.release_date}</Card.Text>
                      <div>
                        <Button onClick={() => navigate(`/view/${movie.id}`)}><FaEye /> View</Button>
                        <Button onClick={() => dispatch(addToWatchlist(movie))} className="ms-2" variant="warning"><FaList /> Watchlist</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <h4 className="text-center text-muted">No movies found!</h4>
          )}

          <div className="pagination mt-4 d-flex justify-content-center">
            <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
            <span className="mx-3">Page {currentPage} of {totalPages}</span>
            <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Home;
