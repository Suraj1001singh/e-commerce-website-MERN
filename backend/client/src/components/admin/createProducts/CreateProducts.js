

import React, { useState, useContext, useEffect } from "react";
import "./createproducts.css";
import LoaderPage from "../../loaderPage/LoaderPage";
import axios from "axios";
import GlobalContext from "../../../context/GlobalContext";

import $ from "jquery";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "Blue solid jacket, has a sphe model (height 5'8) is wearing a size S Material & Care 100% cotton Machine Wash",
  content: "Blue solid jacket, has a spread collar, 4 pockets, button closure, long sleeves, straight hem Size & Fit The model (height 5'8) is wearing a size S Material & Care 100% cotton Machine Wash",
  images: [],
  category: "",
};

const CreateProducts = () => {
  const context = useContext(GlobalContext);
  const { state } = context;
  const [product, setproduct] = useState(initialState);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories] = state.categoriesAPI.categories;
  const [token] = state.token;
  const [callback, setCallback] = state.productAPI.callback;
  const [mainImage, setMainImage] = useState(images[0]);
  const [imageIndex, setImageIndex] = useState(0);
  const [isUploaded, setIsUploaded] = useState(false);

  //---------------Getting ID and manupulating it--------
  $(document).ready(function () {
    $(".extra_img").click(function (event) {
      setImageIndex(event.target.id.split("_")[1]);
    });
  });
  //-----------------------------------------------
  //----------------Deleting Image-------------
  const deleteImage = () => {
    console.log(imageIndex);
    // images.splice(imageIndex, 1);

    setImages(
      images.filter((image, index) => {
        if (parseInt(index) !== parseInt(imageIndex)) return image;
      })
    );
    setSelectedImage(
      selectedImage.filter((image, index) => {
        if (parseInt(index) !== parseInt(imageIndex)) return image;
      })
    );
    if (images.length == parseInt(imageIndex) + 1) setImageIndex(0);
  };
  //----------------------------------------------
  useEffect(() => {
    setMainImage(images[imageIndex]);
  }, [imageIndex, images]);
  // console.log(images);
  //----------------Preview Images---------------------------
  const imageHandelChange = (e) => {
    if (e.target.files) {
      setSelectedImage((prev) => prev.concat(...e.target.files));
      const fileArray = Array.from(e.target.files).map((file) => {
        return URL.createObjectURL(file);
      });

      setImages((prev) => prev.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };
  //-----------------------------------------------------------------

  const handelOnChange = (e) => {
    setproduct({ ...product, [e.target.name]: e.target.value });
  };
  //---------------Upload Image API call------------------------
  const uploadImages = async (e) => {
    e.preventDefault();
    try {
      if (selectedImage.length !== 0) {
        //-----images into proper format
        let formData = new FormData();

        for (let i = 0; i < selectedImage.length; i++) {
          formData.append("file", selectedImage[i]);
        }

        //---------------------------
        setLoading(true);

        //-----------API to upload images
        const res = await axios.post("/api/upload", formData, { headers: { "Content-Type": "/multipart/form-data", Authorization: token } });
        if (res.status === 200) {
          setIsUploaded(true);
        }
        setLoading(false);
        setproduct({ ...product, images: res.data.arrayOfUrls });
        alert(res.data.msg);
      } else {
        alert("Please select images");
      }
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  //--------------------------------------------------

  //---------------Saving product API call------------------
  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      if (isUploaded) {
        const res = await axios.post("/api/product", { ...product }, { headers: { Authorization: token } });
        setproduct(initialState);
        setIsUploaded(false);
        setSelectedImage([]);
        setImages([]);
        setImageIndex(0);
        setMainImage(images[0]);
        setCallback(!callback);

        alert(res.data.msg);
      } else {
        alert("Please first upload images");
      }
    } catch (e) {
      alert(e.response.data.msg);
    }
  };
  //  --------------------------------------------------------

  return (
    <section className="createproduct section">
      <h2 className="section_title">Add Product</h2>
      <div className="createproduct_container bd-grid">
        <div className="createproduct_product_images">
          {/* -------------------------------ADD IMAGES SIGN----------------------- */}

          {images.length === 0 ? (
            <div className="file_upload">
              <input type="file" name="files" id="files" className="file_up" multiple onChange={imageHandelChange}></input>
              <label for="files">
                <i class="bx bx-plus"></i>
              </label>
            </div>
          ) : (
            //-----------------------------------PRODUCT PREVIEW------------------------------
            <>
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
                {isUploaded ? (
                  <i style={{ color: "green", fontSize: "2rem" }} class="bx bxs-message-square-check close_icon"></i>
                ) : (
                  <a onClick={deleteImage}>
                    <i class="bx bx-x close_icon"></i>
                  </a>
                )}
              </div>

              {isUploaded ? null : (
                <>
                  <div className="product_action">
                    <div>
                      <input type="file" name="files" id="files" className="file_up" multiple onChange={imageHandelChange}></input>
                      <label for="files">
                        <i class="bx bxs-image-add action_btn">
                          <span>Add More</span>
                        </i>
                      </label>
                    </div>
                    <div>
                      <button className="action_btn" onClick={uploadImages}>
                        {" "}
                        Upload
                      </button>
                    </div>
                  </div>
                  <p>* Please upload images before saving.</p>
                </>
              )}
            </>
            //---------------------------------------------------------------------------
          )}
          {loading ? <LoaderPage loaderText="Uploading..."></LoaderPage> : null}
        </div>

        {/* --------------------------------------------------------------- */}
        {/* -------------------------------FILLING PRODUCT DETAILS---------------- */}
        <form className="createproduct_product_detail" onSubmit={saveProduct}>
          <div>
            <label>Product ID</label>
            <input type="text" name="product_id" value={product.product_id} onChange={handelOnChange}></input>
          </div>
          <div>
            <label>Product Title</label>
            <input type="text" name="title" value={product.title} onChange={handelOnChange}></input>
          </div>
          <div>
            <label>Product Price</label>
            <input type="number" name="price" value={product.price} onChange={handelOnChange}></input>
          </div>
          <div>
            <label>Product Desciption</label>
            <textarea type="text" name="description" value={product.description} maxLength="150" rows="5" onChange={handelOnChange}></textarea>
          </div>
          <div>
            <label>Product Content</label>
            <textarea type="text" name="content" value={product.content} maxLength="500" rows="20" onChange={handelOnChange}></textarea>
          </div>
          <div>
            <label>Product Category</label>
            <select name="category" value={product.category} onChange={handelOnChange}>
              <option value="">Select category</option>
              {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit" className="button">
              Save
            </button>
          </div>
        </form>
        {/* --------------------------------------------------------------------------- */}
      </div>
    </section>
  );
};

export default CreateProducts;
