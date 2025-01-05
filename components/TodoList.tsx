import { useState, useEffect } from "react";
import styles from "../styles/Home.module.scss";
import { toast } from "react-toastify";

// Defining the Todo type structure
interface Todo {
  id: number; // Unique identifier for each todo item
  text: string; // The text description of the todo item
  completed: boolean; // A flag to check if the todo item is completed
}

const TodoList: React.FC = () => {
  /* 
    useState hooks for managing state in the component.
    todos: Array of Todo items.
    inputValue: Holds the value of the text input field.
  */
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  /* 
    useEffect hook to retrieve the todos from local storage 
    when the component is mounted (empty dependency array means it runs only once).
    If there are saved todos in local storage, it sets them to the state.
  */
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  /* 
    useEffect hook to save the todos to local storage whenever the todos state changes.
    It uses a timer to save the todos every 10 seconds. 
    On successful save, it triggers a toast notification.
  */
  useEffect(() => {
    if (todos.length > 0) {
      const timer = setTimeout(() => {
        localStorage.setItem("todos", JSON.stringify(todos)); // Save todos to local storage
        toast.success("Todos saved!"); // Display success message
      }, 10000); // 10 seconds delay

      return () => clearTimeout(timer); // Cleanup timer when todos change or component unmounts
    }
  }, [todos]);

  /* 
    Function to add a new todo item.
    Checks if the input value is not empty (after trimming).
    Adds a new todo object to the state and resets the input field.
  */
  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = { id: Date.now(), text: inputValue, completed: false }; // New todo item with unique ID
      setTodos([...todos, newTodo]); // Update the todos array with the new todo
      setInputValue(""); // Clear the input field after adding the todo
    }
  };

  /* 
    Function to toggle the completion status of a todo.
    It updates the completed property by toggling its current value.
  */
  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  /* 
    Function to delete a todo item by its ID.
    It filters out the todo item that matches the given ID.
  */
  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id)); // Removes the todo with the specified ID
  };

  return (
    /* Main wrapper for the entire todo list UI */
    <div className={styles.todoList}>
      
      {/* Heading for the Todo List */}
      <h2>Todo List</h2>

      {/* Input field for adding new todos */}
      <input
        type="text"
        value={inputValue} // The current value of the input field
        onChange={(e) => setInputValue(e.target.value)} // Updates inputValue state on every input change
        placeholder="Add a new task"
      />

      {/* Button that triggers adding a new todo item */}
      <button id="start" onClick={handleAddTodo}>
        Add
      </button>

      {/* Rendering the list of todos */}
      <ul>
        {/* Iterating over each todo item and rendering it */}
        {todos.map((todo) => (
          /* Key is set to the unique id of each todo item for efficient DOM rendering */
          <li key={todo.id}>
            {/* 
              Display the todo text. 
              Apply a line-through style if the todo is marked as completed.
            */}
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none", // Apply line-through if completed
              }}
              onClick={() => handleToggleTodo(todo.id)} // Toggle todo completion status on click
            >
              {todo.text} {/* Todo text */}
            </span>

            {/* 
              Button to delete the todo item. 
              This calls handleDeleteTodo when clicked, passing the todo id to remove it from the list.
            */}
            <button id="reset" onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>

            {/* 
              Button to toggle the completion status of the todo item.
              The button text changes depending on whether the todo is completed.
            */}
            <button onClick={() => handleToggleTodo(todo.id)}>
              {todo.completed ? "Undo" : "Complete"} {/* Button text changes based on completion status */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
