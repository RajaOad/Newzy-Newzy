import React from 'react';
import '../LogoAnimation.css';

const DummyImage = ({ logoName, textColor, backgroundColor, width, height }) => {
  return (
    <div
      className="dummy-image-container"
      style={{
        width: width,
        height: height,
        backgroundColor: backgroundColor,
      }}
    >
      <span
        className="logo-text text-center"
        style={{
          color: textColor,
        }}
      >
        {logoName}
      </span>
    </div>
  );
};

export default DummyImage;
