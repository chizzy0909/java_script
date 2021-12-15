import React from "react";
import { useParams } from "react-router-dom";
import CollectionPage from "../collection/collection.component";
import { useSelector } from "react-redux";

const ShopPageDetail = () => {
  let params = useParams();
  let id = params.collectionId;
  let collection = useSelector((state) => {
    const arr = Object.keys(state.shop.collections).filter((v) => v === id);
    const key = arr[0];
    return state.shop.collections[key];
  });
  //console.log(collection);

  return (
    <div className="shop-page">
      <CollectionPage key={id} collection={collection} />
    </div>
  );
};

export default ShopPageDetail;
