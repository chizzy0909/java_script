import React from "react";
//import "./homepage.styles.scss";

import Directory from "../../components/directoty/directory.component";

import { HomePageContainer } from "./homepage.styles";

const HomePage = () => (
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
);

// 单行语句用（）；多行用{}需要加return
// const HomePage = () => {
//   return (
//     <div className="homepage">
//       <Directory></Directory>
//     </div>
//   );
// };

export default HomePage;
