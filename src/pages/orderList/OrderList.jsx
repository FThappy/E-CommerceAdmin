import React from 'react'
import "./orderList.css"
import { DataGrid } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { DeleteOutline } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, getOrderList, getProducts } from '../../redux/apiCalls';
import { deleteProduct } from '../../redux/apiCalls';

export default function OrderList() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const dispatch = useDispatch()
    const orders = useSelector((state)=>state.order.orders)
    const users = useSelector((state) => state.userList.users);
    const navigate = useNavigate();
      const { isFetching, error } = useSelector((state) => state.order);


    const orderList = orders.map((item)=>{
      const user = users.find(user=>user?._id===item?.userId)
      if(user){
         return {
           ...item,
           username: user.username,
           img: user.img,
         };
      }
      return item;
    })




    useEffect(() => {
      getOrderList(dispatch);
    }, [dispatch]);

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    const handleDelete = (id) => {
        deleteOrder(id,dispatch)
        {!error&&navigate("/orders")}
    };
    const Button = ({ type }) => {
      return <button className={`orderButton ${type}`}>{type}</button>;
    };

    const columns = [
      {
        field: "_id",
        headerName: "ID",
        width: windowWidth < 1800 ? 200 : 200,
        cellClassName: "productListId",
        headerClassName: "customHeader",
        headerAlign: "center",
        renderCell: (params) => {
          return (
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              fontSize={15}
            >
              {params?.value}
            </Grid>
          );
        },
      },
      {
        field: "user",
        headerName: "User",
        width: windowWidth < 1800 ? 200 : 300,
        headerClassName: "customHeader",
        headerAlign: "center",
        renderCell: (params) => {
          return (
            <Grid container justifyContent="left" alignItems="center" paddingLeft={5}>
              <div className="productListName">
                <img className="productListImg" src={params?.row.img} alt="" />
                {params?.row.username}
              </div>
            </Grid>
          );
        },
      },
      {
        field: "address",
        headerName: "Address",
        width: windowWidth < 1800 ? 200 : 250,
        cellClassName: "productListStock",
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
        field: "status",
        headerName: "Status",
        width: windowWidth < 1800 ? 200 : 250,
        cellClassName: "productListStatus",
        headerClassName: "customHeader",
        headerAlign: "center",
        renderCell: (params) => {
          return (
            <Grid container justifyContent="center" alignItems="center">
              <Button type={params.value} />
            </Grid>
          );
        },
      },
      {
        field: "amount",
        headerName: "Amount",
        width: windowWidth < 1800 ? 150 : 250,
        cellClassName: "productListPrice",
        headerClassName: "customHeader",
        headerAlign: "center",
        renderCell: (params) => {
          return (
            <Grid container justifyContent="center" alignItems="center">
              ${params?.value}
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
              <Link to={"/orders/" + params?.row?._id}>
                <button className="productListEdit">Edit</button>
              </Link>
              <DeleteOutline
                className="userListDelete"
                onClick={() => handleDelete(params?.row?._id)}
                fontSize="3rem"
              />
            </Grid>
          );
        },
      },
    ];



  return (
    <div className="productList">
      <DataGrid
        rows={orderList}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row)=>row._id}
        pageSize={8}
        checkboxSelection
        sx={{ height: windowWidth < 1800 ? 650 : 870, width: "100%" }}
      />
    </div>
  );
}
