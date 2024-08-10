import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";

const Notes: React.FC = () => {
  const [note, setNote] = useState("");
  //this is note change
  useEffect(() => {
    const savedNote = localStorage.getItem("note");
    if (savedNote) {
      setNote(savedNote);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("note", note);
  }, [note]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value);
  };

  return (
    <div className={styles.notes}>
      <h2>Notes</h2>
      <textarea value={note} onChange={handleChange} rows={10} cols={80} />
    </div>
  );
};

export default Notes;
