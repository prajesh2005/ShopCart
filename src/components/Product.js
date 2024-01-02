import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";

const Product = ({ addToCart }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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

  return (
    <div className="products-container">
      {loading && (
        <div>
          {""}
          <h1>Loading...</h1>
        </div>
      )}

      {data.map((product) => (
        <div key={product.id} className="card">
          <div className="image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="cards-description">
            <h4>{product.id}</h4>
            <div>
              <h4>{`Product: `}</h4> <p>{`${product.title}`}</p>
            </div>
            <div>
            <h4>{`Category: `}</h4>
            <p>{`${product.category}`}</p>
            </div>
            <div>
            <h4>{`Description: `}</h4>
            <p>{`${product.description}`}</p>
            </div>
            <div>
              <h4>{`Price: `}</h4>
              <p>{`$${product.price}`}</p>
            </div>
            <p>
              {product.rating && (
                <div>
                  <h4>Rating:</h4> <p>{product.rating.rate}</p>
                  <br />
                  <h4>Count: </h4>
                  <p>{product.rating.count}</p>
                </div>
              )}
            </p>
          </div>
          <button className="addtocart" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Product;
