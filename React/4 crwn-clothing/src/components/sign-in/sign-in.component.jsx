import React, { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.componemt";
import CustomButton from "../custom-button/custom-button.component";

// import { connect } from "react-redux";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";

//import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import { signInWithGoogle } from "../../firebase/firebase.utils";
import "./sign-in.styles.scss";

const SignIn = () => {
  const [userCredentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(googleSignInStart());
    dispatch(emailSignInStart(email, password));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2 className="title">I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <div className="buttons">
          <CustomButton type="submit"> Sign in </CustomButton>
          <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            Sign in with Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

// class SignIn extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: "",
//       password: "",
//     };
//   }

//   handleSubmit = async (event) => {
//     event.preventDefault();

//     const { email, password } = this.state;

//     try {
//       await auth.signInWithEmailAndPassword(email, password);
//       this.setState({ email: "", password: "" });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   handleChange = (event) => {
//     const { value, name } = event.target;

//     this.setState({ [name]: value });
//   };

//   render() {
//     return (
//       <div className="sign-in">
//         <h2>I already have an account</h2>
//         <span>Sign in with your email and password</span>

//         <form onSubmit={this.handleSubmit}>
//           <FormInput
//             name="email"
//             type="email"
//             handleChange={this.handleChange}
//             value={this.state.email}
//             label="email"
//             required
//           />
//           <FormInput
//             name="password"
//             type="password"
//             value={this.state.password}
//             handleChange={this.handleChange}
//             label="password"
//             required
//           />
//           <div className="buttons">
//             <CustomButton type="submit"> Sign in </CustomButton>
//             <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
//               Sign in with Google
//             </CustomButton>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

export default SignIn;

// const mapDispatchToProps = (dispatch) => ({
//   googleSignInStart: () => dispatch(googleSignInStart()),
//   emailSignInStart: (email, password) =>
//     dispatch(emailSignInStart({ email, password })),
// });

// export default connect(null, mapDispatchToProps)(SignIn);
