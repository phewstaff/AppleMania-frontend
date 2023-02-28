// import { images } from "../../assets/images/constants";
// import { useAppDispatch, useAppSelector } from "../../hooks/redux";
// import "./Basket.scss";

// const Basket = () => {
//   const basketProducts = useAppSelector((state) => state.basketSlice.products);
//   return (
//     <div className="basket-container">
//       {basketProducts?.map((item) => (
//         <>
//           <img src={item.image1} alt="" className="product-img" />
//           <p className="name">{item.name}</p>
//           <div className="product-actions">
//             <div className="actions-left">
//               <p className="quantity">{item.quantity}</p>
//             </div>
//             <div className="actions-left">
//               <div className="count-actions-container">
//                 <img src={images.minusButton} alt="" />
//                 <img src={images.plusButton} alt="" />
//               </div>
//             </div>
//           </div>
//         </>
//       ))}
//     </div>
//   );
// };

// export default Basket;

export {};
