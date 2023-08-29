import React, { useEffect, useState } from 'react'
import "./widgetSmS.css"
import { Visibility } from '@mui/icons-material';
import { userRequest } from '../../requestMethods';
import { format } from "timeago.js";
import { useSelector } from 'react-redux';


export default function WidgetSmS() {

  const [quantity,setQuantity] = useState([]);
  const products = useSelector((state) =>
    state.product.products
  );

  useEffect(()=>{
    const getQuantity = async ()=> {
      try{
        const res = await userRequest.get("order/salesquantity")
        setQuantity(res.data)
      }catch(err){
        console.log(err)
      }
      
    }
    getQuantity()
  },[])


  const product = quantity.map((item)=>{
     const productItem = products.find(producta=>producta._id === item._id)
     if(productItem){
      return {
        ...item,
        img : productItem.img,
        title : productItem.title,
      }
     }
  })



  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">Best Seller</span>
      <ul className="widgetSmList">
        {product.map((item) => (
          <li className="widgetSmListItem" key={item._id}>
            <img
              src={
                item.img ||
                "https://cdn.icon-icons.com/icons2/1929/PNG/512/iconfinder-panda-4591884_122127.png"
              }
              alt="a"
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUserName">{item.title}</span>
            </div>
            <div className="widgetSmCreateat">
              <h3 className="widgetSmDay">{item.totalQuantity}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
