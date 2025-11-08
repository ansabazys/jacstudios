import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { getOrdersByMonth } from "../../api/orders";

const OrdersChart = () => {
  const [data, setData] = useState([]);
  const monthNames = [
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
  ];

  useEffect(() => {
    (async () => {
      const [data, err] = await getOrdersByMonth();
      if (data) {
        const allMonths = monthNames.map((month, i) => {
          return { month: i + 1, orders: 0 };
        });

        const filledData = allMonths.map((item) => {
          const found = data.find((dt) => dt.month === item.month);
          return {
            month: monthNames[item.month - 1],
            orders: found ? found.orders : 0,
          };
        });

        setData(filledData)
      }
    })();
  }, []);

  console.log(data);

  // const data = [
  //   { month: "Jan", orders: 40 },
  //   { month: "Feb", orders: 30 },
  //   { month: "Mar", orders: 45 },
  //   { month: "Apr", orders: 60 },
  //   { month: "May", orders: 80 },
  //   { month: "Jun", orders: 75 },
  // ];

  return (
  <div className="bg-white rounded-2xl shadow p-6 w-full">
      <h2 className="text-lg font-semibold mb-4">Orders by Month</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data}>
          {/* Hide Y-axis & grid */}
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <Tooltip cursor={{ fill: "transparent" }} />
          <Bar
            dataKey="orders"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
            label={{ position: "top", fill: "#111", fontSize: 12 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrdersChart;
