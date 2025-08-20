import React, { useEffect, useState } from 'react';
import './featuredInfo.css';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { userRequest } from '../../requestMethods';

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [sales, setSales] = useState(0);
  const [quantity, setQuantity] = useState([]);
  const [numQuantity, setNumQuantity] = useState(0);

  useEffect(() => {
    const getIcome = async () => {
      try {
        const res = await userRequest.get('order/income');
        const sortedOrder = res.data.slice().sort((a, b) => b._id - a._id);
        setIncome(sortedOrder);
        setPerc(sortedOrder[0].total - sortedOrder[1].total);
        let totalSales = 0;
        sortedOrder.forEach(item => {
          totalSales += item.total;
        });
        setSales(totalSales);
      } catch (err) {
        console.log(err);
      }
    };
    getIcome();
  }, []);

  useEffect(() => {
    const getQuantity = async () => {
      try {
        const res = await userRequest.get('order/quantity');
        const sortedQuantity = res.data.slice().sort((a, b) => b._id - a._id);
        setQuantity(sortedQuantity);
        setNumQuantity(sortedQuantity[0].totalQuantity - sortedQuantity[1].totalQuantity);
      } catch (err) {
        console.log(err);
      }
    };
    getQuantity();
  }, []);
  console.log(quantity);

  return (
    <div className='featured'>
      <div className='featuredItem'>
        <span className='featuredTitle'>Revanue</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>${income[0]?.total}</span>
          <span className='featuredMoneyRate'>
            ${perc}
            {perc < 0 ? <ArrowDownward className='featuredIcon negative' /> : <ArrowUpward className='featuredIcon' />}
          </span>
        </div>
        <span className='featuredSub'>Compared to last month</span>
      </div>
      <div className='featuredItem'>
        <span className='featuredTitle'>Total Sales</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>${sales}</span>
          <span className='featuredMoneyRate'>
            ${income[0]?.total}
            {income[0]?.total < 0 ? (
              <ArrowDownward className='featuredIcon negative' />
            ) : (
              <ArrowUpward className='featuredIcon' />
            )}
          </span>
        </div>
        <span className='featuredSub'>Compared to last month</span>
      </div>
      <div className='featuredItem'>
        <span className='featuredTitle'>The quantity sold.</span>
        <div className='featuredMoneyContainer'>
          <span className='featuredMoney'>{quantity[0]?.totalQuantity}</span>
          <span className='featuredMoneyRate'>
            {numQuantity}
            {numQuantity < 0 ? (
              <ArrowDownward className='featuredIcon negative' />
            ) : (
              <ArrowUpward className='featuredIcon' />
            )}
          </span>
        </div>
        <span className='featuredSub'>Compared to last month</span>
      </div>
    </div>
  );
}
