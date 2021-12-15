import React from "react";
import { Route, Routes, useParams } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
//import CollectionPage from "../collection/collection.component";

const ShopPage = (params) => {
  params = useParams();
  console.log(params);

  return (
    <div className="shop-page">
      <Routes>
        <Route exact path="/" element={<CollectionsOverview />} />
        {/* <Route path="/collectionId" element={<CollectionPage />} /> */}
      </Routes>
    </div>
  );
};

export default ShopPage;

// import React from "react";
// //import Shop_Data from "../../redux/shop/shop.data";
// import CollectionPreview from "../../components/collection-preview/collection-preview.component";
// import { selectCollections } from "../../redux/shop/shop.selectors";

// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

// //import { Route } from "react-router-dom";
// //import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
// //import CollectionPage from "../collection/collection.component";

// // class ShopPage extends React.Component {
// //   constructor(props) {
// //     super(props);

// //     this.state = {
// //       collections: Shop_Data,
// //     };
// //   }

// //   render() {
// //     const { collections } = this.state;
// //     return (
// //       <div className="shop-page">
// //         {collections.map(({ id, ...otherItemProps }) => (
// //           <CollectionPreview key={id} {...otherItemProps}></CollectionPreview>
// //         ))}
// //       </div>
// //     );
// //   }
// // }

// const ShopPage = ({ collections }) => (
//   <div className="shop-page">
//     {collections.map(({ id, ...otherItemProps }) => (
//       <CollectionPreview key={id} {...otherItemProps}></CollectionPreview>
//     ))}
//   </div>
// );

// const mapStateToProps = createStructuredSelector({
//   collections: selectCollections,
// });

// export default connect(mapStateToProps)(ShopPage);
