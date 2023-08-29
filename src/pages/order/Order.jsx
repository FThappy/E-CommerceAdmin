import React from 'react'
import "./order.css"
import styled from "styled-components";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatus } from '../../redux/apiCalls';


const ProductColor = styled.div`
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 70%;
  background-color: ${(props) => props.color};
  border: 1px solid black;
`;

  
export default function Order() {
  
  const location = useLocation()
  const orderId = location.pathname.split("/")[2]
  const dispatch = useDispatch()
  const { isFetching, error } = useSelector((state) => state.order);
  const navigate = useNavigate()


  const order = useSelector((state)=>state.order.orders.find(item=>item._id===orderId))
  
  const handleClickApproved = (e) => {
    e.preventDefault();
    const id = order._id;
    const status = {
      status: "Approved",
    };
    updateOrderStatus(id, status, dispatch);
    {
      !error && navigate("/orders");
    }
  };
  const handleClickDeclined = (e) => {
    e.preventDefault();
    const id = order._id;
    const status = {
      status: "Declined",
    };
    updateOrderStatus(id, status, dispatch);
    {
      !error && navigate("/orders");
    }
  };





     
  return (
    <div className="order">
      <div className="container">
        <div className="info">
          <div className="product">
            {order.products.map((item) => (
              <div className="productdetail" key={item._id}>
                <img src={item?.productImg} alt="a" className="productimage" />
                <div className="detail">
                  <span className="productname">
                    <b>Product Name:</b> {item?.productName}
                  </span>
                  <span className="productId">
                    <b>Id:</b> {item?.productId}
                  </span>
                  <ProductColor color={item?.color} />
                  <span className="productsize">
                    <b>Size:</b> {item?.size}
                  </span>
                </div>
                <div className="priceDetail">
                  <div className="productAmount">
                    <b>Quantity:</b> {item?.quantity}
                  </div>
                  <div className="productPrice">
                    <b>Total:</b> ${item?.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="summary">
          <h1 className="summaryTitle">Order Summary</h1>
          <div className="summaryItem">
            <span className="summaryItemText">Total: </span>
            <span className="summaryItemPrice">${order.amount}</span>
          </div>
          <button
            className="summaryButtonApproved"
            onClick={handleClickApproved}
          >
            Approved
          </button>
          <button
            className="summaryButtonDeclined"
            onClick={handleClickDeclined}
          >
            Declined
          </button>
        </div>
      </div>
    </div>
  );
}
