import Timer from "@/components/Timer";
import styles from "../styles/Home.module.css";
import Notes from "@/components/Notes";
import RoughSection from "@/components/RoughSection";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.mainSection}>
        <Notes />
        <Timer />
      </div>
      <div className={styles.bottomSection}>
        <RoughSection />
        <TodoList />
      </div>
    </div>
  );
}
