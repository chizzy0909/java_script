import React from "react";
//import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

//import "./header.styles.scss";
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink,
} from "./header.styles";

// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { useSelector } from "react-redux";

const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  const hidden = useSelector(selectCartHidden);
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/shop">CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink as="div" onClick={() => auth.signOut()}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
      {hidden ? null : <CartDropdown />}
    </HeaderContainer>
  );
};

// const Header = ({ currentUser, hidden }) => (
//   <div className="header">
//     <Link className="logo-container" to="/">
//       <Logo className="logo" />
//     </Link>
//     <div className="options">
//       <Link className="option" to="/shop">
//         SHOP
//       </Link>
//       <Link className="option" to="/shop">
//         CONTACT
//       </Link>
//       {currentUser ? (
//         <div className="option" onClick={() => auth.signOut()}>
//           SIGN OUT
//         </div>
//       ) : (
//         <Link className="option" to="/signin">
//           SIGN IN
//         </Link>
//       )}
//       <CartIcon />
//     </div>
//     {hidden ? null : <CartDropdown />}
//   </div>
// );

// const mapStateToProps = (state) => ({
//   currentUser: state.user.currentUser,
// });

// const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
//   currentUser,
//   hidden,
// });
// 写完记得上面Header传参,最后写CartDropdown的三目
// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
//   hidden: selectCartHidden,
// });

export default Header;
