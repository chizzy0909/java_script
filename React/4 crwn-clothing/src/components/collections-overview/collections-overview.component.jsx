import React from "react";
//import { connect } from "react-redux";
//import { createStructuredSelector } from "reselect";

import CollectionPreview from "../collection-preview/collection-preview.component";

import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";
import { useSelector } from "react-redux";
import "./collections-overview.styles.scss";

const CollectionsOverview = () => {
  const collections = useSelector(selectCollectionsForPreview);

  // const collections = useSelector((state) =>
  //   Object.keys(state.shop.collections).map(
  //     (key) => state.shop.collections[key]
  //   )
  // );

  return (
    <div className="collections-overview">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

// const mapStateToProps = createStructuredSelector({
//   collections: selectCollectionsForPreview,
// });

export default CollectionsOverview;
