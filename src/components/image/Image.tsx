import React from "react";

interface Props {
  width: number;
  imageSrc: string;
}

function Image(props: Props) {
  return (
    <div
      style={{
        margin: "0 auto",
        width: props.width,
      }}
    >
      <img src={props.imageSrc} alt="TODO" />
    </div>
  );
}

export default Image;
