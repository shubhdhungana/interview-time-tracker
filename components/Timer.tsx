import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";

// Timer component to handle start, pause, and reset functionality
const Timer: React.FC = () => {
  /* 
    useState hook to manage the time (in seconds).
    `time`: Holds the current time in seconds.
    `isRunning`: A boolean flag to track whether the timer is running or paused.
  */
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  /* 
    useEffect hook to control the timer interval.
    Runs when the `isRunning` state changes. If `isRunning` is true, 
    it starts the timer by incrementing the `time` every 10 seconds. 
    The timer will be cleared when the component unmounts or when the `isRunning` state changes.
  */
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Increment time by 1 every 10 seconds
      }, 10000);
    }
    return () => clearInterval(timer); // Clean up the timer on component unmount or when `isRunning` changes
  }, [isRunning]);

  /* 
    Function to toggle the timer's state between running and paused.
    If `isRunning` is true, the timer is running, and if false, it pauses.
  */
  const handleStartPause = () => {
    setIsRunning(!isRunning); // Toggle isRunning state
  };

  /* 
    Function to reset the timer.
    Stops the timer, resets the time to 0, and removes any warning/danger styles.
  */
  const handleReset = () => {
    setIsRunning(false); // Stop the timer
    setTime(0); // Reset the time to 0
    document.body.classList.remove(styles.warning, styles.danger); // Remove any styling based on time
  };

  /* 
    useEffect hook that applies different styles based on the time passed.
    If the time exceeds 1 minute but less than 2 minutes, it applies the "warning" style.
    If the time exceeds 2 minutes, it applies the "danger" style.
    Removes all styles once the time reaches or exceeds 3 minutes or resets.
  */
  useEffect(() => {
    if (time >= 0 && time < 60 * 3) {
      document.body.classList.remove(styles.danger); // Remove danger style
      if (time >= 60 * 2) {
        document.body.classList.add(styles.warning); // Apply warning style if time exceeds 2 minutes
      } else if (time >= 60) {
        document.body.classList.remove(styles.warning); // Remove warning style if time exceeds 1 minute
        document.body.classList.add(styles.danger); // Apply danger style if time exceeds 1 minute
      }
    } else {
      document.body.classList.remove(styles.warning, styles.danger); // Remove both styles if the time is above 3 minutes or reset
    }
  }, [time]);

  return (
    /* 
      Wrapper div for the timer component, using the `styles.timer` class for styling.
    */
    <div className={styles.timer}>
      
      {/* 
        Timer heading with a bold "Timer" label.
      */}
      <h4>
        <b>Timer</b>
      </h4>

      {/* 
        Displaying the formatted time in HH:MM:SS format. 
        `new Date(time * 1000).toISOString().substr(11, 8)` converts time (in seconds) to the desired format.
      */}
      <div>{new Date(time * 1000).toISOString().substr(11, 8)}</div>

      {/* 
        Button to toggle the start/pause state of the timer.
        The button text changes based on the `isRunning` state.
      */}
      <button id="start" onClick={handleStartPause}>
        {isRunning ? "Pause" : "Start"}
      </button>

      {/* 
        Button to reset the timer. Calls `handleReset` function to reset timer state.
      */}
      <button id="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Timer;
