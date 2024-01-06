// // ProductDetail.js

// import React from "react";
// import { useParams } from "react-router-dom";
// import data from '../data'

// const ProductDetail = () => {

//   const { productId } = useParams();
//   const product = data.find((item) => item.id === parseInt(productId, 10));
//   console.log('Selected Product:', product);

//   if (!product) {
//     // Handle the case where the product is not found
//     console.error("Error Not Found");
//   }
//   // Continue with rendering the product details

//   return (
//     <div>
//       <img src={data.image} alt="not found" />
//       <h2>{data.title}</h2>
//       <p>{data.description}</p>
//       <p>{`Category: ${data.category}`}</p>
//       <p>{`Price: $${data.price}`}</p>
//       {data.rating && (
//         <div>
//           <p>{`Rating: ${data.rating.rate}`}</p>
//           <p>{`Available Count: ${data.rating.count}`}</p>
//         </div>
//       )}
//       {/* Add more details as needed */}
//     </div>
//   );
// };

// export default ProductDetail;

// ProductDetail.js

import React from "react";
import { Link, useParams } from "react-router-dom";
import data from "../data";
import StarRating from "./StartRating";

const ProductDetail = ({ addToCart }) => {
  const { productId } = useParams();
  const product = data.find((item) => item.id === parseInt(productId, 10));
  console.log("Selected Product:", product);

  if (!product) {
    // Handle the case where the product is not found
    console.error("Error Not Found");
  }

  // Continue with rendering the product details
  return (
    <div className="singlePageDetails-container">
      {product && (
        <>
          <div className="singlePageimg">
            <img src={product.image} alt="not found" />
          </div>
          <div className="singlePageDetails">
            <h2>{product.title}</h2>
            <br />
            <strong>{"Product Details: "}</strong>
            <p>{product.description}</p>
            <br />
            <strong>{"Category: "}</strong>
            <p>{`${product.category}`}</p>
            <br />
            <strong>{"Price: "}</strong> <p>{`$${product.price}`}</p>
            <br />
            {product.rating && (
              <div>
                {/* <p style={{ marginRight: "10px" }}>
                  <strong>{`Rating: `}</strong>
                  {`${product.rating.rate}`}
                </p>
                <br /> */}
                <div style={{ display: "flex", alignItems: "center",margin:"-10px 0 -25px" }}>
                  <p style={{ marginRight: "10px" }}>
                    <strong>{`Rating: `}</strong>
                    {`${product.rating.rate}`}
                  </p>
                  <p>
                    <StarRating rating={product.rating.rate} />
                  </p>
                </div>
                <p>
                  <strong>{`Available Count: `}</strong>
                  {`${product.rating.count}`}
                </p>
              </div>
            )}
            <div className="buttons">
              <Link to="/">
                <button className="backtohome">Back to Home</button>
              </Link>
              <button className="addtocart2" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
