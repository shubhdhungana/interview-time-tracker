// pages/index.tsx

import Timer from "@/components/Timer";
import styles from "../styles/Home.module.scss";
import Notes from "@/components/Notes";
import RoughSection from "@/components/RoughSection";
import TodoList from "@/components/TodoList";
import Countdown from "@/components/Countdown";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.mainSection}>
        <Notes />
        <Timer />
        <Countdown initialTime={300} />{" "}
        {/* Countdown set for 5 minutes (300 seconds) */}
      </div>
      <div className={styles.bottomSection}>
        <RoughSection />
        <TodoList />
      </div>
    </div>
  );
}
