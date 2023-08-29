import "./feedbackList.css";
import { DataGrid } from "@mui/x-data-grid";
import { userRows } from "../../dummyData";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DeleteOutline } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserList, getUserList } from "../../redux/apiCalls";
import { publicRequest, userRequest } from "../../requestMethods";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

export default function FeedBackList() {
  const [data, setData] = useState(userRows);
  const dispatch = useDispatch()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const users = useSelector((state)=>state.userList.users)
  const { isFetching, error } = useSelector((state) => state.userList);
  const navigate = useNavigate();
  const [feedBack,setFeedBack] = useState([])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useEffect(() => {
    const getFeedBack = async () => {
      try {
        const res = await userRequest.get("/feedback/findall");
        setFeedBack(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFeedBack();
  }, []);
  console.log(feedBack);

  


  const handleDelete = (id) => {
    const deleteFeedBack = async () => {
      try {
        await userRequest.delete(`/feedback/${id}`);
        navigate("/feedbacks");
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };
    deleteFeedBack();
  };

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: windowWidth < 1800 ? 250 : 250,
      cellClassName: "userListId",
      headerClassName: "customHeader",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Grid container justifyContent="center" alignItems="center" fontSize={15} >
            {params?.value}
          </Grid>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: windowWidth < 1800 ? 350 : 400,
      cellClassName: "userListEmail",
      headerClassName: "customHeader",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Grid container justifyContent="center" alignItems="center">
            {params?.value}
          </Grid>
        );
      },
    },
    {
      field: "title",
      headerName: "Description",
      width: windowWidth < 1800 ? 400 :500,
      cellClassName: "userListStatus",
      headerClassName: "customHeader",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Grid
            container
            justifyContent="left"
            alignItems="center"
            sx={{
              overflowX: "scroll", // Thêm thuộc tính overflow
              height: "100%", // Đảm bảo chiều cao của Grid đủ để hiển thị thanh cuộn
            }}
          >
            {params?.value}
          </Grid>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: windowWidth < 1800 ? 150 : 220,
      headerClassName: "customHeader",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Grid container justifyContent="center" alignItems="center">
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row?._id)}
              fontSize="3rem"
            />
          </Grid>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={feedBack?.length ? feedBack : []}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
        sx={{ height: windowWidth < 1800 ? 650 : 870, width: "100%" }}
      />
    </div>
  );
}
