import React, { useState, useEffect } from "react";
import "../App.css";

const Filter = ({etSelectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");


  let isClicked=false;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const filterProducts = () => {
    return selectedCategory === "all"
      ? products
      : products.filter(
          (product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
  };

  return (
    <div>
      <div className="filter-container">
        <button
          value="all"
          className="filter-btn"
          onClick={() => setSelectedCategory("all")}
        >
          All
        </button>
        <button
          value="men's"
          onClick={() => setSelectedCategory("men's clothing")}
          className="filter-btn"
        >
          Men's Wear
        </button>
        <button
          value="women's"
          onClick={() => setSelectedCategory("women's clothing")}
          className="filter-btn"
        >
          Women's Wear
        </button>
        <button
          value="jewelery"
          onClick={() => setSelectedCategory("jewelery")}
          className="filter-btn"
        >
          Jewellery
        </button>
        <button
          value="electronics"
          onClick={() => setSelectedCategory("electronics")}
          className="filter-btn"
        >
          Electronics
        </button>
      </div>
      <div>
        <ul>
          {filterProducts().map((product) => (
            <li key={product.id}>
              {product.title} - {product.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Filter;
