import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { subHours } from "date-fns";
import { data } from "autoprefixer";

export default function HomeStats() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get("api/orders").then((response) => {
      setOrders(response.data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="my-4">
        <Spinner fullWidth={true} />
      </div>
    );
  }

  const ordersToday = orders.filter(
    (o) =>
      new Date(o.createdAt.seconds * 1000 + o.createdAt.nanoseconds / 1000000) >
      subHours(new Date(), 24)
  );

  const ordersWeek = orders.filter(
    (o) =>
      new Date(o.createdAt.seconds * 1000 + o.createdAt.nanoseconds / 1000000) >
      subHours(new Date(), 24 * 7)
  );
  const ordersMonth = orders.filter(
    (o) =>
      new Date(o.createdAt.seconds * 1000 + o.createdAt.nanoseconds / 1000000) >
      subHours(new Date(), 24 * 30)
  );
  function ordersTotal(orders) {
    let sum = 0;
    orders.forEach((order) => {
      const { line_items } = order.products;
      line_items.forEach((li) => {
        const lineSummary = (li.quantity * li.price_data.unit_amount) / 100;

        sum += lineSummary;
      });
    });

    return new Intl.NumberFormat("en-IN").format(sum);
  }

  return (
    <div>
      <h2>Orders</h2>
      <div className=" tiles-grid">
        <div className="tile">
          <h3 className="tile-header">Today</h3>
          <div className="tile-number">{ordersToday?.length}</div>
          <div className="tile-desc"> Orders today </div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This Week</h3>{" "}
          <div className="tile-number">{ordersWeek.length}</div>
          <div className="tile-desc"> Orders this week </div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This Month</h3>{" "}
          <div className="tile-number ">{ordersMonth.length}</div>
          <div className="tile-desc"> Orders this month </div>
        </div>
      </div>
      <h2>Revenue</h2>
      <div className=" tiles-grid">
        <div className="tile">
          <h3 className="tile-header">Today</h3>
          <div className="tile-number">₹{ordersTotal(ordersToday)}</div>
          <div className="tile-desc">{ordersToday.length} Orders today </div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This Week</h3>{" "}
          <div className="tile-number">₹{ordersTotal(ordersWeek)}</div>
          <div className="tile-desc">{ordersWeek.length} Orders this week </div>
        </div>
        <div className="tile">
          <h3 className="tile-header">This Month</h3>{" "}
          <div className="tile-number ">₹{ordersTotal(ordersMonth)}</div>
          <div className="tile-desc">
            {ordersMonth.length} Orders this month{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
