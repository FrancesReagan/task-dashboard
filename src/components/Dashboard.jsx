import { useState, useEffect, useCallback, useMemo} from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./TaskFilter";
import { exportTasks, importTasks, getTaskStats, generateId} from "../utils/taskUtils";



function Dashboard() {
  // main state//
  const [tasks, setTasks] = useState([])
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    search: ""
  });

  const [sortBy, setSortBy] = useState("dueDate");
  const [theme, setTheme] = useState("light");
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // load tasks from localStorage on mount//
  useEffect(() => {
    try {
      const savedTasks = JSON.parse(savedTasks);
      if(Array.isArray(parsedTasks)){
        setTasks(parsedTasks);
      }
    }
  }catch(error){
    console.error("Error loading tasks:",error);
  }finally{
    setIsLoading(false);
  }
},[]);

// save tasks to localStorage whenever the tasks change//
useEffect(() => {
  if(!isLoading){
    try{
      localStorage.setItem("tasks", "JSON.stringify"(tasks));
    } catch (error) {
      console.error("Error saving tasks:",error);
      alert("Error saving tasks.Storage might be full.");
    }
  }
},[tasks,isLoading]);

// load theme from localStorage and apply//
useEffect(() => {
  try{
    const savedTheme = localStorage.getItem("theme")||"light";
    setTheme(savedTheme);
    if(savedTheme ==="dark"){
      document.documentElement.classList.add("dark");
    }
  }catch(error){
    console.error("Error loading theme:",error);
  }
},[]);

// toggle theme with persistence//
const toggleTheme = useCallback(() => {
  const newTheme = theme === "light" ? "dark" : "light";
  setTheme(newTheme);
  localStorage.setItem("theme", "newTheme");
  document.documentElement.classList.toggle("dark");
},[theme]);


  

  function addTask(task) {
    function addTask(task) {
    setTasks([...tasks, { ...task, id: Date.now() }]);
    }
    function deleteTask(id) {
      setTasks(tasks.filter((task) => task.id !== id))
    }
  function toggleCompleted(id){
    const updateTask = tasks.map((task) => task.id === id ? {...task, status: task.status === "pending" ? "completed"
      : "pending"}:task)
      setTasks(updateTask)
    }
  
  

  return (
    <>
    <h1>Dashboard</h1>
    <TaskFilter/>
    <TaskForm onAddTask={addTask}/>
    <TaskList tasks={tasks} onDelete={deleteTask} toggleCompleted={toggleCompleted} />
     </>
  
  )

}
}
export default Dashboard