import ProductForm from "@/pages/Components/ProductForm";
import Layout from "@/pages/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
function Editpage() {
  const router = useRouter();
  const { id } = router.query;

  const [productInfo, setProductInfo] = useState(null);
  useEffect(() => {
    async function fetch() {
      await axios.get(`/api/Products/?id=${id}`).then((response) => {
        setProductInfo(response.data);
      });
    }
    if (id) {
      fetch();
    }
  }, [id]);

  console.log("ProductInfo==" + productInfo);
  return (
    <Layout>{productInfo && <ProductForm {...productInfo} id={id} />}</Layout>
  );
}

export default Editpage;
