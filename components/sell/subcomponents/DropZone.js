import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

function Previews(props) {
  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: "image/*",
  //   maxFiles: 1,
  //   onDrop: (acceptedFiles) => {
  //     setFiles(
  //       acceptedFiles.map((file) =>
  //         Object.assign(file, {
  //           preview: URL.createObjectURL(file),
  //         })
  //       )
  //     );
  //     setImage(acceptedFiles);
  //   },
  // });

  const imageUpload = async (event) => {
    try {
      if (!event.target.files || event.target.files.length == 0) {
        throw "select an image before uploading";
      }
      console.log(event.target.files[0]);
      // setImage(event.target.files[0]);

      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      formData.append("upload_preset", "t1qhqiym");

      axios
        .post(
          "https://api.cloudinary.com/v1_1/dcqnau1ur/image/upload",
          formData
        )
        .then((u) => {
          console.log(u);
          console.log(u["data"].secure_url);
          props.setImageUrl(u["data"].secure_url);
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
      {/* <div {...getRootProps({ className: "dropzone" })}> */}
      <div style={{ height: "12px" }}></div>
      <input
        id="fileUpload"
        type="file"
        onChange={imageUpload}
        accept="image/*"
        name="image"
        // hidden
      />
      {/* </div> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={props.imageUrl} width="30%" height="auto" />
      </div>
    </section>
  );
}

export default Previews;
