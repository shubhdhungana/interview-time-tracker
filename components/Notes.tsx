import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";
import { toast } from "react-toastify";

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
    const timer = setTimeout(() => {
      localStorage.setItem("note", note);
      toast.success("Note saved!");
    }, 10000); // 15 seconds

    return () => clearTimeout(timer);
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
