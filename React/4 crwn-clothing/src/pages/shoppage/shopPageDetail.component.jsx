import React from "react";
import { useParams } from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import { useSelector } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";

import WithSpinner from "../../components/with-spinner/with-spinner.component";
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPageDetail = () => {
  let { collectionId } = useParams();
  // let params = useParams();
  // let id = params.collectionId;
  //console.log(collectionId);

  let collection = useSelector(selectCollection(collectionId));
  //console.log(collection);

  // let collection = useSelector((state) => {
  //   const arr = Object.keys(state.shop.collections).filter(
  //     (v) => v === collectionId
  //   );
  //   const key = arr[0];
  //   return state.shop.collections[key];
  // });

  return (
    <div className="shop-page">
      <CollectionPageWithSpinner key={collectionId} collection={collection} />
    </div>
  );
};

export default ShopPageDetail;
