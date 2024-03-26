import React, { useState } from "react";
import Layout from "../Layout";

import axios from "axios";
const NewProduct = () => {
  const [Title, setTitle] = useState("");
  const [Description, SetDiscription] = useState("");
  const Data = { Title, Description };

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
          name="Title"
          value={Title}
          placeholder="Product name"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className=" border-2 rounded-lg "
        />
        <label className="p-2 text-2xl font-bold text-blue-800 login-font">
          Description
        </label>
        <textarea
          type="text"
          name="Description"
          placeholder="Description of the product"
          value={Description}
          onChange={(e) => {
            SetDiscription(e.target.value);
          }}
          className="border-2 rounded-lg resize-y"
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
