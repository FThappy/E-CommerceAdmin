import React from 'react';
import './productList.css';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DeleteOutline } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/apiCalls';
import { deleteProduct } from './../../redux/apiCalls';

export default function ProductList() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleDelete = id => {
    deleteProduct(id, dispatch);
  };

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      width: windowWidth < 1800 ? 200 : 200,
      cellClassName: 'productListId',
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: params => {
        return (
          <Grid container justifyContent='center' alignItems='center' fontSize={15}>
            {params.value}
          </Grid>
        );
      }
    },
    {
      field: 'product',
      headerName: 'Product',
      width: windowWidth < 1800 ? 400 : 500,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: params => {
        return (
          <Grid container justifyContent='left' alignItems='center' paddingLeft={5} fontSize={12}>
            <div className='productListName'>
              <img className='productListImg' src={params.row.img} alt='' />
              {params.row.title}
            </div>
          </Grid>
        );
      }
    },
    {
      field: 'quantity',
      headerName: 'Stock',
      width: windowWidth < 1800 ? 100 : 150,
      cellClassName: 'productListStock',
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: params => {
        return (
          <Grid container justifyContent='center' alignItems='center'>
            {params.value}
          </Grid>
        );
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: windowWidth < 1800 ? 150 : 200,
      cellClassName: 'productListStatus',
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: params => {
        return (
          <Grid container justifyContent='center' alignItems='center'>
            {params.value}
          </Grid>
        );
      }
    },
    {
      field: 'price',
      headerName: 'Price',
      width: windowWidth < 1800 ? 150 : 250,
      cellClassName: 'productListPrice',
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: params => {
        return (
          <Grid container justifyContent='center' alignItems='center'>
            ${params.value}
          </Grid>
        );
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: windowWidth < 1800 ? 150 : 220,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: params => {
        return (
          <Grid container justifyContent='center' alignItems='center'>
            <Link to={'/product/' + params.row._id}>
              <button className='productListEdit'>Edit</button>
            </Link>
            <DeleteOutline className='userListDelete' onClick={() => handleDelete(params.row._id)} fontSize='3rem' />
          </Grid>
        );
      }
    }
  ];

  return (
    <div className='productList'>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={row => row._id}
        pageSize={8}
        checkboxSelection
        sx={{ height: windowWidth < 1800 ? 650 : 870, width: '100%' }}
      />
    </div>
  );
}
