import { useState, useEffect, useRef } from "react";
import styles from "./CountDown.module.scss";
//import 
interface CountdownProps {
  initialTime?: number; // Optional: default time in seconds
}

const Countdown: React.FC<CountdownProps> = ({ initialTime = 300 }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(initialTime);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleSetTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setTimeLeft(isNaN(value) ? 0 : value * 60);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const getWarningMessage = () => {
    if (timeLeft <= 60) return "⚠️ Warning: Less than 1 minute remaining!";
    if (timeLeft <= 120) return "⚠️ Warning: Less than 2 minutes remaining!";
    return "";
  };

  return (
    <div className={styles.countdown}>
      <input
        type="number"
        placeholder="Set time in minutes"
        onChange={handleSetTime}
        disabled={isActive}
        className={styles.countdown__input}
      />
      <p className={styles.countdown__time}>
        {timeLeft > 0 ? formatTime(timeLeft) : "Time's up!"}
      </p>
      {timeLeft <= 120 && (
        <p className={styles.countdown__warning}>{getWarningMessage()}</p>
      )}
      <div className={styles.countdown__controls}>
        <button
          id="start"
          onClick={handleStart}
          disabled={isActive && !isPaused}
        >
          Start
          
        </button>
        <button onClick={handlePause} disabled={!isActive || isPaused}>
          Pause
        </button>
        <button id="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Countdown;
