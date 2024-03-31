import axios from "axios";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/dbconfig";
export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const { name } = req.body;
    const docRef = await addDoc(collection(db, "Categories"), {
      name: name,
    });
    console.log("Document written with ID: ", docRef.id);
    res.json("Submitted");
  } else if (method === "GET") {
    const Categories = [];
    const querySnapshot = await getDocs(collection(db, "Categories"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      Categories.push({ id: doc.id, name: doc.data().name });
    });
    res.json(Categories);
  }
}
