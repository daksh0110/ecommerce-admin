import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";
function SettingsPage({ swal }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [featuredProductId, setFeatureProductId] = useState("");

  const [shippingFee, setShippingFee] = useState("");
  useEffect(() => {
    setIsLoading(true);
    fetchAll().then(() => {
      setIsLoading(false);
    });
  }, []);

  async function fetchAll() {
    await axios.get("api/products").then((response) => {
      setProducts(response.data);
    });

    await axios.get("api/settings?name=featuredProductId").then((response) => {
      setFeatureProductId(response.data.value);
    });
    await axios.get("api/settings?name=shippingFee").then((response) => {
      setShippingFee(response.data.value);
    });
  }
  async function saveSettings() {
    setIsLoading(true);
    await axios.put("api/settings", {
      name: "featuredProductId",
      value: featuredProductId,
    });

    await axios.put("api/settings", {
      name: "shippingFee",
      value: shippingFee,
    });
    await swal.fire({
      title: "Setting saved",
      icon: "success",
    });
    setIsLoading(false);
  }

  return (
    <Layout>
      <h1>Settings</h1>
      {isLoading && <Spinner fullWidth={true} />}
      {!isLoading && (
        <>
          <label>Featured Product</label>
          <select
            value={featuredProductId}
            onChange={(ev) => setFeatureProductId(ev.target.value)}
            name=""
            id=""
          >
            {products.length > 0 &&
              products.map((product) => (
                <option key={product} value={product.id}>
                  {product.Title}
                </option>
              ))}
          </select>
          <label>Shipping Price (in Rupees)</label>
          <input
            value={shippingFee}
            onChange={(ev) => setShippingFee(ev.target.value)}
            type="number"
          />
          <div>
            <button onClick={saveSettings} className="btn-primary">
              Save Setings
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }) => <SettingsPage swal={swal} />);
