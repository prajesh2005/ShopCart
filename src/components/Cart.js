// import { useEffect, useState } from "react";

// const Cart = ({ cart }) => {
//   const [pricart, setPriCart] = useState([]);

//   useEffect(() => {
//     setPriCart(cart);
//   }, [cart]);

//   return (
//     <section className="card-div">
//       <div className="container mt-5 bg-light">
//         {pricart?.map((cartItem, cartIndex) => {
//           return (
//             <div key={cartItem.id} className="addtocart">
//               <div className="row text-center align-items-center m-3">
//                 <div className="col-md-3">
//                   <img
//                     src={cartItem.image}
//                     alt="error"
//                     style={{ width: 70 }}
//                     className="mt-3 mb-3"
//                   />
//                 </div>
//                 <div className="col-md-3 ">
//                   <span> {cartItem.title} </span>
//                 </div>
//                 <div className="col-md-3">
//                   <button
//                     onClick={() => {
//                       const _card = pricart.map((item, index) => {
//                         return cartIndex === index
//                           ? {
//                               ...item,
//                               quantity:
//                                 item.quantity > 0 ? item.quantity - 1 : 0,
//                             }
//                           : item;
//                       });
//                       setPriCart(_card);
//                     }}
//                   >
//                     -
//                   </button>
//                   <span> {cartItem.quantity} </span>
//                   <button
//                     onClick={() => {
//                       const _card = pricart.map((item, index) => {
//                         return cartIndex === index
//                           ? { ...item, quantity: item.quantity + 1 }
//                           : item;
//                       });
//                       setPriCart(_card);
//                     }}
//                   >
//                     +
//                   </button>
//                 </div>
//                 <div className="col-md-3">
//                   <span> Rs. {cartItem.price * cartItem.quantity} </span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//         <div className="row">
//           <div className="col-12 bg-dark text-end text-white p-3">
//             <h2 style={{ paddingLeft: 50 }}>
//               {" "}
//               Final Total :
//               {pricart
//                 .map((item) => item.price * item.quantity)
//                 .reduce((total, value) => total + value, 0)}
//             </h2>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;
