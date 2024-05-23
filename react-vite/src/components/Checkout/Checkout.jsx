// import { useEffect } from "react";
// import {
//   addToCartThunk,
//   decrementCartItemThunk,
//   deletefromCartThunk,
//   setCartState,
// } from "../../redux/cart";
// import { GoTrash } from "react-icons/go";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { loadRestaurantsThunk } from "../../redux/restaurant";
// // import { useSelector } from "react-redux";
// export const Checkout = () => {
//   let navigate = useNavigate();
//   let user = useSelector((state) => state.session?.user);
//   let cartState = localStorage.getItem("cartState");
//   let cartItems = Object.values(JSON.parse(cartState));
//   console.log(cartItems);
//   let dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(loadRestaurantsThunk());
//   }, [dispatch]);
//   let restaurants = useSelector((state) => state.restaurantReducer);
//   restaurants = [...Object.values(restaurants)];
//   let menuItems = [];
//   restaurants?.forEach((restaurant) =>
//     menuItems.push(...restaurant.menu_items)
//   );
//   //   console.log(menuItems);
//   return (
//     <>
//       {/* <h1>Hi</h1>
//       {cartItems.map((item) => (
//         <>
//           <div key={item.id}>
//             <b style={{ marginLeft: "12px" }}>
//               {menuItems?.find((thing) => thing.id === item.id)?.restaurant}
//             </b>
//             <p style={{ marginLeft: "12px" }}>
//               {menuItems.find((thing) => thing.id === item.id).name}{" "}
//             </p>{" "}
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 marginLeft: "12px",
//               }}
//             >
//               <p>Quantity: {item.count}</p>
//               <p style={{ marginRight: "12px" }}>
//                 $
//                 {menuItems.find((thing) => thing.id === item.id).price *
//                   item.count}{" "}
//               </p>
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 marginLeft: "12px",
//                 gap: "14px",
//                 alignItems: "center",
//               }}
//             >
//               <button
//                 // className="dot"
//                 style={{
//                   fontSize: "34px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignContent: "center",
//                   paddingBottom: "5px",
//                   backgroundColor: "rgb(99, 59, 99)",
//                   color: "white",
//                   borderRadius: "50%",
//                   height: "30px",
//                   width: "30px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   flexWrap: "wrap",
//                   fontSize: "20px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => dispatch(addToCartThunk(item.id))}
//               >
//                 +
//               </button>
//               <button
//                 // className="dot"
//                 style={{
//                   //   fontSize: "34px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignContent: "center",
//                   paddingBottom: "5px",
//                   backgroundColor: "rgb(99, 59, 99)",
//                   color: "white",
//                   borderRadius: "50%",
//                   height: "30px",
//                   width: "30px",
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   flexWrap: "wrap",
//                   fontSize: "20px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() =>
//                   item.count > 1
//                     ? dispatch(decrementCartItemThunk(item.id))
//                     : dispatch(deletefromCartThunk(item.id))
//                 }
//               >
//                 -
//               </button>
//               <GoTrash
//                 style={{
//                   fontSize: "24px",
//                   color: "rgb(99,59,99)",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => dispatch(deletefromCartThunk(item.id))}
//               />
//             </div>
//           </div>
//         </>
//       ))} */}
//     </>
//   );
// };

export function Checkout() {
  return (
    <>
      <h1>Thanks for your fucking order</h1>
    </>
  );
}
