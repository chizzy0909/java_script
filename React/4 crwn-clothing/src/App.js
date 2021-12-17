
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import './App.css';
import HomePage from './pages/homepage/homepage.component'; //下面是function 这里HomePage就不要包{}
import ShopPage from './pages/shoppage/shoppage.component';
import ShopPageDetail from './pages/shoppage/shopPageDetail.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
// import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils';

// import { connect } from 'react-redux';
import { checkUserSession } from './redux/user/user.actions'

// import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';

// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentUser } from './redux/user/user.actions';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';


const App = () => {

  const currentUser = useSelector(selectCurrentUser);
  // const isHidden = useSelector((state) => state.cart.hidden);
  const dispatch = useDispatch();
  // const checkUserSessionHandler = () => dispatch(checkUserSession());


  let unsubscribeFromAuth = null;

  useEffect(() => {
    dispatch(checkUserSession());

    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      dispatch(setCurrentUser(userAuth));
    });

    return () => {
      unsubscribeFromAuth();
    };

  }, [dispatch]);



  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/:shop/*" element={<ShopPage />} />
        <Route path="/shop/:collectionId/*" element={<ShopPageDetail />} />
        {currentUser
          ? <Route exact render={() => <Navigate to='/' />} />
          : <Route exact path='/signin' element={<SignInAndSignUpPage />} />
        }
        <Route exact path='/checkout' element={<CheckoutPage />} />
      </Routes>
    </div>
  );

}


export default App;

// class App extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       currentUser: null
//     };
//   }

//   unsubscribeFromAuth = null;

//   // componentDidMount() {
//   //   this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
//   //     this.setState({ currentUser: user });
//   //     console.log(user);
//   //   });
//   // }
//   componentDidMount() {

//     const { setCurrentUser, collectiomArray } = this.props;//

//     this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
//       if (userAuth) {
//         const userRef = await createUserProfileDocument(userAuth);

//         userRef.onSnapshot(snapShot => {
//           // this.setState({
//           //   currentUser: {
//           //     id: snapShot.id,
//           //     ...snapShot.data()
//           //   }
//           // });

//           // console.log(this.state);

//           setCurrentUser({
//             id: snapShot.id,
//             ...snapShot.data()
//           });

//         });
//       }

//       //this.setState({ currentUser: userAuth });
//       setCurrentUser(userAuth);
//       addCollectionAndDocuments('collections', collectiomArray.map(({ title, items }) => ({ title, items })));

//     });
//   }

//   componentWillUnmount() {
//     this.unsubscribeFromAuth();
//   }

//   render() {
//     return (
//       <div>
//         {/* <Header currentUser={this.state.currentUser} /> */}
//         <Header />

//         <Routes>
//           <Route exact path="/" element={<HomePage />} />
//           <Route path="/:shop/*" element={<ShopPage />} />
//           <Route path="/shop/:collectionId/*" element={<ShopPageDetail />} />
//           {/* <Route path='/signin' element={<SignInAndSignUpPage />} /> */}
//           {/* <Route exact path="/signin"
//             render={() =>
//               this.props.currentUser ?
//                 <Navigate to='/' /> : <SignInAndSignUpPage />
//             }
//           /> */}
//           if(this.props.currentUser){
//             <Route exact render={() => <Navigate to='/' />} />
//           }else{
//             <Route exact path='/signin' element={<SignInAndSignUpPage />} />
//           }
//           <Route exact path='/checkout' element={<CheckoutPage />} />

//         </Routes>
//       </div>
//     );
//   }
// }

// // const mapStateToProps = ({ user }) => ({
// //   currentUser: user.currentUser
// // });
// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
//   collectiomArray: selectCollectionsForPreview
// });

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// });


// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);





