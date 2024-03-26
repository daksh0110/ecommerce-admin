import React from "react";

const ProductForm = () => {
  return (
    <form className="">
      <label className="p-2 text-2xl font-bold text-blue-800 login-font ">
        Title
      </label>
      <input placeholder="Product name" className="border" />
      <button for className=" border">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
