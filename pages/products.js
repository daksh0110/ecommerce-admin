import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Link from "next/link";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useRouter } from "next/router";

const Products = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    await axios.get("/api/Products").then((response) => {
      setProducts(response.data);
    });
  }
  const OnDelete = (id) => {
    confirmAlert({
      title: "Do you want to delete This Product?",

      buttons: [
        {
          label: "Yes",
          className: "  btn-red mx-auto",
          onClick: async () => {
            await axios.delete("/api/Products", { data: { id: id } });
            fetchProduct();

            console.log(id);
          },
        },
        {
          label: "No",
          className: "btn-primary mx-auto ",
        },
      ],
    });
  };
  console.log(products);
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
              <tr className="text-lg border" key={product.id}>
                <td className="border">{product.Title}</td>
                <td className="">
                  <div className="flex justify-center mt-2">
                    <Link href={"/Products/edit/" + product.id}>
                      <button className="btn-primary">Edit</button>
                    </Link>
                    <button
                      className="btn-red"
                      onClick={() => OnDelete(product.id)}
                    >
                      Delete
                    </button>
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
