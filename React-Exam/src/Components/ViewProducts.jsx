import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getProductAsync } from "../Service/action/movieAction";
import { Button } from "react-bootstrap";
import { addToCart } from "../Service/action/cartAction";
import { FaShoppingCart } from "react-icons/fa";

const ViewProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product } = useSelector((state) => state.productReducer);

  useEffect(() => {
    if (id) {
      dispatch(getProductAsync(id));
    }
  }, [id, dispatch]);

  const handleChange = () => {
    navigate("/");
  };

  return (
    <div className="movie-view-container"> {/* Applying movie theme */}
      <h1 className="movie-title">🎬 Now Showing: {product?.product_name}</h1>
      {product ? (
        <div className="movie-product-card">
          <div className="movie-product-image">
            <img src={product.product_image} alt="Product" className="spotlight" />
          </div>
          <div className="movie-product-info">
            <h2 className="movie-subtitle">🎟 Ticket for: {product.product_name}</h2>
            <hr className="movie-divider" />
            <h3 className="movie-price">💰 Price: ${product.product_price}</h3>
            <hr className="movie-divider" />
            <p className="movie-category">
              <strong>📌 Category:</strong> {product.category}
            </p>
            <hr className="movie-divider" />
            <p className="movie-description">📖 {product.product_description}</p>
            <div className="movie-buttons">
              <Button className="btn-back" onClick={handleChange}>
                ⏪ Go Back
              </Button>
              <Button
                className="btn-add-cart ms-4"
                onClick={() => dispatch(addToCart(product))}
                variant="warning"
              >
                🍿 Add To Cart
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <p className="error-message">🚫 No product found!</p>
      )}
    </div>
  );
};

export default ViewProduct;
