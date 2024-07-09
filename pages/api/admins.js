import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/dbconfig";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  await isAdminRequest(req, res);

  if (req.method === "POST") {
    const { email } = req.body;

    const adminCollection = collection(db, "Admins");
    const q = query(adminCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      const docRef = await addDoc(adminCollection, {
        email: email,
        createdAt: serverTimestamp(),
      });
      res.json({ id: docRef.id });
    } else {
    }
  }

  if (req.method === "GET") {
    const existingEmail = [];
    const querySnapshot = await getDocs(collection(db, "Admins"));
    querySnapshot.forEach((doc) => {
      existingEmail.push({ ...doc.data(), id: doc.id });
    });

    res.json(existingEmail);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    await deleteDoc(doc(db, "Admins", id));

    res.json("Admin Deleted");
  }
}
