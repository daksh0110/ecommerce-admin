import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const [loading,setLoading]=useState(false)
  const { id } = router.query;

  useEffect(() => {

    if (!id) {
      return;
    }
    setLoading(true);
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    }).finally(()=>{
      setLoading(false)
    })
  }, [id]);
  function goBack() {
    router.push("/products");
  }
  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goBack();
  }
  return (
    <Layout>
      {loading ? <Spinner  fullWidth={true}/>:<> <h1 className="text-center">
        Do you really want to delete &nbsp;&quot;{productInfo?.Title}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteProduct} className="btn-red">
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          NO
        </button>
      </div></>}
     
    </Layout>
  );
}
