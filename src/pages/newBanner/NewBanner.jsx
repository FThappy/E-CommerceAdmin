import React, { useState } from 'react'
import "./newBanner.css"
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { useNavigate } from "react-router-dom";
import { userRequest } from '../../requestMethods';

export default function NewBanner() {

    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };
    console.log(inputs)


    const handleClick = (e) => {
      e.preventDefault();
      const filename = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("File available at", downloadURL);
            const item = {
              ...inputs,
              img: downloadURL,
            };
            // console.log({ ...inputs, img: downloadURL, categories: cat, size : size , color : color });
            const createBanner = async ()=>{
              try{
                await userRequest.post("/banner/",item)
                navigate("/banners")
              }catch(err){
                console.log(err)
              }
            }
            createBanner();
          });
        }
      );
    };
    
  return (
    <div className="newBanner">
      <h1 className="newBannerTitle">New Banner</h1>
      <form className="newBannerForm">
        <div className="newBannerItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="newBannerItem">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Panda Bear"
            onChange={handleChange}
          />
        </div>
        <div className="newBannerItem">
          <label>BackGround Color</label>
          <input
            type="text"
            name="bg"
            placeholder="fffff"
            onChange={handleChange}
          />
        </div>
        <div className="newBannerItem">
          <label>Description</label>
          <textarea
            name="desc"
            type="text"
            placeholder="DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS."
            onChange={handleChange}
          />
        </div>
        <div className="newBannerItem">
          <label>Active</label>
          <select
            className="newBannerSelect"
            name="active"
            id="active"
            onChange={handleChange}
          >
            <option selected>Chọn</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick} className="newBannerButton">
          Create
        </button>
      </form>
    </div>
  );
}
