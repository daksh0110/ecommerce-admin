import NextAuth, { getServerSession } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@auth/firebase-adapter";

import { cert } from "firebase-admin/app";
import { db } from "@/lib/dbconfig";
import "firebase/firestore";
import {
  getDoc,
  collection,
  getDocs,
  query,
  addDoc,
  where,
} from "firebase/firestore";

async function isAdminEmail(email) {
  const q = query(collection(db, "Admins"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const doc = querySnapshot?.docs[0];

  if (doc === undefined) {
    return false;
  } else {
    return true;
  }
}
export const authOptions = {
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  }),
  callbacks: {
    session: async ({ session, token, user }) => {
      if (await isAdminEmail(session?.user?.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
  providers: [
    // OAuth authentication providers...

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!isAdminEmail(session?.user?.email)) {
    throw "not admin";
  }
}
