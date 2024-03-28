import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Link from "next/link";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetch() {
      await axios.get("api/Products").then((response) => {
        setProducts(response.data);
      });
    }
    fetch();
  }, []);

  return (
    <Layout>
      <div className=" flex flex-col">
        <Link href={"/Products/NewProduct"}>
          <button className="bg-blue-300 p-2 rounded-2xl ">
            Add a Product
          </button>
        </Link>
        <table class="table-auto">
          <thead>
            <tr className="text-xl">
              <th>Products</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr className="text-lg border" key={index}>
                <td className="border">{product.Title}</td>
                <td className="">
                  <div className="flex justify-center mt-2">
                    <button className="btn-primary">Edit</button>
                    <button className="btn-red">Delete</button>
                  </div>
                </td>
              </tr>
            ))}

            <tr></tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Products;
