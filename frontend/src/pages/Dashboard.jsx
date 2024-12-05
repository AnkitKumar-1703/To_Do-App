import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import convertToIST from "../controller/convertToIST";
import quotes from "../controller/quotes";
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editTask, setEditTask] = useState(null); // State to hold the task being edited
  const [userName, setUserName] = useState(""); // State to hold user's name
  const [quote, setQuote] = useState(""); // State to hold the motivational quote
  const navigate = useNavigate();

  // const quotes = [
  //   "The secret of getting ahead is getting started.",
  //   "Believe you can and you're halfway there.",
  //   "Don't watch the clock; do what it does. Keep going.",
  //   "It always seems impossible until it's done.",
  //   "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  // ];

  const capitalizeFirstLetter = (name) => {
    if (!name) return ""; // In case the name is undefined or empty
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  // Fetch todos function
  const fetchTodos = async () => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_URL}/todo/showtodos`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    try {
      const response = await axios.request(config);
      console.log("Fetched todos:", response.data.todos);
      setTasks(response.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTask({ ...editTask, [name]: value });
  };

  const addTask = async () => {
    if (newTask.title.trim()) {
      const data = JSON.stringify({
        title: newTask.title,
        description: newTask.description,
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_BACKEND_URL}/todo/create`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      try {
        const response = await axios.request(config);
        console.log(response.data);
        setNewTask({ title: "", description: "" });
        fetchTodos();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateTask = async (taskId) => {
    if (editTask.title.trim()) {
      const data = {
        title: editTask.title,
        description: editTask.description,
        isCompleted: editTask.isCompleted, // Optionally include completion status
      };
  
      const config = {
        method: "patch", // Use PATCH for update
        maxBodyLength: Infinity,
        url: `${import.meta.env.VITE_BACKEND_URL}/todo/update?todoId=${taskId}`, // Only todoId in query parameter
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json", // Send the data in the body
        },
        data: data, // Send the title, description, and isCompleted in the body
      };
  
      try {
        const response = await axios.request(config);
        console.log(response.data);
        setEditTask(null); // Clear the edit state
        fetchTodos(); // Refresh the todo list
      } catch (error) {
        console.log("Error updating task:", error.response || error);
      }
    }
  };
  

  const toggleTaskCompletion = (todoId) => {
    const config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_URL}/todo/marktrue?todoId=${todoId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        fetchTodos();
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  };

  const deleteTask = (todoId) => {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_URL}/todo/delete?todoId=${todoId}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    async function makeRequest() {
      try {
        const response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        fetchTodos();
      } catch (error) {
        console.log(error);
      }
    }

    makeRequest();
  };

  const handleLogout = () => {
    localStorage.clear();
    console.log("User logged out");
    navigate("/");
  };

  useEffect(() => {
    const storedName = localStorage.getItem("name"); // Retrieve name from localStorage
    if (storedName) {
      setUserName(capitalizeFirstLetter(storedName)); // Set user's name
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]); // Set a random quote
      fetchTodos();
    }else{
      alert("You need to sign in");
      navigate("/signin")
    }


  }, []);

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.isCompleted === b.isCompleted) return 0;
    return a.isCompleted ? 1 : -1; // Move completed tasks to the end
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-20 right-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
      >
        Logout
      </button>

      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-500">
          Welcome {userName}! 🎉
        </h1>
        <p className="text-gray-600 mt-4">
          Organize your tasks, stay productive, and achieve your goals.
        </p>
      </header>

      {/* Motivational Quote */}
      <div className="max-w-3xl bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-blue-500 mb-4">
          Motivational Quote
        </h2>
        <p className="text-gray-700 italic">"{quote}"</p>
      </div>

      {/* Task Manager */}
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-blue-500 mb-6">
          Task Manager
        </h2>

        {/* Add New Task */}
        <div className="space-y-4 mb-6">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={newTask.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-2"
            />
            <textarea
              name="description"
              placeholder="Task Description"
              value={newTask.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="3"
            ></textarea>
          </div>
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-6">
          {sortedTasks.map((task, index) => (
            <li
              key={index}
              className={`flex flex-col p-6 rounded-lg shadow-md border ${
                task.isCompleted
                  ? "bg-green-50 border-green-300"
                  : "bg-white border-gray-300"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-bold text-gray-800">
                  {editTask && editTask.id === task.id ? (
                    <input
                      type="text"
                      name="title"
                      value={editTask.title}
                      onChange={handleEditChange}
                      className="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    task.title
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  {editTask && editTask.id === task.id ? (
                    <button
                      onClick={() => updateTask(task.id)}
                      className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditTask(task)}
                      className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-medium hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`px-4 py-2 rounded-lg text-white font-medium ${
                      task.isCompleted
                        ? "bg-gray-400 hover:bg-gray-500"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {task.isCompleted ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p
                className={`mb-4 text-sm ${
                  task.isCompleted
                    ? "text-gray-500 line-through"
                    : "text-gray-700"
                }`}
              >
                {editTask && editTask.id === task.id ? (
                  <textarea
                    name="description"
                    value={editTask.description}
                    onChange={handleEditChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  task.description
                )}
              </p>
              <div className="text-sm text-gray-600 border-t pt-3 grid grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold">Created:</span>{" "}
                  {convertToIST(task.createdAt)}
                </div>
                <div>
                  <span className="font-semibold">Last Updated:</span>{" "}
                  {convertToIST(task.updatedAt)}
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* No Tasks Message */}
        {tasks.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            You have no tasks yet. Add your first task to get started!
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
