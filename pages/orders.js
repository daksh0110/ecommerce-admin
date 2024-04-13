import React, { useDebugValue, useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold p-3">Orders</h1>
      <table className="table-auto w-full">
        <thead>
          <tr className="border">
            <th>Date</th>
            <th>Reception</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order, index) => (
              <tr key={index}>
                <td>
                  {order.createdAt &&
                    new Date(order.createdAt.seconds * 1000).toLocaleDateString(
                      "en-US"
                    )}
                </td>

                <td>
                  {order.name} <br /> {order.email} <br /> {order.postalCode}{" "}
                  {order.country} <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.products.line_items.map((l) => (
                    <>
                      {l.price_data.product_data?.name} x {l.quantity} <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Orders;
