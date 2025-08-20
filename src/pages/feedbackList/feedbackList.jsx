import './feedbackList.css';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DeleteOutline, Info } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { userRequest } from '../../requestMethods';
import { Box, Modal, Typography } from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

export default function FeedBackList() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const [feedBack, setFeedBack] = useState([]);
  const [feedbackSelected, setFeedbackSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setFeedbackSelected(null);
  };
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
    const getFeedBack = async () => {
      try {
        const res = await userRequest.get('/feedback/findall');
        setFeedBack(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFeedBack();
  }, []);
  console.log(feedBack);

  const handleDelete = id => {
    const deleteFeedBack = async () => {
      try {
        await userRequest.delete(`/feedback/${id}`);
        navigate('/feedbacks');
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };
    deleteFeedBack();
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
      field: 'title',
      headerName: 'Description',
      width: windowWidth < 1800 ? 400 : 500,
      cellClassName: 'userListStatus',
      headerClassName: 'customHeader',
      headerAlign: 'center',
      renderCell: params => {
        return (
          <Grid item xs={6}>
            <Typography
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {params?.value}
            </Typography>
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
            <DeleteOutline className='userListDelete' onClick={() => handleDelete(params.row?._id)} fontSize='3rem' />
            <Info
              className='feedbackInfo'
              fontSize='3rem'
              onClick={() => {
                setFeedbackSelected(params.row);
                setOpen(true);
              }}
            />
          </Grid>
        );
      }
    }
  ];
  console.log(feedbackSelected);
  return (
    <div className='userList'>
      <DataGrid
        rows={feedBack?.length ? feedBack : []}
        disableSelectionOnClick
        columns={columns}
        getRowId={row => row._id}
        pageSize={8}
        checkboxSelection
        sx={{ height: windowWidth < 1800 ? 650 : 870, width: '100%' }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Feedback by {feedbackSelected?.userId}
          </Typography>
          <Typography
            id='modal-modal-description'
            sx={{
              mt: 2,
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}
          >
            {feedbackSelected?.title}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
