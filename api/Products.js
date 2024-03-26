import axios from "axios";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import app from "@/lib/dbconfig";
const db = getFirestore(app);
export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const { Title } = req.body;
    console.log(Title);
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "cities"), {
      name: "Tokyo",
      country: "Japan",
    });
    console.log("Document written with ID: ", docRef.id);
    res.json("Submitted");
  }
}
