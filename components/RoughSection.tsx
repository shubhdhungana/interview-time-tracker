import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";
import { toast } from "react-toastify";

const RoughSection: React.FC = () => {
  const [rough, setRough] = useState("");

  useEffect(() => {
    const savedRough = localStorage.getItem("rough");
    if (savedRough) {
      setRough(savedRough);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("rough", rough);
      toast.success("Rough note saved!");
    }, 10000); // 15 seconds

    return () => clearTimeout(timer);
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
