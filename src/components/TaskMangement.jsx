import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import SearchBar from "./SearchBar";
import TaskFilter from "./TaskFilter";
import api from "../services/api";
import { toast } from "react-toastify";
import TaskItem from "./TaskItem";

const TaskMangement = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    api
      .get("/tasks")
      .then(({ data }) => {
        setTasks(data);
        setFilteredTasks(data); // Initialize filtered tasks
      })
      .catch((err) => toast.error("Error fetching data"));
  }, []);

  const addTask = (text, priority) => {
    let newTask = { text, completed: false, priority };
    api
      .post("/tasks", newTask)
      .then(({ data }) => {
        const updatedTasks = [...tasks, data];
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
        toast.success("New task added!");
      })
      .catch(() => toast.error("Failed to add task"));
  };

  const editTask = (id, text, priority) => {
    const updatedTask = { text, completed: false, priority };
    api.put(`/tasks/${id}`, updatedTask)
      .then(({ data }) => {
        const updatedTasks = tasks.map(task => task.id === id ? data : task);
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
        toast.success("Task updated!");
      })
      .catch(() => toast.error("Failed to edit task"));
  };

  const deleteTask = (id) => {
    api.delete(`/tasks/${id}`)
      .then(() => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        setFilteredTasks(updatedTasks);
        toast.success("Task deleted!");
      })
      .catch(() => toast.error("Failed to delete task"));
  };

  const handleSearch = (query) => {
    if (!query) {
      setFilteredTasks(tasks);
    } else {
      const matchedTasks = tasks.filter((task) =>
        task.text.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTasks(matchedTasks);
    }
  };

  return (
    <div className="container my-2 p-2">
      <div className="search-functionality">
        <div className="row">
          <div className="col-12 col-sm-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="col-12 col-sm-4">
            <TaskFilter />
          </div>
        </div>
      </div>

      <TaskForm onaddTask={addTask} />

      <ul className="list-group">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} oneditTask={editTask} ondeleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
};

export default TaskMangement;
