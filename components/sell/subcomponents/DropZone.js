import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function Previews(props) {
  const imageUpload = async (event) => {
    try {
      if (!event.target.files || event.target.files.length == 0) {
        throw "select an image before uploading";
      }

      props.setLoading(true);
      console.log(event.target.files[0]);

      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("upload_preset", "t1qhqiym");

      await axios
        .post(
          "https://api.cloudinary.com/v1_1/dcqnau1ur/image/upload",
          formData
        )
        .then((u) => {
          console.log(u);
          console.log(u["data"].secure_url);
          props.setImageUrl(u["data"].secure_url);
          props.setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="container">
      <div style={{ height: "12px" }}></div>
      <input
        id="fileUpload"
        type="file"
        onChange={imageUpload}
        accept="image/*"
        name="image"
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={props.imageUrl} width="30%" height="auto" />
      </div>
    </section>
  );
}

export default Previews;
