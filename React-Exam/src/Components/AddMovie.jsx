import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddMovieAsync } from "../Service/action/movieAction";
import { Button, Col, Container, Form, Row, Card, Image } from "react-bootstrap";
import "../assets/AddMovie.css";

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
    const [previewImage, setPreviewImage] = useState(null);

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

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
            setInputData({
                ...inputData,
                poster_image: reader.result
            });
        };
        reader.readAsDataURL(file);
    };

    return (
        <Container className="mt-4 d-flex justify-content-center">
            <Card className="p-4 shadow-lg" style={{ width: "50rem" }}>
                <h2 className="mb-4 text-center text-primary">🎬 Add a New Movie</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Movie Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={inputData.title}
                            onChange={handleChanged}
                            placeholder="Enter Movie Title"
                        />
                        {errors.title && <small className="text-danger">{errors.title}</small>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control
                            type="text"
                            name="genre"
                            value={inputData.genre}
                            onChange={handleChanged}
                            placeholder="Enter Genre"
                        />
                        {errors.genre && <small className="text-danger">{errors.genre}</small>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={inputData.description}
                            onChange={handleChanged}
                            placeholder="Enter Movie Description"
                        />
                        {errors.description && <small className="text-danger">{errors.description}</small>}
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                        <Form.Label>Release Year</Form.Label>
                        <Form.Control
                            type="text"
                            name="release_year"
                            value={inputData.release_year}
                            onChange={handleChanged}
                            placeholder="Enter Release Year (e.g., 2023)"
                        />
                        {errors.release_year && <small className="text-danger">{errors.release_year}</small>}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Movie Poster</Form.Label>
                        <Form.Control type="file" name="poster_image" onChange={handleImage} />
                        {errors.poster_image && <small className="text-danger">{errors.poster_image}</small>}
                        {previewImage && (
                            <Image src={previewImage} alt="Movie Poster" className="mt-3" fluid rounded style={{ maxHeight: "250px" }} />
                        )}
                    </Form.Group>

                    <Button className="w-100" variant="success" type="submit">Add Movie</Button>
                </Form>
            </Card>
        </Container>
    );
};

export default AddMovie;
