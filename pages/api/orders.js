import { db } from "@/lib/dbconfig";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default async function Handler(req, res) {
  const Orders = [];
  const collectionRef = collection(db, "Orders");
  const querySnapshot = await getDocs(
    query(collectionRef, orderBy("createdAt"))
  );
  querySnapshot.forEach((doc) => {
    Orders.push({ ...doc.data(), id: doc.id });
  });

  console.log(Orders);
  res.json(Orders);
}
