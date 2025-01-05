import { useState, useEffect, useRef } from "react";
import styles from "./CountDown.module.scss";

// CountdownProps interface to specify the initial time prop for the countdown (in seconds)
interface CountdownProps {
  initialTime?: number; // Optional: default time in seconds
}

// Countdown component to display and manage the countdown timer
const Countdown: React.FC<CountdownProps> = ({ initialTime = 300 }) => {
  /* 
    useState hook for managing time left in countdown.
    - `timeLeft`: Stores the current time left on the countdown.
  */
  const [timeLeft, setTimeLeft] = useState(initialTime);

  /* 
    useState hooks to manage the active status and pause status of the timer.
    - `isActive`: Tracks whether the timer is running.
    - `isPaused`: Tracks whether the timer is paused.
  */
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  /* 
    useRef hook to store the interval ID for clearing it later when necessary.
    - `intervalRef`: Keeps track of the interval set for countdown.
  */
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /* 
    useEffect hook that handles the countdown logic.
    - When the timer is active and not paused, it decrements the time left every second.
    - The effect cleans up the interval when the component is unmounted or status changes.
  */
  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0)); // Decrement time every second
      }, 1000);
    }

    // Cleanup function to clear the interval when the timer stops
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, isPaused]); // Runs the effect whenever isActive or isPaused changes

  /* 
    handleStart function to start the countdown when the user clicks "Start".
    - Resets `isActive` to true and `isPaused` to false to begin the countdown.
  */
  const handleStart = () => {
    setIsActive(true); // Starts the countdown
    setIsPaused(false); // Ensures the countdown is not paused
  };

  /* 
    handlePause function to pause the countdown when the user clicks "Pause".
    - Sets `isPaused` to true to stop the countdown.
  */
  const handlePause = () => {
    setIsPaused(true); // Pauses the countdown
  };

  /* 
    handleReset function to reset the countdown to its initial state.
    - Resets `isActive` and `isPaused` to false.
    - Resets the countdown time to the initial value.
    - Clears the interval to stop any ongoing countdown.
  */
  const handleReset = () => {
    setIsActive(false); // Stops the countdown
    setIsPaused(false); // Ensures it is not paused
    setTimeLeft(initialTime); // Resets the time back to initial value
    if (intervalRef.current) clearInterval(intervalRef.current); // Clears the ongoing interval
  };

  /* 
    handleSetTime function to change the time left based on user input.
    - Parses the input from the user and sets the time left in seconds.
    - The input field is disabled while the countdown is running.
  */
  const handleSetTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10); // Parses the input value to an integer
    setTimeLeft(isNaN(value) ? 0 : value * 60); // Sets time in seconds (multiplies minutes by 60)
  };

  /* 
    formatTime function to format the time as MM:SS.
    - Converts the time in seconds to a string representing minutes and seconds.
  */
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60); // Calculates minutes
    const seconds = time % 60; // Calculates remaining seconds
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`; // Returns time formatted as MM:SS
  };

  /* 
    getWarningMessage function to provide a warning message when the countdown is nearing the end.
    - Shows warning messages when the time is less than 2 minutes.
  */
  const getWarningMessage = () => {
    if (timeLeft <= 60) return "⚠️ Warning: Less than 1 minute remaining!"; // Less than 1 minute
    if (timeLeft <= 120) return "⚠️ Warning: Less than 2 minutes remaining!"; // Less than 2 minutes
    return "";
  };

  return (
    <div className={styles.countdown}>
      {/* 
        Input field to set the countdown time in minutes. 
        Disabled when the countdown is running (isActive is true).
      */}
      <input
        type="number"
        placeholder="Set time in minutes"
        onChange={handleSetTime} // Triggers handleSetTime when input changes
        disabled={isActive} // Disable input while countdown is active
        className={styles.countdown__input} // Style for the input
      />
      
      {/* 
        Display the time left in countdown formatted as MM:SS or "Time's up!" when countdown finishes.
      */}
      <p className={styles.countdown__time}>
        {timeLeft > 0 ? formatTime(timeLeft) : "Time's up!"}
      </p>

      {/* 
        Display warning message when the time is less than or equal to 2 minutes.
      */}
      {timeLeft <= 120 && (
        <p className={styles.countdown__warning}>{getWarningMessage()}</p>
      )}

      {/* 
        Control buttons: Start, Pause, Reset. 
        Disable buttons based on the current state (e.g., disable start if already active).
      */}
      <div className={styles.countdown__controls}>
        <button
          id="start"
          onClick={handleStart} // Start the countdown
          disabled={isActive && !isPaused} // Disable "Start" if timer is active and not paused
        >
          Start
        </button>
        <button onClick={handlePause} disabled={!isActive || isPaused}> // Pause the countdown
          Pause
        </button>
        <button id="reset" onClick={handleReset}> // Reset the countdown
          Reset
        </button>
      </div>
    </div>
  );
};

export default Countdown;
