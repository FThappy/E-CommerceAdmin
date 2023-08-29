import "./bannerList.css";
import { DataGrid } from "@mui/x-data-grid";
import { userRows } from "../../dummyData";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DeleteOutline, Visibility, VisibilityOff } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserList, getUserList } from "../../redux/apiCalls";
import { publicRequest, userRequest } from "../../requestMethods";


export default function UserList() {
  const [data, setData] = useState(userRows);
  const [banner,setBanner] = useState([])
  const dispatch = useDispatch()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const users = useSelector((state)=>state.userList.users)
  const { isFetching, error } = useSelector((state) => state.userList);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(()=>{
    const getBanner = async ()=>{
      try{
        const res = await publicRequest.get("/banner/findall")
        setBanner(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getBanner();
  },[])
  console.log(banner)

  


  const handleDelete = (id) => {
    const deleteBanner = async()=>{
      try {
        await userRequest.delete(`/banner/${id}`);
        navigate("/banners");
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
    deleteBanner();
  };
  const handleVisi = (id,active) => {
      const updateBanner = async () => {
        try {
          const status = active ? {active : false} : {active : true}
          await userRequest.put(`/banner/active/${id}`,status);
          navigate("/banners")
          window.location.reload();
        } catch (err) {
          console.log(err);
        }
      };
      updateBanner();
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
          <Grid container justifyContent="center" alignItems="center" fontSize={15}>
            {params?.value}
          </Grid>
        );
      },
    },
    {
      field: "img",
      headerName: "IMG",
      width: windowWidth < 1800 ? 200 : 300,
      headerClassName: "customHeader",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            paddingLeft={5}
            fontSize={12}
          >
            <div className="bannerListBanner">
              <img className="bannerListImg" src={params.row?.img} alt="" />
              {params.row?.username}
            </div>
          </Grid>
        );
      },
    },
    {
      field: "desc",
      headerName: "Description",
      width: windowWidth < 1800 ? 350 : 400,
      cellClassName: "userListEmail",
      headerClassName: "customHeader",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Grid
            container
            justifyContent="left"
            alignItems="center"
            fontSize={15}
          >
            {params?.value}
          </Grid>
        );
      },
    },
    {
      field: "active",
      headerName: "Active",
      width: windowWidth < 1800 ? 150 : 200,
      cellClassName: "userListStatus",
      headerClassName: "customHeader",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Grid container justifyContent="center" alignItems="center">
            {params.value? "Active" : "Hidden"}
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
            <Link to={"/banners/" + params.row?._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            {params.row.active ? (
              <Visibility
                className="bannerListVisi"
                onClick={() => handleVisi(params.row?._id, params.row.active)}
              />
            ) : (
              <VisibilityOff
                className="bannerListVisi"
                onClick={() => handleVisi(params.row?._id, params.row.active)}
              />
            )}
            <DeleteOutline
              className="bannerListDelete"
              onClick={() => handleDelete(params.row?._id)}
              sx={{ paddingLeft: "0.5rem" }}
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
        rows={banner}
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
