// import { useParams } from "react-router-dom";
// import { FC } from "react";
// import "./SelectedProduct.scss";
// import { useAppDispatch } from "../../hooks/redux";
// import { basketSlice } from "../../store/reducers/BasketSlice";
// import { IProduct } from "../../types/dataTypes";

// const SelectedProduct: FC = () => {
//   const dispatch = useAppDispatch();
//   const handleAddToBasket = (product: any) => {
//     dispatch(basketSlice.actions.addToBasket(product));
//   };
//   const { id } = useParams();
//   const {
//     data: product,
//     isLoading,
//     error,
//   } = apiService.useFetchProductByIdQuery(id);
//   return (
//     <>
//       <Layout
//         basket={true}
//         backButton={true}
//         title={product && product[0].name}
//       >
//         {isLoading && <h1>идет загрузка</h1>}
//         {error && <h1>произошла ошибка</h1>}
//         <div className="container">
//           {product && (
//             <>
//               <img className="image" alt="" src={product[0].image1} />
//               <div className="text-content">
//                 <h3>{product[0].name}</h3>
//                 <p className="price">{product[0].price} руб</p>
//                 <p className="description">
//                   MagSafe Wireless Charging support with up to 15 Watts A14
//                   Bionic Chip Processor lets you install and run as many apps as
//                   you like LiDAR Scanner enables the device to take better
//                   portrait mode photos in low-light conditions Super Retina XDR
//                   Display is more immersive giving awesome clarity defining
//                   every details
//                 </p>
//                 <button onClick={handleAddToBasket} className="add-to-basket">
//                   Добавить в корзину
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </Layout>
//     </>
//   );
// };

export {};
