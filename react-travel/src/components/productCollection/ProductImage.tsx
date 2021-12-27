import React from "react";
import { Image, Typography } from "antd";
// import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

interface PropsType {
  id: string | number;
  size: "large" | "small";
  imageSrc: string;
  price: number | string;
  title: string;
}

export const ProductImage: React.FC<PropsType> = ({
  id,
  size,
  imageSrc,
  price,
  title,
}) => {
  // const navigate = useNavigate();
  return (
    // <div onClick={() => navigate(`detail/${id}`)}>
    <Link to={`detail/${id}`}>
      {size === "large" ? (
        <Image src={imageSrc} height={290} width={488} />
      ) : (
        <Image src={imageSrc} height={120} width={240} />
      )}
      <div>
        <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
        <Typography.Text type="danger" strong>
          ¥ {price} 起
        </Typography.Text>
      </div>
    </Link>
    // </div>
  );
};
