import React, { useEffect, useState } from 'react';
import './banner.css';
import { Link, useLocation } from 'react-router-dom';
import { publicRequest, userRequest } from '../../requestMethods';
import { Publish, RadioButtonUnchecked } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../../firebase';

export default function Banner() {
  const location = useLocation();
  const bannerId = location.pathname.split('/')[2];
  const [banner, setBanner] = useState();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getBanner = async () => {
      try {
        const res = await publicRequest.get(`/banner/find/${bannerId}`);
        setBanner(res.data);
        setInputs({
          title: res.data.title,
          bg: res.data.bg,
          active: res.data.active,
          desc: res.data.desc
        });
      } catch (err) {
        console.log(err);
      }
    };
    getBanner();
  }, [bannerId]);
  const handleChange = e => {
    setInputs(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleClick1 = () => {
    const id = banner._id;
    const img = banner.img;
    const item = {
      _id: id,
      ...inputs,
      img: img
    };
    console.log(item);
    const updateBanner = async () => {
      try {
        await userRequest.put(`/banner/${id}`, item);
        navigate('/banners/');
      } catch (err) {
        console.log(err);
      }
    };
    updateBanner();
  };
  const handleClick = e => {
    e.preventDefault();
    if (file) {
      const filename = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        'state_changed',
        snapshot => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
          }
        },
        error => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            // console.log("File available at", downloadURL);
            const id = banner._id;
            const img = banner.img;
            const item = {
              _id: id,
              ...inputs,
              img: downloadURL
            };
            const updateBanner = async () => {
              try {
                await userRequest.put(`/banner/${id}`, item);
                navigate('/banners/');
              } catch (err) {
                console.log(err);
              }
            };
            updateBanner();
          });
        }
      );
    } else {
      handleClick1();
    }
  };

  return (
    <div className='banner'>
      <div className='bannerTitleContainer'>
        <h1 className='bannerTitle'>Edit Banner</h1>
        <Link to='/newBanner'>
          <button className='bannerAddButton'>Create</button>
        </Link>
      </div>
      <div className='bannerBottom'>
        <div className='bannerBottomRight'>
          <form className='bannerForm'>
            <div className='bannerFormLeft'>
              <label>Banner Title</label>
              <input name='title' type='text' placeholder={banner?.title} onChange={handleChange} />
              <label>Banner Background </label>
              <input name='bg' type='text' placeholder={banner?.bg} onChange={handleChange} />
              <label>Banner Active</label>
              <select name='active' id='active' onChange={handleChange}>
                <option value='1'>{banner?.active ? 'Yes' : 'No'}</option>
                <option value='true'>Yes</option>
                <option value='false'>No</option>
              </select>
              <label>Banner Description</label>
              <textarea name='desc' type='text' placeholder={banner?.desc} onChange={handleChange} />
            </div>
            <div className='bannerFormRight'>
              <div className='bannerUpload'>
                <img src={banner?.img} alt='a' className='bannerUploadImg' />
                <label for='file'>
                  <Publish />
                </label>
                <input type='file' id='file' style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
              </div>
              <button className='bannerButton' onClick={handleClick}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
