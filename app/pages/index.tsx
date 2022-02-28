import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import Header from "../components/Header";
import Landing from "../components/Landing";
import MainDashboard from "../components/MainDashboard";

const Home: NextPage = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Header />
        <MainDashboard />
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
