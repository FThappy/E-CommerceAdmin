import React,{useState,useEffect} from "react";
import "./widgetLg.css";
import { userRequest } from "../../requestMethods";
import { format } from 'timeago.js';


export default function WidgetLg() {



   const [orders, setOrders] = useState([]);
  

   useEffect(() => {
     const getOrders = async () => {
       try {
         const res = await userRequest.get("order/findall/?new=true");
         setOrders(res.data);
       } catch (err) {
         console.log(err);
       }
     };
     getOrders();
   }, []);

   const [users, setUsers] = useState([]);

   useEffect(() => {
     const getUsers = async () => {
       try {
         const res = await userRequest.get("users/findall");
         setUsers(res.data);
       } catch (err) {
         console.log(err);
       }
     };
     getUsers();
   }, []);

   const [userOrder,setUserOrder]=useState([])
  useEffect(() => {
    const updatedUserOrder = orders.map((order) => {
      const userId = order.userId;
      const user1 = users.find((user) => user._id === userId);
      return user1 ? { ...order, user: user1 } : order;
    });

    setUserOrder(updatedUserOrder);
  }, [orders, users]);
  console.log(userOrder)



  const Button = ({ type }) => {
    return <button className={`widgetLgButton ${type}`}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <span className="widgetLgTitle">Recent Transcactions</span>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {userOrder.map((orders,index) => (
          <tr className="widgetLgTr" key={index}>
            <td className="widgetLgUser">
              <img
                src={orders.user?.img}
                alt="a"
                className="widgetLgImg"
              />
              <span className="widgetLgName">{orders.user?.username}</span>
            </td>
            <td className="widgetLgDate">{format(orders.createdAt)}</td>
            <td className="widgetLgAmount">${orders.amount}</td>
            <td className="widgetLgStatus">
              <Button type={orders.status} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
