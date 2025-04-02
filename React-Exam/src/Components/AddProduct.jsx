import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddMovieAsync } from "../Service/action/movie.action";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import uploadImage from "../Service/imageUpload";

const AddMovie = () => {
    const dispatch = useDispatch();
    const { isCreated } = useSelector(state => state.movieReducer);
    const navigate = useNavigate();

    const [inputData, setInputData] = useState({
        title: "",
        genre: "",
        description: "",
        release_year: "",
        poster_image: ""
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let errors = {};

        if (!inputData.title.trim()) {
            errors.title = "Movie Title is required";
        }
        if (!inputData.genre.trim()) {
            errors.genre = "Genre is required";
        }
        if (!inputData.description.trim()) {
            errors.description = "Description is required";
        }
        if (!inputData.release_year.trim()) {
            errors.release_year = "Release Year is required";
        } else if (isNaN(inputData.release_year) || inputData.release_year.length !== 4) {
            errors.release_year = "Enter a valid year";
        }
        if (!inputData.poster_image.trim()) {
            errors.poster_image = "Movie Poster URL is required";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChanged = (e) => {
        const { name, value } = e.target;
        setInputData({
            ...inputData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(AddMovieAsync({ ...inputData }));
        }
    };

    useEffect(() => {
        if (isCreated) {
            dispatch({ type: "RESET_CREATE" }); 
            navigate("/");
        }
    }, [isCreated, navigate, dispatch]);

    const handleImage = async (e) => {
        let file = e.target.files[0];
        if (!file) return;
        let url = await uploadImage(file);
        setInputData({
            ...inputData,
            poster_image: `${url}`
        });
    };

    return (
        <Container className="mt-3 add-container">
            <h2 className="mb-4 add-data">Add Movie</h2>
            <Form onSubmit={handleSubmit} className="form-group-field">
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Movie Title</Form.Label>
                    <Col sm="7">
                        <Form.Control
                            type="text"
                            name="title"
                            value={inputData.title}
                            onChange={handleChanged}
                            placeholder="Enter Movie Title"
                        />
                        {errors.title && <small className="text-danger">{errors.title}</small>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Genre</Form.Label>
                    <Col sm="7">
                        <Form.Control
                            type="text"
                            name="genre"
                            value={inputData.genre}
                            onChange={handleChanged}
                            placeholder="Enter Genre"
                        />
                        {errors.genre && <small className="text-danger">{errors.genre}</small>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Description</Form.Label>
                    <Col sm="7">
                        <Form.Control
                            name="description"
                            value={inputData.description}
                            onChange={handleChanged}
                            type="text"
                            placeholder="Enter Movie Description"
                        />
                        {errors.description && <small className="text-danger">{errors.description}</small>}
                    </Col>
                </Form.Group>
                
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Release Year</Form.Label>
                    <Col sm="7">
                        <Form.Control
                            type="text"
                            name="release_year"
                            value={inputData.release_year}
                            onChange={handleChanged}
                            placeholder="Enter Release Year"
                        />
                        {errors.release_year && <small className="text-danger">{errors.release_year}</small>}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">Movie Poster</Form.Label>
                    <Col sm="4">
                        <Form.Control type="file" name="poster_image" onChange={handleImage} />
                    </Col>
                </Form.Group>

                <Button className="add-button" variant="success" type="submit">Add Movie</Button>
            </Form>
        </Container>
    );
};

export default AddMovie;
