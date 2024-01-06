import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import StarRating from "./StartRating";

const Product = ({ addToCart }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: "https://fakestoreapi.com/products",
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const [sortOrder, setSortOrder] = useState("none"); // "asc" or "desc"
  const [searchInput, setSearchInput] = useState(""); // New state for search input

  const filterProducts = () => {
    let filteredProducts =
      selectedCategory === "all"
        ? data
        : data.filter(
            (product) =>
              product.category.toLowerCase() === selectedCategory.toLowerCase()
          );

    // Filter based on search input
    if (searchInput.trim() !== "") {
      const searchTerm = searchInput.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      );
    }

    return filteredProducts;
  };

  // sorting logic
  const sortProducts = (products) => {
    if (sortOrder === "asc" || sortOrder === "desc") {
      return products.slice().sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;

        return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
      });
    } else {
      return products; // Return original array when "None" is selected
    }
  };

  // pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Calculate total number of pages
  const totalPages = Math.ceil(filterProducts().length / productsPerPage);

  // Get products for the current page
  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return sortProducts(filterProducts()).slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div>
        {/* filter buttons */}
        <Nav className="justify-content-center" activeKey="/home">
          <Button
            variant="dark"
            value="all"
            className="filter-btn"
            onClick={() => setSelectedCategory("all")}
          >
            All
          </Button>
          <Button
            variant="dark"
            eventKey="link-1"
            value="men's"
            onClick={() => setSelectedCategory("men's clothing")}
            className="filter-btn"
          >
            Men's Wear
          </Button>
          <Button
            variant="dark"
            eventKey="link-2"
            value="women's"
            onClick={() => setSelectedCategory("women's clothing")}
            className="filter-btn"
          >
            Women's Wear
          </Button>
          <Button
            variant="dark"
            eventKey="link-2"
            value="jewelery"
            onClick={() => setSelectedCategory("jewelery")}
            className="filter-btn"
          >
            Jewellery
          </Button>
          <Button
            variant="dark"
            eventKey="disabled"
            value="electronics"
            onClick={() => setSelectedCategory("electronics")}
            className="filter-btn"
          >
            Electronics
          </Button>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </Nav>
      </div>

      <div>
        {/* -sort logic- */}
        <div className="border d-flex align-items-center justify-content-center">
          <div className="sort-container">
            <label className="sortLabel">
              Sort by Price:
              <select
                className="sort-select"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">None</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </label>
          </div>
        </div>

        {/* -Loading....- */}

        <div className="products-container">
          {loading && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1 style={{ marginRight: "10px" }}>Loading</h1>
              <BeatLoader
                color="black"
                margin={3}
                size={15}
                speedMultiplier={0.4}
              />
            </div>
          )}

          {/* -pagination + product display- */}
          {getCurrentPageProducts().map((product) => (
            <>
              <Card
                key={product.id}
                style={{ maxWidth: "400px", width: "100%" }}
              >
                {/* <Card.Img
                  className="mx-auto"
                  variant="top"
                  src={product.image}
                  id="img"
                /> */}
                 <Link to={`/product/${product.id}`}>
                  <Card.Img
                    className="mx-auto"
                    variant="top"
                    src={product.image}
                    id="img"
                    style={{ display: "flex" }}
                  />
                </Link>
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    <strong>{`Category: `}</strong>
                    {`${product.category}`}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>{`M.R.P.:`}</strong> {`$${product.price}`}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {product.rating && (
                      <div>
                        <strong>{"Rating: "}</strong>
                        <p>{`${product.rating.rate}`}</p>
                        <br />
                        <strong>{"Available Count: "}</strong>
                        <p>{`${product.rating.count}`}</p>
                      </div>
                    )}
                  </ListGroup.Item>
                </ListGroup>

                <Card.Body>
                  <Button
                    className="addtocart"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                  <Link to={`/product/${product.id}`}>
                    <Button variant="success" className="viewdetails">
                      View Details
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </>
          ))}
        </div>

        {/* -pagination logic- */}
        <div className="pagination-container">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {" "}
            <i class="fa-solid fa-backward"></i> Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next <i class="fa-solid fa-forward"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
