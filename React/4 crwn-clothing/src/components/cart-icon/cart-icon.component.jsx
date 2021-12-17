import React from "react";

//import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";

import { useDispatch, useSelector } from "react-redux";

const CartIcon = () => {
  const cartItemsCount = useSelector(selectCartItemsCount);
  const dispatch = useDispatch();

  return (
    <div className="cart-icon" onClick={() => dispatch(toggleCartHidden())}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartItemsCount}</span>
    </div>
  );
};

export default CartIcon;

// const mapDispatchToProps = (dispatch) => ({
//   toggleCartHidden: () => dispatch(toggleCartHidden()),
// });

// const mapStateToProps = ({ cart: { cartItems } }) => {
//   //console.log({ cartItems });
//   return {
//     itemCount: cartItems.reduce(
//       (accumalatedQuantity, cartItem) =>
//         accumalatedQuantity + cartItem.quantity,
//       0
//     ),
//   };
// };

// const mapStateToProps = (state) => ({
//   itemCount: selectCartItemsCount(state),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);

//往上传参数
//写完后在root-reducer中添加。
//回到header
