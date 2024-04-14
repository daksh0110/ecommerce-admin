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
      {/* <h1 className="text-2xl font-bold p-3">Orders</h1>
      <div className="table-container">
        <table className="table-auto w-full">
          <thead className="border">
            <tr>
              <th>Date</th>
              <th colSpan="2">Paid</th>
              <th>Reception</th>
              <th>Products</th>
            </tr>
          </thead>
        </table>
        <div className="table-body">
          <table className="table-auto w-full border">
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td className="border">
                    {order.createdAt &&
                      new Date(
                        order.createdAt.seconds * 1000
                      ).toLocaleDateString("en-US")}
                  </td>
                  <td className="border">{order.Paid ? "YES" : "NO"}</td>
                  <td className="border"></td>{" "}
                  <td>
                    {order.name} <br /> {order.email} <br /> {order.postalCode}{" "}
                    {order.country} <br />
                    {order.streetAddress}
                  </td>
                  <td>
                    {order.products.line_items.map((l, index) => (
                      <div key={index}>
                        {l.price_data.product_data?.name} x {l.quantity} <br />
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
      <h1 className="text-2xl font-bold p-3">Orders</h1>
      <div class=" items-center table-container ">
        <div class="">
          <table class=" bg-white table-auto w-full  rounded-xl">
            <thead>
              <tr class="bg-blue-gray-100 text-gray-700">
                <th class="py-4 px-5  m text-left">Date</th>
                <th class="py-3 px-4 text-left">Paid</th>
                <th class="py-3 px-4 text-left">Reception</th>
                <th class="py-3 px-4 text-left">Products</th>
              </tr>
            </thead>
            <tbody class="text-blue-gray-900">
              {orders.map((order, index) => (
                <tr key={index} class="border-b border-blue-gray-200">
                  <td class="py-3 px-4">
                    {order.createdAt &&
                      new Date(
                        order.createdAt.seconds * 1000
                      ).toLocaleDateString("en-US")}
                  </td>
                  <td class="py-3 px-4">{order.paid ? "YES" : "NO"}</td>
                  <td class="py-3 px-4">
                    {order.name} <br /> {order.email} <br /> {order.postalCode}{" "}
                    {order.country} <br />
                    {order.streetAddress}
                  </td>
                  <td class="py-3 px-4">
                    {order.products.line_items.map((l, index) => (
                      <div key={index}>
                        {l.price_data.product_data?.name} x {l.quantity} <br />
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div class="w-full pt-5 px-4 mb-8 mx-auto "></div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
