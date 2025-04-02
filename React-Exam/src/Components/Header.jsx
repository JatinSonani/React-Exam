import { useState } from "react";
import { Navbar, Button, Card, Row, Col, Container } from "react-bootstrap";
import { FaSearch, FaBookmark, FaFilm } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOutAsync } from "../Servise/action/auth.action";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const movies = useSelector(state => state.movieReducer.movies);
    const { user } = useSelector(state => state.userReducer);
    const { watchlist } = useSelector(state => state.watchlistReducer);
    const watchlistCount = watchlist.length;

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleLogout = () => {
        dispatch(logOutAsync());
        navigate("/signin");
    };

    const handleLogin = () => {
        navigate("/signin");
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        const filtered = movies.filter(movie =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setSearchResults(filtered);
        setShowResults(true);
        setSearchQuery("");
    };

    const handleWatchlistClick = () => {
        navigate("/watchlist");
    };

    return (
        <>
            <div className="header">
                <div className="logo">
                    <Navbar.Brand href="/">
                        <FaFilm size={32} /> MovieMania
                    </Navbar.Brand>
                </div>

                <form className="search-bar" onSubmit={handleSearchSubmit}>
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search for Movies..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <Button type="submit" className="search-btn ms-2">Search</Button>
                </form>
                <nav>
                    <Link to="/now-playing">Now Playing</Link>
                    <Link to="/top-rated">Top Rated</Link>
                    <Link to="/genres">Genres</Link>
                </nav>
                <div className="header-options">
                    <div className="option">
                        {user ? <Button onClick={handleLogout}>LogOut</Button> : <Button onClick={handleLogin}>Login ▼</Button>}
                    </div>
                    <div className="option watchlist-btn" onClick={handleWatchlistClick}>
                        <FaBookmark size={24} />
                        {watchlistCount > 0 && <span className="watchlist-count">{watchlistCount}</span>}
                        <span className="watchlist-text">Watchlist</span>
                    </div>
                </div>
            </div>
            {showResults && (
                <Container className="mt-3">
                    <h3>Search Results</h3>
                    <Row>
                        {searchResults.length > 0 ? (
                            searchResults.map(movie => (
                                <Col key={movie.id} md={4} className="mb-3">
                                    <Card>
                                        <Card.Img variant="top" src={movie.poster || "https://via.placeholder.com/150"} />
                                        <Card.Body>
                                            <Card.Title>{movie.title}</Card.Title>
                                            <Card.Text>{movie.overview}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <h5 className="text-muted">No movies found.</h5>
                        )}
                    </Row>
                </Container>
            )}
        </>
    );
};

export default Header;
