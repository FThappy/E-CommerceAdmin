import React, { useState, useMemo, useEffect } from 'react';
import './product.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Chart from '../../components/chart/Chart';
import { productData } from '../../dummyData';
import { Publish } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { userRequest } from '../../requestMethods';
import { useDispatch } from 'react-redux';
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../../firebase';
import { updateProduct } from '../../redux/apiCalls';

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split('/')[2];

  const [pStats, setPStats] = useState([]);

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector(state => state.product);
  const navigate = useNavigate();

  const product = useSelector(state => state.product.products.find(product => product._id === productId));

  const MONTHS = useMemo(
    () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec'],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('order/quantitys?pid=' + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map(item => setPStats(prev => [...prev, { name: MONTHS[item._id - 1], Sales: item.total }]));
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  const handleChange = e => {
    setInputs(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };
  const handleCat = e => {
    setCat(e.target.value.split(','));
  };
  const handleSize = e => {
    setSize(e.target.value.split(','));
  };
  const handleColor = e => {
    setColor(e.target.value.split(','));
  };
  if (!inputs.title) {
    setInputs(prev => {
      return {
        ...prev,
        title: product.title
      };
    });
  }
  if (!inputs.desc) {
    setInputs(prev => {
      return {
        ...prev,
        desc: product.desc
      };
    });
  }
  if (!inputs.quantity) {
    setInputs(prev => {
      return {
        ...prev,
        quantity: product.quantity
      };
    });
  }
  if (!inputs.price) {
    setInputs(prev => {
      return {
        ...prev,
        price: product.price
      };
    });
  }
  if (!inputs.inStock) {
    setInputs(prev => {
      return {
        ...prev,
        inStock: product.inStock
      };
    });
  }
  if (!inputs.status) {
    setInputs(prev => {
      return {
        ...prev,
        status: product.status
      };
    });
  }
  const handleClick1 = () => {
    const id = product._id;
    const img = product.img;
    if (!cat) {
      setCat(product.categories);
    }
    if (!size) {
      setCat(product.size);
    }
    if (!color) {
      setCat(product.color);
    }
    const item = {
      _id: id,
      ...inputs,
      img: img,
      categories: cat,
      size: size,
      color: color
    };
    updateProduct(id, item, dispatch);
    {
      !error && navigate('/products');
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
            const id = product._id;
            if (!cat) {
              setCat(product.categories);
            }
            if (!size) {
              setCat(product.size);
            }
            if (!color) {
              setCat(product.color);
            }
            const item = {
              _id: id,
              ...inputs,
              img: downloadURL,
              categories: cat,
              size: size,
              color: color
            };
            updateProduct(id, item, dispatch);
            // console.log({ ...inputs, img: downloadURL, categories: cat, size : size , color : color });
            {
              !error && navigate('/products');
            }
          });
        }
      );
    } else {
      handleClick1();
    }
  };

  return (
    <div className='product'>
      <div className='productTitleContainer'>
        <h1 className='productTitle'>Product</h1>
        <Link to='/newproduct'>
          <button className='productAddButton'>Create</button>
        </Link>
      </div>
      <div className='productTop'>
        <div className='productTopLeft'>
          <Chart data={pStats} title='Sales Performance' grid dataKey='Sales' />
        </div>
        <div className='productTopRight'>
          <div className='productInfoTop'>
            <img src={product?.img} alt='a' className='productInfoImg' />
            <span className='productName'>{product?.title}</span>
          </div>
          <div className='productInfoBottom'>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Id:</span>
              <span className='productInfoValue'>{product?._id}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Price:</span>
              <span className='productInfoValue'>${product?.price}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Status:</span>
              <span className='productInfoValue'>{product?.status}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>In stock:</span>
              <span className='productInfoValue'>{product?.inStock ? 'True' : 'False'}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='productBottom'>
        <div className='productBottomRight'>
          <form className='productForm'>
            <div className='productFormLeft'>
              <label>Product Title</label>
              <input name='title' type='text' placeholder={product?.title} onChange={handleChange} />
              <label>Product Description</label>
              <input name='desc' type='text' placeholder={product?.desc} onChange={handleChange} />
              <label>Product Categories</label>
              <input name='categories' type='text' placeholder={product?.categories} onChange={handleCat} />
              <label>Product Size</label>
              <input name='size' type='text' placeholder={product?.size} onChange={handleSize} />
              <label>Product color</label>
              <input name='color' type='text' placeholder={product?.color} onChange={handleColor} />
              <label>Product Quantity</label>
              <input name='quantity' type='number' placeholder={product?.quantity} onChange={handleChange} />
              <label>Product Price</label>
              <input name='price' type='number' placeholder={product?.price} onChange={handleChange} />
              <label>In Stock</label>
              <select name='inStock' id='idStock' onChange={handleChange}>
                <option value='1'>{product?.inStock ? 'Yes' : 'No'}</option>
                <option value='true'>Yes</option>
                <option value='false'>No</option>
              </select>
              <label>Status</label>
              <input name='status' type='text' placeholder={product?.status} onChange={handleChange} />
            </div>
            <div className='productFormRight'>
              <div className='productUpload'>
                <img src={product?.img} alt='a' className='productUploadImg' />
                <label for='file'>
                  <Publish />
                </label>
                <input type='file' id='file' style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
              </div>
              <button onClick={handleClick} className='productButton'>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
