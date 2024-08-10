import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";

const RoughSection: React.FC = () => {
  const [rough, setRough] = useState("");

  useEffect(() => {
    const savedRough = localStorage.getItem("rough");
    if (savedRough) {
      setRough(savedRough);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("rough", rough);
  }, [rough]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRough(event.target.value);
  };

  return (
    <div className={styles.roughSection}>
      <h2>Rough Section</h2>
      <textarea value={rough} onChange={handleChange} rows={10} cols={5} />
    </div>
  );
};

export default RoughSection;
