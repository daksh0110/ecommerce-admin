import Layout from "@/components/Layout";
import swal from "sweetalert";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Categories() {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [categories, setCateogries] = useState([]);
  const [properties, setProperties] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  useEffect(() => {
    fetchCategories();
  }, []);
  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCateogries(result.data);
    });
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    console.log(properties);
    const data = {
      name,
      parentCategory,
      properties: properties.map((p) => ({
        name: p.name,
        values: p.values.split(","),
      })),
    };

    if (editedCategory) {
      await axios.put("/api/categories", { ...data, id: editedCategory.id });
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    fetchCategories();
    setName("");
    setParentCategory("");
    setProperties([]);
  }
  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);

    setParentCategory(category.parent?.id);
    setProperties(
      category.properties?.map(({ name, values }) => ({
        name,
        values: values.join(","),
      }))
    );
  }
  function deleteCategory(category) {
    swal({
      title:
        "Are you sure that you want to delete " + category.name + " Category",
      text: "Once deleted, you will not be able to recover this Category",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        console.log(category.id);
        swal(category.name + " Category has been deleted!", {
          icon: "success",
        });
        await axios.delete("/api/categories?id=" + category.id);
        fetchCategories();
      } else {
        // Here you put the code you want to execute if the user cancels the action
        swal("No changes has been made");
      }
    });
  }
  function addProperty() {
    setProperties((prev) => {
      prev = prev || [];
      return [...prev, { name: "", values: "" }];
    });
  }
  function handlePropertyNameChnage(property, newName, index) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }
  function handlePropertyValuesChnage(property, newValues, index) {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }
  function removeProperty(indexToRemove) {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove;
      });
    });
  }
  return (
    <Layout>
      <h1> Categories</h1>
      <label>
        {editedCategory
          ? "Edit category " + editedCategory.name
          : "Create New Category"}{" "}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder={"Category Name"}
          />
          <select
            value={parentCategory}
            onChange={(ev) => setParentCategory(ev.target.value)}
          >
            <option value="">No Parent Category</option>
            {categories.length > 0 &&
              categories.map((category, index) => (
                <option key={index} value={category.id}>
                  <td>{category.name}</td>
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <lable className="block">Properties</lable>
          <button
            type="button"
            onClick={addProperty}
            className="btn-default text-sm mb-2"
          >
            Add new property
          </button>
          {properties?.length > 0 &&
            properties.map((property, index) => (
              <div key={index} className="flex gap-1 mb-2">
                <input
                  type="text"
                  className="mb-0"
                  value={property.name}
                  onChange={(ev) =>
                    handlePropertyNameChnage(property, ev.target.value, index)
                  }
                  placeholder="property name"
                />
                <input
                  type="text"
                  value={property.values}
                  className="mb-0"
                  onChange={(ev) =>
                    handlePropertyValuesChnage(property, ev.target.value, index)
                  }
                  placeholder="values "
                />
                <button
                  onClick={() => removeProperty(index)}
                  type="button"
                  className="btn-default mb-"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className=" flex gap-1">
          {editedCategory && (
            <button
              onClick={() => {
                setEditedCategory(null),
                  setName(""),
                  setParentCategory(""),
                  setProperties([]);
              }}
              className="btn-default"
            >
              Cancel
            </button>
          )}
          <button type={"submit"} className="btn-primary py-1 ">
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent Category</td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category, index) => (
                <tr key={index}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <button
                      onClick={() => editCategory(category)}
                      className="btn-primary mr-1"
                    >
                      Edit
                    </button>
                    <button
                      className="btn-primary"
                      onClick={() => deleteCategory(category)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
