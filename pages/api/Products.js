import axios from "axios";
import {
  collection,
  addDoc,
  doc,
  getFirestore,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "@/lib/dbconfig";
import { ref } from "firebase/storage";

export default async function handler(req, res) {
  const { method } = req;

  if (method === "POST") {
    const { Title, Description, Price, Images, category, properties } =
      req.body;

    // Add a new document with a generated id.

    const docRef = await addDoc(collection(db, "Products"), {
      Title: Title,
      Description: Description,
      Price: Price,
      Images: [...Images],
      Category: category,
      properties: properties,
      createdAt: serverTimestamp(),
    });

    res.json("Submitted");
  } else if (method === "GET") {
    const id = req.query?.id;

    if (!id) {
      const ProductData = [];
      const querySnapshot = await getDocs(collection(db, "Products"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        ProductData.push({ ...doc.data(), id: doc.id });
      });

      res.json(ProductData);
    } else {
      const docRef = doc(db, "Products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        res.json(docSnap.data());
      } else {
      }
    }
  } else if (method === "PUT") {
    const { Title, Description, Price, Images, category, properties } =
      req.body;
    const id = req.query.id;

    const docRef = doc(db, "Products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const existingData = docSnap.data();
      const prevImages = existingData.Images || [];

      // Filter out duplicate links
      const uniqueImages = [...new Set([...prevImages, ...Images])];

      // Update document with unique links
      await updateDoc(docRef, {
        Title: Title,
        Description: Description,
        Price: Price,
        Images: uniqueImages,
        Category: category,
        properties: properties,
        createdAt: serverTimestamp(),
      });
    }

    res.json("done");
  } else if (method === "DELETE") {
    const id = req.query.id;
    console.log(id);
    await deleteDoc(doc(db, "Products", id));
    res.json("Deleted");
  }
}
