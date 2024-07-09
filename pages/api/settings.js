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
  query,
  where,
} from "firebase/firestore";
import { db, storage } from "@/lib/dbconfig";
import { isAdminRequest } from "./auth/[...nextauth]";
export default async function handle(req, res) {
  await isAdminRequest(req, res);

  if (req.method === "PUT") {
    const { name, value } = req.body;
    console.log({ name, value });
    const q = query(collection(db, "Settings"), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    const documentRef = querySnapshot?.docs[0]?.ref;

    if (documentRef !== undefined) {
      await updateDoc(documentRef, {
        value: value,
      });
      res.json("changed");
    } else {
      const docRef = await addDoc(collection(db, "Settings"), {
        name: name,
        value: value,
      });
      res.json("Document written with ID: ", docRef.id);
    }
  }

  if (req.method === "GET") {
    const { name } = req.query;

    const q = query(collection(db, "Settings"), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    const documentRef = querySnapshot?.docs[0];
    if (documentRef !== undefined) {
      res.json({ ...documentRef.data(), id: documentRef.id });
    } else {
      res.json("not found");
    }
  }
}
