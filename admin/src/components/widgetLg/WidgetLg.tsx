import { useState, useEffect } from "react";
import { makeRequest } from "../../axios";
import "./widgetLg.css";
import { format } from "timeago.js";

interface ButtonProps {
  type: string;
}
interface orders {
  _id:string
  userId: string;
  products: object;
  amount: number;
  address: object; // Reference to the Address model
  status: string;
  createdAt: string;
}

export default function WidgetLg() {
  const [orders, setOrder] = useState<orders[]>([]);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await makeRequest("/orders/all/users");
        setOrder(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrder();
  }, []);

  const Button: React.FC<ButtonProps> = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer ID</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map((orders) => (
          <tr className="widgetLgTr" key={orders._id}>
            <td className="widgetLgUser">
              <span className="widgetLgName">{orders.userId}</span>
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
