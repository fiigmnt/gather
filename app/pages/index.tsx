import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Header from "../components/Header";
import Landing from "../components/Landing";

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Header />
        DASHBOARD
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      {/* <Header /> */}
      <Landing />
    </>
  );
};

export default Home;
