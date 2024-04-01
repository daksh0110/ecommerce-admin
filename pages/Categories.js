import axios from "axios";
import Layout from "./Layout";
import React, { useEffect, useState } from "react";

const Categories = () => {
  useEffect(() => {
    fetchCategory();
  }, []);
  const [name, setName] = useState("");
  const [categories, SetCategories] = useState([]);

  const fetchCategory = () => {
    axios.get("/api/Categories").then((response) => {
      SetCategories(response.data);
    });
  };
  const SubmitCategory = async (event) => {
    event.preventDefault();
    await axios.post("/api/Categories", { name }).then((response) => {});

    setName("");
    fetchCategory();
  };

  const handleDelete = async (id) => {
    await axios.delete("/api/Categories", { data: { id: id } });
    fetchCategory();
  };
  return (
    <Layout>
      <label className="p-2 flex text-2xl font-bold text-blue-800 login-font ">
        Add a Category
      </label>
      <input
        onChange={(ev) => setName(ev.target.value)}
        value={name}
        placeholder="Category Name"
        className="w-2/3 rounded-lg p-2 border"
      />
      <button
        onClick={SubmitCategory}
        type="submit"
        className=" ml-4 btn-primary"
      >
        {" "}
        Save
      </button>

      <label className="p-2 mt-2 flex flex-col text-2xl font-bold text-blue-800 login-font ">
        List of Categories
        <table class="table-auto">
          <thead>
            <tr className="text-xl"></tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr className="text-lg border" key={category.id}>
                <td className="border">{category.name}</td>
                <td className="">
                  <div className="flex justify-center mt-2">
                    <button className="btn-primary">Edit</button>

                    <button
                      onClick={() => handleDelete(category.id)}
                      className="btn-red"
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
      </label>
    </Layout>
  );
};

export default Categories;
