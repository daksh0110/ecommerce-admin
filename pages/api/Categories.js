import axios from "axios";
import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/dbconfig";
export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const { name, parentCategory, properties } = req.body;
    let parentData = {};

    if (parentCategory) {
      const categoryRef = doc(db, "Categories", parentCategory);
      const categorySnap = await getDoc(categoryRef);
      const docRef = await addDoc(collection(db, "Categories"), {
        name: name,
        parent: { ...categorySnap.data(), id: categorySnap.id },
        properties: properties,
      });
    } else {
      const docRef = await addDoc(collection(db, "Categories"), {
        name: name,
        parent: parentData,
      });
    }

    res.json("Submitted");
  } else if (method === "GET") {
    const Categories = [];
    const querySnapshot = await getDocs(collection(db, "Categories"));
    querySnapshot.forEach((doc) => {
      Categories.push({ id: doc.id, ...doc.data() });
    });
    res.json(Categories);
  } else if (method === "DELETE") {
    const { id } = req.query;
    console.log(id);
    await deleteDoc(doc(db, "Categories", id));
    res.json("ok");
  } else if (method === "PUT") {
    const { name, parentCategory, id, properties } = req.body;
    let parentData = {};
    const docRef = doc(db, "Categories", id);
    if (parentCategory) {
      const categoryRef = doc(db, "Categories", parentCategory);
      const categorySnap = await getDoc(categoryRef);

      await updateDoc(docRef, {
        name: name,
        parent: { ...categorySnap.data(), id: categorySnap.id },
        properties: properties,
      });
    } else {
      await updateDoc(docRef, {
        name: name,
        parent: parentData,
        properties: properties,
      });
    }

    res.json("done");
  }
}
