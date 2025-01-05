import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";
import { toast } from "react-toastify";

// RoughSection component for managing user input (rough notes) and saving them
const RoughSection: React.FC = () => {
  /* 
    useState hook to manage the value of the rough notes.
    `rough`: Holds the text entered by the user in the textarea.
  */
  const [rough, setRough] = useState("");

  /* 
    useEffect hook to load the saved rough note from localStorage when the component mounts.
    If there's any saved note in localStorage, it will populate the `rough` state with it.
  */
  useEffect(() => {
    const savedRough = localStorage.getItem("rough"); // Retrieve saved note from localStorage
    if (savedRough) {
      setRough(savedRough); // Set the state with the saved rough note
    }
  }, []); // Empty dependency array means it runs once when the component mounts

  /* 
    useEffect hook to save the rough note to localStorage every 10 seconds.
    Whenever the `rough` state changes, it starts a timeout to save the value.
    It also triggers a success toast when the rough note is saved.
  */
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("rough", rough); // Save the current rough note to localStorage
      toast.success("Rough note saved!"); // Show a success toast notification
    }, 10000); // Timeout of 10 seconds before saving the note

    return () => clearTimeout(timer); // Clean up the timer when the component is unmounted or state changes
  }, [rough]); // Re-run this effect when `rough` state changes

  /* 
    handleChange function is triggered whenever the textarea value changes.
    It updates the `rough` state with the new value entered by the user.
  */
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRough(event.target.value); // Update the rough state with the new text from textarea
  };

  return (
    /* 
      Wrapper div for the RoughSection component, using the `styles.roughSection` class for styling.
    */
    <div className={styles.roughSection}>
      
      {/* 
        Heading for the section, indicating that this is the "Rough Section".
      */}
      <h2>Rough Section</h2>

      {/* 
        Textarea element for users to input their rough notes. 
        It uses the value from the `rough` state and updates it via `handleChange` when the user types.
      */}
      <textarea value={rough} onChange={handleChange} rows={10} cols={5} />
    </div>
  );
};

export default RoughSection;
