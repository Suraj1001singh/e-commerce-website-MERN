import React, { useState, useEffect } from "react";
import $ from "jquery";
import "./photoviewer.css";

const PhotoViewer = ({ imageArray }) => {
  const [images, setImages] = useState(imageArray);
  const [mainImage, setMainImage] = useState(images[0]);
  const [imageIndex, setImageIndex] = useState(0);
  //------------Getting ID and manupulating it--------
  $(document).ready(function () {
    $(".extra_img").click(function (event) {
      setImageIndex(event.target.id.split("_")[1]);
    });
  });
  //-----------------------------------------------
  //--------------------Deleting Image-------------
  const deleteImage = () => {
    console.log(imageIndex);
    images.splice(imageIndex, 1);
    setImages(images);
    setMainImage(images[0]);
  };
  //----------------------------------------------

  useEffect(() => {
    setMainImage(images[imageIndex]);
  }, [imageIndex]);

  return (
    <div className="product_view">
      <div className="product_mainimage">
        <img src={mainImage} alt="add image" className="product_main_img"></img>
      </div>

      <div className="product_otherimage">
        {images.map((image, index) => {
          return (
            <div className="extra_img" id={`image_${index}`}>
              <img src={image} alt="" id={`image_${index}`}></img>
            </div>
          );
        })}
      </div>
      <a onClick={deleteImage}>
        <i class="bx bx-x close_icon"></i>
      </a>
     
    </div>
  );
};

export default PhotoViewer;
