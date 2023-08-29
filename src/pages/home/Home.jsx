import React, { useState,useMemo, useEffect } from 'react'
import "./home.css"
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart"
import { userData } from "../../dummyData";
import WidgetSm from '../../components/widgetSM/WidgetSm';
import WidgetLg from "../../components/widgetLG/WidgetLg";
import { userRequest } from '../../requestMethods';




export default function Home() {

  const [userStats,setUserStats] = useState([])

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
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        const newStats = res.data.map((item) => ({
          name: MONTHS[item._id - 1],
          "Active User": item.total,
        }));

        // Sắp xếp mảng theo giá trị "Active User" tăng dần
        const sortedStats = newStats
          .slice()
          .sort((a, b) => a["Active User"] - b["Active User"]);

        setUserStats(sortedStats);
      } catch {}
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="Users who have registered within the month"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
