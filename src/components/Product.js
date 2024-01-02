// import React, { useState, useEffect } from "react";
// import "../App.css";
// import axios from "axios";

// const Product = ({ addToCart }) => {
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     setLoading(true);
//     axios({
//       method: "GET",
//       url: "https://fakestoreapi.com/products",
//     })
//       .then((res) => {
//         console.log(res.data);
//         setData(res.data);
//       })
//       .catch((err) => console.log(err))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="products-container">
//       {loading && (
//         <div>
//           {""}
//           <h1>Loading...</h1>
//         </div>
//       )}

//       {data.map((product) => (
//         <div key={product.id} className="card">
//           <div className="image">
//             <img src={product.image} alt={product.title} />
//           </div>
//           <div className="cards-description">
//             <h4>{product.id}</h4>
//             <div>
//               <h4>{`Product: `}</h4> <p>{`${product.title}`}</p>
//             </div>
//             <div>
//             <h4>{`Category: `}</h4>
//             <p>{`${product.category}`}</p>
//             </div>
//             <div>
//             <h4>{`Description: `}</h4>
//             <p>{`${product.description}`}</p>
//             </div>
//             <div>
//               <h4>{`Price: `}</h4>
//               <p>{`$${product.price}`}</p>
//             </div>
//             <p>
//               {product.rating && (
//                 <div>
//                   <h4>Rating:</h4> <p>{product.rating.rate}</p>
//                   <br />
//                   <h4>Count: </h4>
//                   <p>{product.rating.count}</p>
//                 </div>
//               )}
//             </p>
//           </div>
//           <button className="addtocart" onClick={() => addToCart(product)}>
//             Add to Cart
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Product;

import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";

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

  // const filterProducts = () => {
  //   return selectedCategory === "all"
  //     ? data
  //     : data.filter(
  //         (product) =>
  //           product.category.toLowerCase() === selectedCategory.toLowerCase()
  //       );
  // };

  const [sortOrder, setSortOrder] = useState("none"); // "asc" or "desc"
  const [sortedData, setSortedData] = useState([]);
  const [sortApplied, setSortApplied] = useState(false);

  const filterProducts = () => {
    return selectedCategory === "all"
      ? data
      : data.filter(
          (product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
  };

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

  const handleSortButtonClick = () => {
    setSortedData(sortProducts(data));
    setSortApplied(true);
  };




  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

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
{/* -- */}
        <div className="sort-container">
          <label className="sortLabel">
            Sort by Price:
            <select className="sort-select" onChange={(e) => setSortOrder(e.target.value)}>              
            <option value="default">None</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
            </select>
          </label>
          {/* <button className="sort-btn" onClick={handleSortButtonClick}>
            Apply Sorting
          </button> */}
        </div>

{/* -- */}

      <div className="products-container">
        {loading && (
          <div>
            {""}
            <h1>Loading...</h1>
          </div>
        )}

{/* -- */}

        {getCurrentPageProducts().map((product) => (
          <div key={product.id} className="card">
            {/* {data.map((product) => ( */}
            {/* <div key={product.id} className="card"> */}
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

{/* -- */}
      <div className="pagination-container">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
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
          Next
        </button>
      </div>

      {/* <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}>
            <a class="page-link" href="#">Prev</a>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
    <li class="page-item">
      <a class="page-link" href="#">1</a>
      </li>
    <li class="page-item">
      <a class="page-link" href="#">2</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">3</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav> */}
{/* -- */}
    </div>
  );
};

export default Product;
