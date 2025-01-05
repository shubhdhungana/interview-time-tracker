import React from "react";
import Timer from "@/components/Timer"; // Timer component for tracking time
import styles from "../styles/Home.module.scss"; // Importing custom styles
import Notes from "@/components/Notes"; // Notes component for taking notes
import RoughSection from "@/components/RoughSection"; // RoughSection component for quick sketches or rough notes
import TodoList from "@/components/TodoList"; // TodoList component for task management
import Countdown from "@/components/Countdown"; // Countdown component for a countdown timer
import { ToastContainer } from "react-toastify"; // Importing ToastContainer for showing notifications
import "react-toastify/dist/ReactToastify.css"; // Importing the default Toastify CSS

// Main Home component that brings all the sections together
export default function Home() {
  return (
    <div className={styles.container}> {/* Main container for the page */}
      <div className={styles.mainSection}> {/* The main section that holds Notes, Timer, and Countdown */}
        <Notes /> {/* Notes component */}
        <Timer /> {/* Timer component */}
        <Countdown initialTime={300} /> {/* Countdown with initial time of 300 seconds */}
      </div>
      <div className={styles.bottomSection}> {/* The bottom section that holds RoughSection and TodoList */}
        <RoughSection /> {/* RoughSection component */}
        <TodoList /> {/* TodoList component */}
      </div>
      <ToastContainer /> {/* Toast notifications container */}
    </div>
  );
}
