import axios from "axios";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/dbconfig";
export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const { name } = req.body;
    const docRef = await addDoc(collection(db, "Categories"), {
      name: name,
    });

    res.json("Submitted");
  } else if (method === "GET") {
    const Categories = [];
    const querySnapshot = await getDocs(collection(db, "Categories"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      Categories.push({ id: doc.id, name: doc.data().name });
    });
    res.json(Categories);
  } else if (method === "DELETE") {
    const { id } = req.body;
    await deleteDoc(doc(db, "Categories", id));
    res.json("Deleted");
  }
}
