import React, { Children } from "react";

import SignupFrom from "./Components/LoginPage/SignupFrom";
import { useSession, signIn, signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { Dashboard } from "./Components/AdminPage/Dashboard";
import Nav from "./Components/AdminPage/Nav";
import Googleicon from "./Components/LoginPage/Googleicon";
import Layout from "./Layout";
export default function Home() {
  const { data: session } = useSession();
  return <Layout>Signed in as {session?.user.email}</Layout>;
}
