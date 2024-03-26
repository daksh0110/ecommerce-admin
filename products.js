import React from "react";
import Layout from "./Layout";
import Link from "next/link";
const products = () => {
  return (
    <Layout>
      <div className=" flex">
        <Link href={"/Products/NewProduct"}>
          <button className="bg-blue-300 p-2 rounded-2xl ">
            Add a Product
          </button>
        </Link>{" "}
      </div>
    </Layout>
  );
};

export default products;
