import './userList.css';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DeleteOutline } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserList, getUserList } from '../../redux/apiCalls';

export default function UserList() {
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const users = useSelector(state => state.userList.users);
  const { error } = useSelector(state => state.userList);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    getUserList(dispatch);
  }, [dispatch]);

  const handleDelete = id => {
    deleteUserList(id, dispatch);
    {
      !error && navigate('/users');
    }
  };

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      width: windowWidth < 1800 ? 250 : 250,
      cellClassName: 'userListId',
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: params => {
        return (
          <Grid container justifyContent='center' alignItems='center' fontSize={15}>
            {params?.value}
          </Grid>
        );
      }
    },
    {
      field: 'user',
      headerName: 'User',
      width: windowWidth < 1800 ? 200 : 300,
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: params => {
        return (
          <Grid container justifyContent='center' alignItems='center' paddingLeft={5} fontSize={12}>
            <div className='userListUser'>
              <img className='userListImg' src={params.row?.img} alt='' />
              {params.row?.username}
            </div>
          </Grid>
        );
      }
    },
    {
      field: 'email',
      headerName: 'Email',
      width: windowWidth < 1800 ? 350 : 400,
      cellClassName: 'userListEmail',
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: params => {
        return (
          <Grid container justifyContent='center' alignItems='center'>
            {params?.value}
          </Grid>
        );
      }
    },
    {
      field: 'desc',
      headerName: 'Description',
      width: windowWidth < 1800 ? 150 : 200,
      cellClassName: 'userListStatus',
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: params => {
        return (
          <Grid container justifyContent='center' alignItems='center'>
            {params?.value}
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
            <Link to={'/user/' + params.row?._id}>
              <button className='userListEdit'>Edit</button>
            </Link>
            <DeleteOutline className='userListDelete' onClick={() => handleDelete(params.row?._id)} fontSize='3rem' />
          </Grid>
        );
      }
    }
  ];

  return (
    <div className='userList'>
      <DataGrid
        rows={users?.length ? users : []}
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
