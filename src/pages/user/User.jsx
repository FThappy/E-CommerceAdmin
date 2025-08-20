import React, { useState } from 'react';
import './user.css';
import {
  CalendarToday,
  LocationOnOutlined,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../../firebase';
import { updateUserList } from '../../redux/apiCalls';

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  const user = useSelector(state => state.userList.users.find(item => item._id === userId));
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [birth, setBirth] = useState(new Date());
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.userList);
  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };
  if (!inputs.username) {
    setInputs(prev => {
      return {
        ...prev,
        username: user.username
      };
    });
  }
  if (!inputs.email) {
    setInputs(prev => {
      return {
        ...prev,
        email: user.email
      };
    });
  }
  if (!inputs.address) {
    setInputs(prev => {
      return {
        ...prev,
        address: user.address
      };
    });
  }
  if (!inputs.phone) {
    setInputs(prev => {
      return {
        ...prev,
        phone: user.phone
      };
    });
  }
  if (!inputs.desc) {
    setInputs(prev => {
      return {
        ...prev,
        desc: user.desc
      };
    });
  }
  const handleBirth = e => {
    const selectedDate = new Date(e.target.value);
    setBirth(selectedDate);
  };
  console.log(inputs);
  const handleClick1 = () => {
    const id = user._id;
    const img = user.img;
    if (!birth) {
      setBirth(user.birth);
    }
    const item = {
      _id: id,
      ...inputs,
      birth: birth,
      img: img
    };
    console.log(item);
    updateUserList(id, item, dispatch);
    {
      !error && navigate('/users');
    }
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
            const id = user._id;
            if (!birth) {
              setBirth(user.birth);
            }
            const item = {
              _id: id,
              ...inputs,
              birth: birth,
              img: downloadURL
            };
            updateUserList(id, item, dispatch);
            // console.log({ ...inputs, img: downloadURL, categories: cat, size : size , color : color });
            {
              !error && navigate('/users');
            }
          });
        }
      );
    } else {
      handleClick1();
    }
  };

  return (
    <div className='user'>
      <div className='userTitleContainer'>
        <h1 className='userTitle'>Edit User</h1>
      </div>
      <div className='userContainer'>
        <div className='userShow'>
          <div className='userShowTop'>
            <img src={user.img} alt='a' className='userShowImg' />
            <div className='userShowTopTitle'>
              <span className='userShowUserName'>{user.username}</span>
              <span className='UserShowUserTitle'>{user.desc}</span>
            </div>
          </div>
          <div className='userShowBottom'>
            <span className='userShowTitle'>Account Details</span>
            <div className='userShowInfo'>
              <PermIdentity />
              <div className='userShowInfoTitle'>{user.username}</div>
            </div>
            <div className='userShowInfo'>
              <CalendarToday className='userShowIcon' />
              <span className='userShowInfoTitle'>{new Date(user.birth).toLocaleDateString('en-GB')}</span>
            </div>
            <span className='userShowTitle'>Contact Details</span>
            <div className='userShowInfo'>
              <PhoneAndroid className='userShowIcon' />
              <span className='userShowInfoTitle'>{user.phone}</span>
            </div>
            <div className='userShowInfo'>
              <MailOutline className='userShowIcon' />
              <span className='userShowInfoTitle'>{user.email}</span>
            </div>
            <div className='userShowInfo'>
              <LocationOnOutlined className='userShowIcon' />
              <span className='userShowInfoTitle'>{user.address}</span>
            </div>
          </div>
        </div>
        <div className='userUpdate'>
          <span className='userUpdateTitle'>Edit</span>
          <form className='userUpdateForm'>
            <div className='userUpdateLeft'>
              <div className='userUpdateItem'>
                <label>UserName</label>
                <input
                  name='username'
                  type='text'
                  placeholder={user.username}
                  className='userUpdateInput'
                  onChange={handleChange}
                />
              </div>
              <div className='userUpdateItem'>
                <label>Desciption</label>
                <input
                  name='desc'
                  type='text'
                  placeholder={user.desc}
                  className='userUpdateInput'
                  onChange={handleChange}
                />
              </div>
              <div className='userUpdateItem'>
                <label>Email</label>
                <input
                  name='email'
                  type='text'
                  placeholder={user.email}
                  className='userUpdateInput'
                  onChange={handleChange}
                />
              </div>
              <div className='userUpdateItem'>
                <label>Birth</label>
                <input
                  name='birth'
                  type='text'
                  placeholder={new Date(user.birth).toLocaleDateString('en-GB')}
                  className='userUpdateInput'
                  onChange={handleBirth}
                />
              </div>
              <div className='userUpdateItem'>
                <label>Phone</label>
                <input
                  name='phone'
                  type='text'
                  placeholder={user.phone}
                  className='userUpdateInput'
                  onChange={handleChange}
                />
              </div>
              <div className='userUpdateItem'>
                <label>Address</label>
                <input
                  name='address'
                  type='text'
                  placeholder={user.address}
                  className='userUpdateInput'
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className='userUpdateRight'>
              <div className='userUpdateUpload'>
                <img src={user.img} alt='a' className='userUpdateImg' />
                <label htmlFor='file'>
                  <Publish className='userUpdateIcon' />
                </label>
                <input type='file' id='file' style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
              </div>
              <button className='userUpdateButton' onClick={handleClick}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
