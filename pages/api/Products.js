import axios from "axios";
import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";
import { db, storage } from "@/lib/dbconfig";
import { ref } from "firebase/storage";
export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const { Title, Description, Price, Images } = req.body;
    console.log(Title);
    console.log(Description);
    // Add a new document with a generated id.

    const docRef = await addDoc(collection(db, "Products"), {
      Title: Title,
      Description: Description,
      Price: Price,
      Images: [...Images],
    });
    console.log("Document written with ID: ", docRef.id);
    res.json("Submitted");
  }

  if (method === "GET") {
    const ProductData = [];
    const querySnapshot = await getDocs(collection(db, "Products"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      ProductData.push(doc.data());
    });

    res.json(ProductData);
  }
}
