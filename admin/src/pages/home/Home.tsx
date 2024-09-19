import { useEffect, useMemo, useState } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { makeRequest } from "../../axios";

interface UserStatsItem {
  _id: number; 
  total: number;
}


type DataPoint = {
  name: string;
  "Active User": number;
}

export default function Home() {
  const [userStats, setUserStats] = useState<DataPoint[]>([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
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
        // Fetch data and type the response
        const res = await makeRequest.get<UserStatsItem[]>("/users/stats/allUsers");
      
        // Map response data to DataPoint type
        const stats: DataPoint[] = res.data.map((item) => ({
          name: MONTHS[item._id - 1],
          "Active User": item.total,
        }));
        
        setUserStats(stats);
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [MONTHS]);

  

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
