import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Header from "../components/Header";

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Header />
    </>
  );
  if (session) {
    console.log(session);
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("discord")}>Sign in</button>
    </>
  );
};

export default Home;
