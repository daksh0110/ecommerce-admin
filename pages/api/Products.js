import axios from "axios";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { db } from "@/lib/dbconfig";
export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const { Title, Description } = req.body;
    console.log(Title);
    console.log(Description);
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "Products"), {
      Title: Title,
      Description: Description,
    });
    console.log("Document written with ID: ", docRef.id);
    res.json("Submitted");
  }
}
