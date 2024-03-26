import React, { useState } from "react";
import Layout from "../Layout";
import ProductForm from "../Components/ProductForm";
import axios from "axios";
const NewProduct = () => {
  const [Title, setTitle] = useState("");
  const Data = { Title };
  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const onSubmit = (event) => {
    console.log("Submitted");
    axios.post("/api/Products", Data).then(function (response) {
      console.log(response);
    });
    event.preventDefault();
  };
  return (
    <Layout>
      <form className=" flex flex-col">
        <label className="p-2 text-2xl font-bold text-blue-800 login-font ">
          Title
        </label>
        <input
          type="text"
          value={Title}
          placeholder="Product name"
          onChange={handleChange}
          className="border-2 rounded-lg "
        />
        <button
          type="submit"
          onClick={onSubmit}
          className="  mt-4 border text-left w-min p-2 rounded-xl bg-blue-800 login-font text-white"
        >
          Save
        </button>
      </form>
    </Layout>
  );
};

export default NewProduct;
