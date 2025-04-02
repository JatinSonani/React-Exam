import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Table, Alert, Spinner, ButtonGroup } from "react-bootstrap";
import { removeFromWatchlist, increasePriority, decreasePriority, clearWatchlist } from "../Service/action/watchlist.action";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Watchlist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { watchlist } = useSelector((state) => state.watchlistReducer);

    const [clearing, setClearing] = useState(false);

    const handleClearWatchlist = async () => {
        setClearing(true);
        await dispatch(clearWatchlist());
        setClearing(false);
    };

    return (
        <Container className="mt-4">
            <h3 className="watchlist-title">🎥 Your Watchlist</h3>

            {watchlist.length > 0 ? (
                <Table striped bordered hover responsive className="mt-3 watchlist-table">
                    <thead className="text-center">
                        <tr>
                            <th>Poster</th>
                            <th>Movie</th>
                            <th>Genre</th>
                            <th>Priority</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {watchlist.map((movie) => (
                            <tr key={movie.id} className="text-center align-middle">
                                <td>
                                    <img
                                        src={
                                            movie.poster || "https://via.placeholder.com/100"
                                        }
                                        alt={movie.title}
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            objectFit: "cover",
                                            borderRadius: "5px",
                                        }}
                                    />
                                </td>
                                <td>{movie.title}</td>
                                <td>{movie.genre}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button
                                            variant="light"
                                            size="sm"
                                            onClick={() => dispatch(decreasePriority(movie.id))}
                                            disabled={movie.priority <= 1}
                                        >
                                            ➖
                                        </Button>
                                        <span
                                            className="mx-2"
                                            style={{ fontSize: "16px", fontWeight: "bold" }}
                                        >
                                            {movie.priority}
                                        </span>
                                        <Button
                                            variant="light"
                                            size="sm"
                                            onClick={() => dispatch(increasePriority(movie.id))}
                                        >
                                            ➕
                                        </Button>
                                    </ButtonGroup>
                                </td>

                                <td>
                                    <Button
                                        variant="danger"
                                        onClick={() => dispatch(removeFromWatchlist(movie.id))}
                                    >
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <h5 className="text-muted mt-3 text-center">
                    Your watchlist is empty. Add some movies to watch later!
                    <br />
                    <Button variant="primary" className="mt-3" onClick={() => navigate("/")}>⬅️ Go To Home</Button>
                </h5>
            )}

            {watchlist.length > 0 && (
                <>
                    <Button
                        variant="danger"
                        className="me-2"
                        onClick={handleClearWatchlist}
                        disabled={clearing}
                    >
                        {clearing ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />{" "}
                                Clearing...
                            </>
                        ) : (
                            "🗑 Clear Watchlist"
                        )}
                    </Button>

                    <Button variant="primary" onClick={() => navigate("/")}>⬅ Go To Home</Button>
                </>
            )}
        </Container>
    );
};

export default Watchlist;
