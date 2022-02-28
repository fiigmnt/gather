import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./Landing.module.css";

const Landing: React.FC = () => {
  const handleSignIn = () => {
    signIn("discord");
  };
  return (
    <div className={styles.container}>
      <img src="/images/landing.png" alt="home" onClick={handleSignIn} />
    </div>
  );
};

export default Landing;
