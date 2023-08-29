import React, { useEffect, useMemo, useState } from 'react'
import "./sales.css"
import { userRequest } from '../../requestMethods';
import WidgetLg from '../../components/widgetLG/WidgetLg';
import Chart from '../../components/chart/Chart';
import WidgetSmS from '../../components/widgetSMSales/WidgetSmS';


export default function Sales() {

    const [sales, setSales] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getIcome = async () => {
      try {
        const res = await userRequest.get("order/sales");
        const sortedOrder = res.data.slice().sort((a, b) => a._id - b._id);
        const newSales = sortedOrder.map((item) => ({
          name: MONTHS[item._id - 1],
          "Revenue": item.total,
        }));
        setSales(newSales)

      } catch (err) {
        console.log(err);
      }
    };
    getIcome();
  }, []);
 

  return (
    <div className="sales">
      <Chart
        data={sales}
        title="Revenue across the months"
        grid
        dataKey="Revenue"
      />
      <div className="salesWidgets">
        <WidgetSmS />
        <WidgetLg />
      </div>
    </div>
  );
}
