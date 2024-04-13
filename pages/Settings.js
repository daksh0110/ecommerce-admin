import React from "react";
import Layout from "./Layout";
import { useSession, signIn, signOut } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
const Settings = () => {
  const { data: session } = useSession();
  return (
    <Layout>
      <button onClick={() => signOut()}>Sign out</button>
    </Layout>
  );
};

export default Settings;
