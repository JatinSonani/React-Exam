import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getMovieAsync, updateMovieAsync } from "../Service/action/movie.action";

const EditMovie = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { movie, isUpdated } = useSelector(state => state.movieReducer);
    const navigate = useNavigate();
    
    const [inputData, setInputData] = useState({
        id: "",
        title: "",
        genre: "",
        director: "",
        release_date: "",
        poster_image: ""
    });

    const handleChanged = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateMovieAsync(id, inputData));
    };

    useEffect(() => {
        if (isUpdated) {
          dispatch({ type: "RESET_UPDATE" }); 
          navigate("/"); 
        }
    }, [isUpdated, navigate, dispatch]);

    useEffect(() => {
        if (id) {
            dispatch(getMovieAsync(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (movie) {
            setInputData(movie);
        }
    }, [movie]);

    const handleImage = async (e) => {
        let file = e.target.files[0];
        if (!file) return;
    
        try {
            let url = await uploadImage(file);
            setInputData((prev) => ({
                ...prev,
                poster_image: url
            }));
        } catch (error) {
            console.error("Image Upload Failed:", error);
        }
    };
    
    const uploadImage = async (file) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(URL.createObjectURL(file));
            }, 1000);
        });
    };

    return (
        <Container className="mt-3 edit-container">
            <h2 className="mb-4 edit-data">Edit Movie</h2>
            <Form className="form-group-field" onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Title</Form.Label>
                    <Col sm="6">
                        <Form.Control type="text" name="title" value={inputData.title} onChange={handleChanged} placeholder="Enter Movie Title" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Director</Form.Label>
                    <Col sm="6">
                        <Form.Control type="text" name="director" value={inputData.director} onChange={handleChanged} placeholder="Enter Director Name" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Release Date</Form.Label>
                    <Col sm="6">
                        <Form.Control type="date" name="release_date" value={inputData.release_date} onChange={handleChanged} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Genre</Form.Label>
                    <Col sm="6">
                        <Form.Select name="genre" value={inputData.genre} onChange={handleChanged}>
                            <option value="">Select Genre</option>
                            <option value="Action">Action</option>
                            <option value="Drama">Drama</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Horror">Horror</option>
                            <option value="Sci-Fi">Sci-Fi</option>
                            <option value="Romance">Romance</option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Poster Image</Form.Label>
                    <Col sm="4">
                        <Form.Control type="file" name="poster_image" onChange={handleImage} />
                    </Col>
                </Form.Group>

                <div className="edit-btnn">
                    <Button onClick={() => navigate("/")}>Go Back</Button>
                    <Button className="edit-button" variant="success" type="submit">Edit Movie</Button>
                </div>
            </Form>
        </Container>
    );
};

export default EditMovie;