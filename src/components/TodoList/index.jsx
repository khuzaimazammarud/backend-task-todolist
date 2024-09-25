import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import Loader from "../common/spinner";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isDeleting, setIsDeleting] = useState("");

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get("/api/todos");
      setTodos(data?.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(async () => {
    if (newTodo.trim() === "") {
      setError("Please enter a valid todo");
      return;
    }

    setIsAdding(true);

    try {
      const res = await axios.post("/api/todos", { text: newTodo });
      setTodos([...todos, res.data.data]);
      setNewTodo("");
      setError("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    } finally {
      setIsAdding(false);
    }
  }, [newTodo, todos]);

  const deleteTodo = useCallback(
    async (id) => {
      setIsDeleting(id);
      try {
        await axios.delete(`/api/todos/${id}`);
        setTodos(todos.filter((todo) => todo._id !== id));
      } catch (error) {
        console.error("Failed to delete todo:", error);
      } finally {
        setIsDeleting("");
      }
    },
    [todos]
  );

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-100 rounded-xl shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-center mb-6">Todo List</h1>

      <div className="flex mb-4">
        <input
          className={`border rounded-l-lg w-full p-4 text-lg ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          disabled={isAdding}
        />
        <button
          className={`bg-blue-500 text-white p-4 rounded-r-lg hover:bg-blue-600 flex items-center justify-center ${
            isAdding && "opacity-50 cursor-not-allowed"
          }`}
          onClick={addTodo}
          disabled={isAdding}
        >
          {isAdding ? <span className="loader" /> : <FaPlus />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      {isLoading ? (
        <div className="text-center">Loading Todos...</div>
      ) : (
        <ul className="mt-4 space-y-2 max-h-60 overflow-y-auto">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm"
            >
              <span className="text-lg">{todo.text}</span>
              <button
                className={`text-red-500 hover:text-red-700 flex items-center ${
                  isDeleting === todo._id && "opacity-50 cursor-not-allowed"
                }`}
                onClick={() => deleteTodo(todo._id)}
                disabled={isDeleting === todo._id}
              >
                {isDeleting === todo._id ? (
                  <Loader />
                ) : (
                  <FaTrash />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
