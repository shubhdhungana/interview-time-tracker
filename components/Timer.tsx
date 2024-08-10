import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";

const Timer: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    document.body.classList.remove(styles.warning, styles.danger);
  };

  useEffect(() => {
    if (time >= 0 && time < 60 * 3) {
      document.body.classList.remove(styles.danger);
      if (time >= 60 * 2) {
        document.body.classList.add(styles.warning);
      } else if (time >= 60) {
        document.body.classList.remove(styles.warning);
        document.body.classList.add(styles.danger);
      }
    } else {
      document.body.classList.remove(styles.warning, styles.danger);
    }
  }, [time]);

  return (
    <div className={styles.timer}>
      <h4>
        <b>Timer</b>
      </h4>
      <div>{new Date(time * 1000).toISOString().substr(11, 8)}</div>
      <button id="start" onClick={handleStartPause}>
        {isRunning ? "Pause" : "Start"}
      </button>
      <button id="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Timer;
