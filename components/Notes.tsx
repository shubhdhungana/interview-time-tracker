import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";
import { toast } from "react-toastify";

// Notes component for managing user notes and saving them
const Notes: React.FC = () => {
  /* 
    useState hook to manage the value of the note.
    `note`: Holds the text entered by the user in the textarea.
  */
  const [note, setNote] = useState("");

  /* 
    useEffect hook to load the saved note from localStorage when the component mounts.
    If there's any saved note in localStorage, it will populate the `note` state with it.
  */
  useEffect(() => {
    const savedNote = localStorage.getItem("note"); // Retrieve saved note from localStorage
    if (savedNote) {
      setNote(savedNote); // Set the state with the saved note
    }
  }, []); // Empty dependency array means it runs once when the component mounts

  /* 
    useEffect hook to save the note to localStorage every 10 seconds.
    Whenever the `note` state changes, it starts a timeout to save the value.
    It also triggers a success toast when the note is saved.
  */
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("note", note); // Save the current note to localStorage
      toast.success("Note saved!"); // Show a success toast notification
    }, 10000); // Timeout of 10 seconds before saving the note

    return () => clearTimeout(timer); // Clean up the timer when the component is unmounted or state changes
  }, [note]); // Re-run this effect when `note` state changes

  /* 
    handleChange function is triggered whenever the textarea value changes.
    It updates the `note` state with the new value entered by the user.
  */
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(event.target.value); // Update the note state with the new text from textarea
  };

  return (
    /* 
      Wrapper div for the Notes component, using the `styles.notes` class for styling.
    */
    <div className={styles.notes}>
      
      {/* 
        Heading for the section, indicating that this is the "Notes" section.
      */}
      <h2>Notes</h2>

      {/* 
        Textarea element for users to input their notes. 
        It uses the value from the `note` state and updates it via `handleChange` when the user types.
      */}
      <textarea value={note} onChange={handleChange} rows={10} cols={80} />
    </div>
  );
};

export default Notes;
