import React from "react";
import Timer from "@/components/Timer";
import styles from "../styles/Home.module.scss";
import Notes from "@/components/Notes";
import RoughSection from "@/components/RoughSection";
import TodoList from "@/components/TodoList";
import Countdown from "@/components/Countdown";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.mainSection}>
        <Notes />
        <Timer />
        <Countdown initialTime={300} />
      </div>
      <div className={styles.bottomSection}>
        <RoughSection />
        <TodoList />
      </div>
      <ToastContainer />
    </div>
  );
}
